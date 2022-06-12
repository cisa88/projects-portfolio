using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace HW04
{
    public class StegoImageProcessor
    {
        const int BitsInByte = 8;
        private int ChunkSize;

        public StegoImageProcessor()
        {
            ChunkSize = 1;
        }

        public StegoImageProcessor(int chunkSize)
        {
            ChunkSize = chunkSize;
        }

        public async Task<Image<Rgba32>> LoadImageAsync(string path) => await Image.LoadAsync<Rgba32>(path);


        public Task SaveImageAsync(Image<Rgba32> image, string path) => image.SaveAsPngAsync(path);
    

        // splits bytes into the chunks based od ChunkSize value
        private byte[] splitPayload(byte[] payload)
        {
            List<byte> splittedBytes = new List<byte>();
            foreach (var @byte in payload)
            {
                foreach (var splittedByte in ByteSpliting.Split(@byte, ChunkSize))
                {
                    splittedBytes.Add(splittedByte);
                }
            }

            return splittedBytes.ToArray();
        }

        public Task<Image<Rgba32>> EncodePayload(Image<Rgba32> image, byte[] payload) => Task.Run(() => 
        {
            if (splitPayload(payload).Length > image.Width * image.Height)
            {
                throw new Exception("message too long to encode");
            }

            byte changedColor;
            var splittedPayload = splitPayload(payload);
            int mask = (255 >> ChunkSize << ChunkSize);

            for (int row = 0; row < image.Height; row++)
            {
                for (int col = 0; col < image.Width; col++)
                {
                    if (splittedPayload.Length <= row * image.Width + col)
                    {
                        return image;
                    }

                    changedColor = (byte) (image[col, row].R & (mask) | splittedPayload[row * image.Width + col]);
                    image[col, row] = new Rgba32(changedColor, image[col, row].G, image[col, row].B);
                }
            } 

            // This can be CPU-intensive, so it can run in separate task
            return image;
        });

        public Task<byte[]> ExtractPayload(Image<Rgba32> image, int dataSize) => Task.Run(() =>
        {
            List<byte> result = new List<byte>();
            byte chunkedByte = 0;
            int counter = 0;

            for (int row = 0; row < image.Height; row++)
            {
                for (int col = 0; col < image.Width; col++)
                {
                    if (dataSize * BitsInByte / ChunkSize <= row * image.Width+ col)
                    {
                        return result.ToArray();
                    }

                    chunkedByte += (byte) ((image[col, row].R & ((2 << ChunkSize - 1) - 1)) << ChunkSize * counter);
                    counter++;

                    if (counter == BitsInByte / ChunkSize)
                    {
                        result.Add(chunkedByte);
                        counter = 0;
                        chunkedByte = 0;
                    }
                }
            }

            // This can be CPU-intensive, so it can run in separate task
            return result.ToArray();
        });
    }
}

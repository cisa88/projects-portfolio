using System.Text;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace HW04
{
    internal static class BatchProcessing
    {
        public static void Start(string message, string[] imageNames, string inputPath, string outputPath)
        {
            var stegoObject = StegoObject.LoadObject(message, (s) => Encoding.Default.GetBytes(s));
            var dataChunks = stegoObject.GetDataChunks(imageNames.Count()).ToArray();

            byte[][] decodedMessage = new byte[dataChunks.Length][];
            var encodedImageIndex = new Dictionary<Image<Rgba32>, int> ();

            // default stegoImageProcessor is 1 bit per byte
            var stegoProcessor = new StegoImageProcessor(2);

            Parallel.For(0, imageNames.Count(), async index =>
            {
                Console.WriteLine($"Task: {Task.CurrentId} is loading image: {imageNames[index]} with index {index}");
                var loadedImage = await stegoProcessor.LoadImageAsync(inputPath + imageNames[index]);
                Console.WriteLine($"Task: {Task.CurrentId} is encoding image: {imageNames[index]} with index {index}");
                encodedImageIndex.Add(await stegoProcessor.EncodePayload(loadedImage, dataChunks[index]), index);
            });

            Parallel.ForEach(encodedImageIndex.Keys, async key =>
            {
                Console.WriteLine($"Task: {Task.CurrentId} is saving image: {key} with index {encodedImageIndex[key]}");
                await stegoProcessor.SaveImageAsync(key, outputPath + "encoded_image_" + encodedImageIndex[key] + ".png");
            });

            Parallel.ForEach(encodedImageIndex.Keys, async key => 
            {
                Console.WriteLine($"Task: {Task.CurrentId} is loading encoded image: {key} with index {encodedImageIndex[key]}");
                var loadedEncodedImage = await stegoProcessor.LoadImageAsync(outputPath + "encoded_image_" + encodedImageIndex[key] + ".png");
                Console.WriteLine($"Task: {Task.CurrentId} is decoding: encoded_{key} with index {encodedImageIndex[key]}");
                decodedMessage[encodedImageIndex[key]] = await stegoProcessor.ExtractPayload(loadedEncodedImage, dataChunks[encodedImageIndex[key]].Length);
            });

            Console.WriteLine();
            Console.WriteLine("--- DECODED MESSAGE: ---");
            foreach (var text in decodedMessage)
            {
                Console.Write(Encoding.Default.GetString(text));
            }
        }
    }
}

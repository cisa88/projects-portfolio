using HW04;
using System.Text;

const string inputPath = "../../../../Data/";
const string outputPath = "../../../../Output/";

var stegoObject = StegoObject.LoadObject(Samples.StringSample(), (s) => Encoding.Default.GetBytes(s));

// Images to encode the stegoObject into
// Each image must be used to encode a part of the stegoObject
var imageNames = new[]
{
    "John_Martin_-_Belshazzar's_Feast.jpg",
    "John_Martin_-_Pandemonium.jpg",
    "John_Martin_-_Sodom_and_Gomorrah.jpg",
    "John_Martin_-_The_Great_Day_of_His_Wrath.jpg",
    "John_Martin_-_The_Last_Judgement.jpg",
    "John_Martin_-_The_Plains_of_Heaven.jpg"
};

BatchProcessing.Start("Sample text to be encoded", imageNames, inputPath, outputPath);

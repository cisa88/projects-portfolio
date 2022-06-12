using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PV178_HW02.App
{
    internal static class Printer
    {
        // const for console colors so I can change them easily
        private const ConsoleColor InfoColor = ConsoleColor.Green;
        private const ConsoleColor ErrorColor = ConsoleColor.DarkRed;

        public static void WelcomeInfo()
        {
            Console.ForegroundColor = InfoColor;
            Console.WriteLine("=========================================");
            Console.WriteLine("FIF1 - Formula Process Mining Application");
            Console.WriteLine("=========================================");
            Console.WriteLine();
            Choose();
            Console.ResetColor();
        }

        public static void Choose()
        {
            Console.ForegroundColor = InfoColor;
            Console.WriteLine("Type \"driver\" if you want to choose DRIVER by name or \"nationality\" if you want to choose drivers by NATIONALITY ");
            Console.ResetColor();
        }

        public static void ChooseError()
        {
            Console.ForegroundColor = ErrorColor;
            Console.WriteLine("You need to choose between DRIVER and NATIONALITY!");
            Console.ResetColor();
        }

        public static void DriverDoesNotExist(string driver)
        {
            Console.ForegroundColor = ErrorColor;
            Console.WriteLine($"Driver {driver} does not exist or is not experienced enough!");
            Console.ResetColor();
        }

        public static void DupliciteSurname(List<FormulaAPI.Entities.Driver> drivers)
        {
            Console.ForegroundColor = InfoColor;
            Console.WriteLine($"Driver {drivers[0].Surname} has duplicite surname!");
            Console.WriteLine($"Enter forename and nationality in format \"forename\" \"nationality\"");
            Console.WriteLine("You can choose from: ");
            Drivers(drivers);
            Console.ResetColor();
        }

        public static void ForenameNationalityError()
        {
            Console.ForegroundColor = ErrorColor;
            Console.WriteLine("You need to enter FORENAME and NATIONALITY in format \"forename nationality\"");
            Console.ResetColor();
        }

        private static void Drivers(List<FormulaAPI.Entities.Driver> drivers)
        {
            foreach (var driver in drivers)
            {
                Console.WriteLine($"{driver.Forename} {driver.Surname} - {driver.Nationality}");
            }
        }

        public static void ChooseDriver()
        {
            Console.ForegroundColor = InfoColor;
            Console.WriteLine("Enter surname of driver you want to choose");
            Console.ResetColor();
        }

        public static void NationalityDoesNotExist(string nationality)
        {
            Console.ForegroundColor = ErrorColor;
            Console.WriteLine($"There is no driver with nationality: {nationality}");
            Console.ResetColor();
        }

        public static void ChooseNationality()
        {
            Console.ForegroundColor = InfoColor;
            Console.WriteLine("Enter nationality of drivers you want to choose");
            Console.ResetColor();
        }
    }
}

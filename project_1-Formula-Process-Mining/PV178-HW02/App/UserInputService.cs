using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FormulaAPI;

namespace PV178_HW02.App
{
    internal static class UserInputService
    {
        public static string Choose()
        {
            string line = (Console.ReadLine() ?? "undefined").ToLower();

            while (line != "nationality" && line != "driver")
            {
                Printer.ChooseError();
                line = (Console.ReadLine() ?? "undefined").ToLower();
            }

            return line;
        }

        public static void Driver()
        {
            Printer.ChooseDriver();
            string surname = (Console.ReadLine() ?? "undefined").ToLower();
            surname = (char.ToUpper(surname[0]) + surname.Substring(1));

            // info[0] == forename
            // info[1] == nationality
            string[] info;
            F1 f1 = new F1();

            var results = f1.GetAllResults();
            var nonExperiencedDrivers = F1.GetDrivers(900, 0).FindAll(driver => driver.Surname == surname);
            var drivers = DriverService.TakeExperiencedDrivers(results, nonExperiencedDrivers);
            // var drivers = DriverService.TakeExperiencedDrivers(results, f1.GetDriversByName(surname));

            while (drivers.Count > 1)
            {
                Printer.DupliciteSurname(drivers);
                info = InputForenameNationality();

                while (info.Length != 2)
                {
                    Printer.ForenameNationalityError();
                    info = InputForenameNationality();
                    continue;
                }

                // if there will be two drivers with same forename, surname and nationality --> problem
                drivers = PickDriver(drivers, info[0], info[1]);
            }

            if (drivers.Count <= 0)
            {
                Printer.DriverDoesNotExist(surname);
                return;
            }

            StatusService.ExportStatuses(ResultService.ResultsByDrivers(results, drivers));
        }

        private static string[] InputForenameNationality()
        {
            string line = (Console.ReadLine() ?? "undefined").ToLower();
            string[] info = line.Split(" ");

            if (info.Length != 2)
            {
                return info;
            }

            info[0] = (char.ToUpper(info[0][0]) + info[0].Substring(1));
            info[1] = (char.ToUpper(info[1][0]) + info[1].Substring(1));
            return info;            
        }

        private static List<FormulaAPI.Entities.Driver> PickDriver(List<FormulaAPI.Entities.Driver> drivers, string forename, string nationality)
        {

            foreach (var driver in drivers)
            {
                if (driver.Forename == forename && driver.Nationality == nationality)
                {
                    return new List<FormulaAPI.Entities.Driver> { driver };
                }
            }

            return new List<FormulaAPI.Entities.Driver>();
        }

        public static void Nationality()
        {
            Printer.ChooseNationality();
            string nationality = (Console.ReadLine() ?? "undefined").ToLower();
            nationality = (char.ToUpper(nationality[0]) + nationality.Substring(1));

            F1 f1 = new F1();

            var results = f1.GetAllResults();
            var drivers = DriverService.TakeExperiencedDrivers(results, f1.GetDriversByNationality(nationality));

            if (drivers.Count == 0)
            {
                Printer.NationalityDoesNotExist(nationality);
                return;
            }

            StatusService.ExportStatuses(ResultService.ResultsByDrivers(results, drivers));
        }
    }
}

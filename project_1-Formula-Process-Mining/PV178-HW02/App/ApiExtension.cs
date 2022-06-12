using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PV178_HW02.App
{
    internal static class ApiExtension
    {
        public static List<FormulaAPI.Entities.Driver> GetDriversByName(this FormulaAPI.F1 api, string surName)
        {
            var drivers = FormulaAPI.F1.GetDrivers(900, 0);

            var driversByName = new List<FormulaAPI.Entities.Driver>();

            foreach (var driver in drivers)
            {
                if (driver.Surname == surName)
                {
                    driversByName.Add(driver);
                }
            }

            return driversByName;
        }

        public static List<FormulaAPI.Entities.Driver> GetDriversByNationality(this FormulaAPI.F1 api, string nationality)
        {
            var drivers = FormulaAPI.F1.GetDrivers(900, 0);

            var driversByNationality = new List<FormulaAPI.Entities.Driver>();

            foreach (var driver in drivers)
            {
                if (driver.Nationality == nationality)
                {
                    driversByNationality.Add(driver);
                }
            }

            return driversByNationality;
        }

        public static List<FormulaAPI.Entities.Result> GetAllResults(this FormulaAPI.F1 api)
        {
            var currentResults = new List<FormulaAPI.Entities.Result>();
            var results = new List<FormulaAPI.Entities.Result>();
            results.AddRange(currentResults);
            int counter = 0;

            do
            {
                currentResults = FormulaAPI.F1.GetResults(1000, counter * 1000);
                results.AddRange(currentResults);
                counter++;
            }
            while (currentResults.Count > 0);

            results.AddRange(currentResults);

            return results;
        }

        public static List<FormulaAPI.Entities.Status> GetAllStatuses(this FormulaAPI.F1 api)
        {
            var currentStatuses = new List<FormulaAPI.Entities.Status>();
            var statuses = new List<FormulaAPI.Entities.Status>();
            statuses.AddRange(currentStatuses);
            int counter = 0;

            do
            {
                currentStatuses = FormulaAPI.F1.GetStatuses(1000, counter * 1000);
                statuses.AddRange(currentStatuses);
                counter++;
            }
            while (currentStatuses.Count > 0);

            statuses.AddRange(currentStatuses);

            int index = 0;

            return statuses;
        }
    }    
}

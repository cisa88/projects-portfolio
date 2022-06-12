using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PV178_HW02.App
{
    internal class DriverService
    {
        public static List<FormulaAPI.Entities.Driver> TakeExperiencedDrivers(List<FormulaAPI.Entities.Result> results, List<FormulaAPI.Entities.Driver> drivers)
        {
            var experiencedDrivers = new List<FormulaAPI.Entities.Driver>();

            foreach (var driver in drivers)
            {
                if (ResultService.ResultsByDrivers(results, new List<FormulaAPI.Entities.Driver> { driver }).Count >= 10)
                {
                    experiencedDrivers.Add(driver);
                }
            }

            return experiencedDrivers;
        }
    }
}

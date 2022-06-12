using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PV178_HW02.App
{
    internal class ResultService
    {
        public static List<FormulaAPI.Entities.Result> ResultsByDrivers(List<FormulaAPI.Entities.Result> results, List<FormulaAPI.Entities.Driver> drivers)
        {
            var driverResults = new List<FormulaAPI.Entities.Result>();

            foreach (var result in results)
            {
                foreach (var driver in drivers)
                {
                    if (result.DriverId == driver.Id)
                    {
                        driverResults.Add(result);
                        break;
                    }
                }
            }

            return driverResults;
        }
    }
}

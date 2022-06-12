using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FormulaAPI;
using System.Text.RegularExpressions;
using PV178_HW02.Export;
using PV178_HW02.Modelling;

namespace PV178_HW02.App
{
    internal static class StatusService
    {
        private static Dictionary<int, List<string>> GetStatusesByResults(List<FormulaAPI.Entities.Status> statuses, List<FormulaAPI.Entities.Result> results)
        {
            string[] technicalStates = {"Finished", "Disqualified", "Retired", "Withdrew", "Not classified",
                "Did not qualify", "Did not prequalify", "Safety concerns", "Driver unwell", "Excluded", "Eye injury", "Illness" };
            Regex xLaps = new Regex(@"\+[0-9]+ (Laps|Lap)");

            var resultsStatuses = new Dictionary<int, List<string>> { };
            List<string> currentStatuses = new List<string> { };

            foreach (var result in results)
            {
                foreach (var status in statuses)
                {
                    if (result.StatusId == status.Id && ! (technicalStates.Contains(status.Name) || xLaps.IsMatch(status.Name)))
                    {
                        if (!resultsStatuses.ContainsKey(result.DriverId))
                        {
                            resultsStatuses.Add(result.DriverId, new List<string> { status.Name });
                        }
                        else
                        {
                            resultsStatuses[result.DriverId].Add(status.Name);
                        }
                    }
                }                
            }

            return resultsStatuses;
        }

        public static void ExportStatuses(List<FormulaAPI.Entities.Result> results)
        {
            F1 f1 = new F1();
            List<FormulaAPI.Entities.Status> allStatuses = f1.GetAllStatuses();
            Dictionary<int, List<string>> statuses = GetStatusesByResults(allStatuses, results);

            CsvExporter exporter = new CsvExporter();
            CsvExporter.Export("driver_log.csv", statuses);
            ModelGenerator.RunProcessMining("driver_log.csv");
        }
    }
}

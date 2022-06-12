using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FormulaAPI;

namespace PV178_HW02.App
{
    internal class UI
    {
        public void Start()
        {
            Printer.WelcomeInfo();
            string chooseBy = UserInputService.Choose();
            
            switch (chooseBy)
            {
                case "driver":
                    UserInputService.Driver();
                    break;
                case "nationality":
                    UserInputService.Nationality();
                    break;
                default:
                    throw new ArgumentException("Unknown argument exception! ");
            }
        }
    }
}

using PV178.Homeworks.HW03.DataLoading.DataContext;
using PV178.Homeworks.HW03.DataLoading.Factory;
using PV178.Homeworks.HW03.Model;
using PV178.Homeworks.HW03.Model.Enums;

namespace PV178.Homeworks.HW03
{
    public class Queries
    {
        private IDataContext? _dataContext;
        public IDataContext DataContext => _dataContext ??= new DataContextFactory().CreateDataContext();

        // returns ids of all sharks longer than length
        private List<int> XMetersSharks(int length)
        {
            return DataContext.SharkSpecies
               .Where(s => s.Length > length)
               .Select(s => s.Id)
               .ToList();
        } 

        /// <summary>
        /// SFTW si vyžiadala počet útokov, ktoré sa udiali v krajinách začinajúcich na písmeno <'A', 'G'>,
        /// a kde obete boli muži v rozmedzí <15, 40> rokov.
        /// </summary>
        /// <returns>The query result</returns>
        public int AttacksAtoGCountriesMaleBetweenFifteenAndFortyQuery()
        {
            var attackedPeopleIds = DataContext.AttackedPeople
                .Where(p => p != null && p.Age != null)
                .Where(p => p.Age >= 15 && p.Age <= 40 && p.Sex == Sex.Male)
                .Select(p => p.Id)
                .ToList();

            var countryIds = DataContext.Countries
                .Where(c => c != null && c.Name != null)
                .Where(c => c.Name[0] >= 'A' && c.Name[0] <= 'G')
                .Select(c => c.Id)
                .ToList();

            var result = DataContext.SharkAttacks
                .Where(a => a.AttackedPersonId != null && a.CountryId != null)
                .Where(a => attackedPeopleIds.Contains((int) a.AttackedPersonId) && countryIds.Contains((int) a.CountryId))
                .ToList()
                .Count();

            return result;
        }

        private Country Bahamas()
        {
            return DataContext.Countries
                .First(c => c != null && c.Name != null && c.Name == "Bahamas");
        }

        /// <summary>
        /// Vráti zoznam, v ktorom je textová informácia o každom človeku,
        /// ktorého meno nie je známe (začína na malé písmeno alebo číslo) a na ktorého zaútočil žralok v štáte Bahamas.
        /// Táto informácia je v tvare:
        /// {meno človeka} was attacked in Bahamas by {latinský názov žraloka}
        /// </summary>
        /// <returns>The query result</returns>
        public List<string> InfoAboutPeopleWithUnknownNamesAndWasInBahamasQuery()
        {
            var unknownPersons = DataContext.AttackedPeople
                .Where(p => p != null && p.Name != null)
                .Where(p => p.Name[0] >= 'a' && p.Name[0] <= 'z' || p.Name[0] >= '0' && p.Name[0] <= '9')
                .ToList();

            var bahamas = Bahamas();

            var result = DataContext.SharkAttacks
                .Where(a => a != null && a.CountryId != null)
                .Where(a => a.CountryId == bahamas.Id)
                .Join(unknownPersons,
                    a => a.AttackedPersonId,
                    p => p.Id,
                    (a, p) => new
                    {
                        SharkName = DataContext.SharkSpecies
                            .Where(s => s.Id == a.SharkSpeciesId && s.LatinName != null)
                            .Select(s => s.LatinName)
                            .First(),
                        PersonName = p.Name
                    }
                    )
                .Select(a => a.PersonName + " was attacked in Bahamas by " + a.SharkName)
                .ToList();

            return result;
        }

        /// <summary>
        /// Prišla nám ďalšia požiadavka od našej milovanej SFTW. 
        /// Chcú od nás 5 názvov krajín s najviac útokmi, kde žraloky merali viac ako 3 metre.
        /// Požadujú, aby tieto data boli zoradené abecedne.
        /// </summary>
        /// <returns>The query result</returns>
        public List<string> FiveCountriesWithTopNumberOfAttackSharksLongerThanThreeMetersQuery()
        {
            var threeMetersSharks = XMetersSharks(3);

            var result = DataContext.SharkAttacks
                .Where(a => a.CountryId != null && threeMetersSharks.Contains(a.SharkSpeciesId))
                .GroupBy(a => a.CountryId)
                .OrderByDescending(a => a.Count())
                .Take(5)
                .Select(a => DataContext.Countries
                    .Where(c => c.Name != null && c.Id == a.Key)
                    .Select(c => c.Name)
                    .First())
                .OrderBy(a => a)
                .ToList();

            return result;
        }

        /// <summary>
        /// SFTW chce zistiť, či žraloky berú ohľad na pohlavie obete. 
        /// Vráti informáciu či každý druh žraloka, ktorý je dlhší ako 2 metre
        /// útočil aj na muža aj na ženu.
        /// </summary>
        /// <returns>The query result</returns>
        public bool AreAllLongSharksGenderIgnoringQuery()
        {
            var twoMetersSharks = XMetersSharks(2);

            var result = DataContext.SharkAttacks
                .Where(a => twoMetersSharks.Contains(a.Id))
                .GroupBy(a => a.SharkSpeciesId)
                .Select(a => new { SharkId = a.Key, PersonsIds = a.Select(s => s.AttackedPersonId) })
                .Select(a => new
                {
                    SharkId = a.SharkId,
                    GenderList = DataContext.AttackedPeople
                        .Where(p => a.PersonsIds.Contains(p.Id))
                        .Select(p => p.Sex)
                        .ToList()
                })
                .All(a => a.GenderList.Contains(Sex.Male) && a.GenderList.Contains(Sex.Female));

            return result;
        }

        /// <summary>
        /// Každý túži po prezývke a žralok nie je výnimkou. Keď na Vás pekne volajú, hneď Vám lepšie chutí. 
        /// Potrebujeme získať všetkých žralokov, ktorí nemajú prezývku(AlsoKnownAs) a k týmto žralokom krajinu v ktorej najviac útočili.
        /// Samozrejme to SFTW chce v podobe Dictionary, kde key bude názov žraloka a value názov krajiny.
        /// Len si predstavte tie rôznorodé prezývky, napr. Devil of Kyrgyzstan.
        /// </summary>
        /// <returns>The query result</returns>
        public Dictionary<string, string> SharksWithoutNickNameAndCountryWithMostAttacksQuery()
        {
            var sharksWithoutNickname = DataContext.SharkSpecies
                .Where(s => s.AlsoKnownAs == null || s.AlsoKnownAs == "")
                .Select(s => new { Id = s.Id, Name = s.Name })
                .ToList();

            var countryIdName = DataContext.Countries
                .Select(c => new { Id = c.Id, Name = c.Name })
                .ToList();

            var result = DataContext.SharkAttacks
                .Where(a => a.CountryId != null)
                .Where(a => sharksWithoutNickname.Select(s => s.Id).Contains(a.SharkSpeciesId))
                .Select(a => new
                {
                    SharkId = a.SharkSpeciesId,
                    // slo by resit i pres join
                    CountryName = DataContext.Countries
                        .Where(c => c.Id == a.CountryId)
                        .Select(c => c.Name)
                        .First()
                })
                .GroupBy(a => a.SharkId)
                .Select(a => new
                {
                    SharkName = DataContext.SharkSpecies
                        .Where(s => s.Id == a.Key)
                        .Select(s => s.Name)
                        .First(),
                    MaxAttacksCountry = 
                        a.GroupBy(c => c.CountryName)
                        .OrderByDescending(c => c.Count())
                        .First()
                        .Key
                })
                .OrderBy(a => a.SharkName)
                .ToDictionary(a => a.SharkName, s => s.MaxAttacksCountry);

            return result;
        }

        /// <summary>
        /// Ohúrili ste SFTW natoľko, že si u Vás objednali rovno textové výpisy. Samozrejme, že sa to dá zvladnúť pomocou LINQ. 
        /// Chcú aby ste pre všetky fatálne útoky v štátoch na písmenko 'D' a 'E', urobili výpis v podobe: 
        /// "{Meno obete} (iba ak sa začína na veľké písmeno) was attacked in {názov štátu} by {latinský názov žraloka}"
        /// Získané pole zoraďte abecedne a vraťte prvých 5 viet.
        /// </summary>
        /// <returns>The query result</returns>
        public List<string> InfoAboutPeopleAndCountriesOnDorEAndFatalAttacksQuery()
        {
            var DEStates = DataContext.Countries
                .Where(c => c.Name != null && (c.Name[0] == 'D' || c.Name[0] == 'E'))
                .Select(c => new { Id = c.Id, Name = c.Name })
                .ToList();

            var fatalAttacks = DataContext.SharkAttacks
                .Where(a => a.AttackSeverenity != null && a.AttackSeverenity == AttackSeverenity.Fatal)
                .Where(a => a.CountryId != null && DEStates.Select(c => c.Id).Contains((int)a.CountryId))
                .Select(a => new 
                { 
                    PersonId = a.AttackedPersonId, 
                    SharkName = DataContext.SharkSpecies
                        .Where(s => s.Id == a.SharkSpeciesId)
                        .Select(s => s.LatinName)
                        .First(), 
                    CountryName = DEStates
                        .Where(c => c.Id == a.CountryId)
                        .Select(c => c.Name)
                        .First()
                })
                .ToList();

            var result = DataContext.AttackedPeople
                .Where(p => p.Name != null && p.Name[0] >= 'A' && p.Name[0] <= 'Z')
                .Where(p => fatalAttacks.Select(a => a.PersonId).Contains(p.Id))
                .Select(p => new 
                { 
                    PersonName = p.Name,
                    SharkName = fatalAttacks
                        .Where(a => a.PersonId == p.Id)
                        .Select(a => a.SharkName)
                        .First(),
                    CountryName = fatalAttacks
                        .Where(a => a.PersonId == p.Id)
                        .Select(a => a.CountryName)
                        .First()
                })
                .OrderBy(p => p.PersonName)
                .Select(p => p.PersonName + " was attacked in " + p.CountryName + " by " + p.SharkName)
                .Take(5)
                .ToList();

            return result;
        }

        /// <summary>
        /// SFTW pretlačil nový zákon. Chce pokutovať štáty v Afrike.
        /// Každý z týchto štátov dostane pokutu za každý útok na ich území a to buď 250 meny danej krajiny alebo 300 meny danej krajiny (ak bol fatálny).
        /// Ak útok nebol preukázany ako fatal alebo non-fatal, štát za takýto útok nie je pokutovaný. Vyberte prvých 5 štátov s najvyššou pokutou.
        /// Vety budú zoradené zostupne podľa výšky pokuty.
        /// Opäť od Vás požadujú neštandardné formátovanie: "{Názov krajiny}: {Pokuta} {Mena danej krajiny}"
        /// Egypt: 10150 EGP
        /// Senegal: 2950 XOF
        /// Kenya: 2800 KES
        /// </summary>
        /// <returns>The query result</returns>
        public List<string> InfoAboutFinesOfAfricanCountriesTopFiveQuery()
        {
            var africanStates = DataContext.Countries
                .Where(c => c.Continent == "Africa")
                .Select(c => c.Id)
                .ToList();

            var africanFatalAttacks = DataContext.SharkAttacks
                .Where(a => a.CountryId != null && africanStates.Contains((int) a.CountryId))
                .Where(a => a.AttackSeverenity == AttackSeverenity.Fatal)
                .GroupBy(a => a.CountryId)
                .Select(a => new 
                { 
                    Id = a.Key,
                    Money = a.Count() * 300 
                })
                .ToList();

            var result = DataContext.SharkAttacks
                .Where(a => a.CountryId != null && africanStates.Contains((int) a.CountryId))
                .Where(a => a.AttackSeverenity == AttackSeverenity.NonFatal)
                .GroupBy(a => a.CountryId)
                .Select(a => new 
                { 
                    Id = a.Key,
                    Money = a.Count() * 250 
                })
                .Join(africanFatalAttacks,
                    n => n.Id,
                    f => f.Id,
                    (n, f) => new
                    {
                        CountryName = DataContext.Countries
                            .Where(c => c.Id == n.Id)
                            .Select(c => c.Name)
                            .First(),
                        Money = n.Money + f.Money,
                        Currency = DataContext.Countries
                            .Where(c => c.Id == n.Id)
                            .Select(c => c.CurrencyCode)
                            .First()
                    }
                    )
                .OrderByDescending(a => a.Money)
                .Select(a => a.CountryName + ": " + a.Money + " " + a.Currency)
                .Take(5)
                .ToList();

            return result;
        }

        /// <summary>
        /// CEO chce kandidovať na prezidenta celej planéty. Chce zistiť ako ma štylizovať svoju rétoriku aby zaujal čo najviac krajín.
        /// Preto od Vás chce, aby ste mu pomohli zistiť aké percentuálne zastúpenie majú jednotlivé typy vlád.
        /// Požaduje to ako jeden string: "{typ vlády}: {percentuálne zastúpenie}%, ...". 
        /// Výstup je potrebné mať zoradený, od najväčších percent po najmenšie a percentá sa budú zaokrúhľovať na jedno desatinné číslo.
        /// Pre zlúčenie použite Aggregate(..).
        /// </summary>
        /// <returns>The query result</returns>
        public string GovernmentTypePercentagesQuery()
        {
            var countriesCount = DataContext.Countries
                .Count();

            var govermentForms = DataContext.Countries
                .GroupBy(c => c.GovernmentForm)
                .Select(c => new
                {
                    Goverment = c.Key,
                    Percentage = Decimal.Round((decimal) c.Count() / (decimal) countriesCount * 100, 1)
                })
                .OrderByDescending(c => c.Percentage)
                .Select(c => c.Goverment + ": " + c.Percentage + "%")
                .Aggregate((c1, c2) => c1 + ", " + c2);


            return govermentForms;
        }

        /// <summary>
        /// Oslovili nás surfisti. Chcú vedieť, či sú ako skupina viacej ohrození žralokmi. 
        /// Súrne potrebujeme vedieť koľko bolo fatálnych útokov na surfistov("surf", "Surf", "SURF") 
        /// a aký bol ich premierný vek(zaokrúliť na 2 desatinné miesta). 
        /// Zadávateľ úlohy nám to, ale skomplikoval. Tieto údaje chce pre každý kontinent.
        /// </summary>
        /// <returns>The query result</returns>
        public Dictionary<string, Tuple<int, double>> InfoForSurfersByContinentQuery()
        {
            var surfAttacks = DataContext.SharkAttacks
                .Where(a => a.AttackSeverenity == AttackSeverenity.Fatal)
                .Where(a => a.CountryId != null)
                .Where(a => a.Activity.Contains("Surf") || a.Activity.Contains("SURF") || a.Activity.Contains("surf"))
                .Select(a => new
                {
                    PersonAge = DataContext.AttackedPeople
                        .Where(p => p.Id == a.AttackedPersonId)
                        .Select(p => p.Age)
                        .First(),
                    Continent = DataContext.Countries
                        .Where(c => c.Continent != null && a.CountryId != null && c.Id == a.CountryId)
                        .Select(c => c.Continent)
                        .First()
                })
                .GroupBy(a => a.Continent)
                .Select(a => new
                {
                    Continent = a.Key,
                    Tuple = new Tuple<int, double>
                    (
                        a.Count(),
                        (double) Decimal.Round((decimal) a.Sum(p => p.PersonAge) / (decimal) a.Count(p => p.PersonAge != null), 2)
                    )
                })
                .ToDictionary(a => a.Continent, a => a.Tuple);


            return surfAttacks;
        }

        /// <summary>
        /// Zaujíma nás 10 najťažších žralokov na planéte a krajiny Severnej Ameriky. 
        /// CEO požaduje zoznam dvojíc, kde pre každý štát z danej množiny bude uvedený zoznam žralokov z danej množiny, ktorí v tom štáte útočili.
        /// Pokiaľ v nejakom štáte neútočil žiaden z najťažších žralokov, zoznam žralokov bude prázdny.
        /// SFTW požaduje prvých 5 položiek zoznamu dvojíc, zoradeného abecedne podľa mien štátov.

        /// </summary>
        /// <returns>The query result</returns>
        /// 
        /// Asi neefektivni :-( - mozna predelat (kdyz bude cas)
        public List<Tuple<string, List<SharkSpecies>>> HeaviestSharksInNorthAmericaQuery()
        {
            var northAmericaStates = DataContext.Countries
                .Where(c => c.Continent == "North America")
                .Select(c => c.Id)
                .ToList();

            var heaviestSharks = DataContext.SharkSpecies
                .OrderByDescending(s => s.Weight)
                .Select(s => s.Id)
                .Take(10)
                .ToList();

            var sharkAttacksInNorthAmerica = DataContext.SharkAttacks
                .Where(a => a.CountryId != null && northAmericaStates.Contains((int) a.CountryId))
                .Where(a => heaviestSharks.Contains((int) a.SharkSpeciesId))
                .ToList();

            var result = DataContext.Countries
                .Where(c => northAmericaStates.Contains(c.Id))
                .Select(c => new
                {
                    CountryName = c.Name,
                    SharkIds = sharkAttacksInNorthAmerica
                        .Where(a => a.CountryId == c.Id)
                        .Select(s => s.SharkSpeciesId)
                        .Distinct()
                        .ToList()
                })
                .Select(c => new Tuple<string, List<SharkSpecies>>
                (
                    c.CountryName,
                    DataContext.SharkSpecies
                        .Where(s => c.SharkIds.Contains(s.Id))
                        .ToList()
                ))
                .Take(5)
                .ToList();

            return result;
        }

        /// <summary>
        /// Zistite nám prosím všetky útoky spôsobené pri člnkovaní (attack type "Boating"), ktoré mal na vine žralok s prezývkou "White death". 
        /// Zaujímajú nás útoky z obdobia po 3.3.1960 (vrátane) a ľudia, ktorých meno začína na písmeno z intervalu <U, Z>.
        /// Výstup požadujeme ako zoznam mien zoradených abecedne.
        /// </summary>
        /// <returns>The query result</returns>
        public List<string> NonFatalAttemptOfWhiteDeathOnPeopleBetweenUAndZQuery()
        {
            var whiteDeathId = DataContext.SharkSpecies
                .Where(s => s.AlsoKnownAs == "White death")
                .Select(s => s.Id)
                .First();

            var UZPeople = DataContext.AttackedPeople
                .Where(p => p.Name != null && p.Name[0] >= 'U' && p.Name[0] <= 'Z')
                .Select(p => p.Id)
                .ToList();

            var attackedPersonsIds = DataContext.SharkAttacks
                .Where(a => a.AttackedPersonId != null && UZPeople.Contains((int) a.AttackedPersonId))
                .Where(a => a.Type == AttackType.Boating)
                .Where(a => a.SharkSpeciesId == whiteDeathId)
                .Where(a => a.DateTime >= new DateTime(1960, 3, 3))
                .Select(a => a.AttackedPersonId)
                .ToList();

            var result = DataContext.AttackedPeople
                .Where(p => attackedPersonsIds.Contains((int) p.Id))
                .Select(p => p.Name)
                .OrderBy(p => p)
                .ToList();

            return result;
        }

        /// <summary>
        /// Myslíme si, že rýchlejší žralok ma plnší žalúdok. 
        /// Požadujeme údaj o tom koľko percent útokov má na svedomí najrýchlejší a najpomalší žralok.
        /// Výstup požadujeme vo formáte: "{percentuálne zastúpenie najrýchlejšieho}% vs {percentuálne zastúpenie najpomalšieho}%"
        /// Perc. zastúpenie zaokrúhlite na jedno desatinné miesto.
        /// </summary>
        /// <returns>The query result</returns>
        public string FastestVsSlowestSharkQuery()
        {
            var allAttacksCount = DataContext.SharkAttacks.Count;

            var slowestSharksSpeed = DataContext.SharkSpecies
                .Where(s => s.TopSpeed != null)
                .Select(s => s.TopSpeed)
                .OrderBy(s => s)
                .First();

            var fastestSharksSpeed = DataContext.SharkSpecies
                .Select(s => s.TopSpeed)
                .OrderByDescending(s => s)
                .First();

            var slowestSharksIds = DataContext.SharkSpecies
                .Where(s => s.TopSpeed == slowestSharksSpeed)
                .Select(s => s.Id)
                .ToList();

            var fastestSharksIds = DataContext.SharkSpecies
                .Where(s => s.TopSpeed == fastestSharksSpeed)
                .Select(s => s.Id)
                .ToList();

            var slowestSharksAttacksCount = DataContext.SharkAttacks
                .Where(a => slowestSharksIds.Contains(a.SharkSpeciesId))
                .Count();

            var fastestSharksAttacksCount = DataContext.SharkAttacks
                .Where(a => fastestSharksIds.Contains(a.SharkSpeciesId))
                .Count();

            var fastestPercentage = Decimal.Round((decimal) fastestSharksAttacksCount / (decimal) allAttacksCount * 100, 1);
            var slowestPercentage = Decimal.Round((decimal) slowestSharksAttacksCount / (decimal) allAttacksCount * 100, 1);

            return fastestPercentage.ToString() + "% vs " + slowestPercentage.ToString() + "%";
        }

        /// <summary>
        /// Prišla nám požiadavka z hora, aby sme im vrátili zoznam, 
        /// v ktorom je textová informácia o KAŽDOM človeku na ktorého zaútočil žralok v štáte Bahamas.
        /// Táto informácia je taktiež v tvare:
        /// {meno človeka} was attacked by {latinský názov žraloka}
        /// 
        /// Ale pozor váš nový nadriadený ma panický strach z operácie Join alebo GroupJoin.
        /// Nariadil vám použiť metódu Zip.
        /// Zistite teda tieto informácie bez spojenia hocijakých dvoch tabuliek a s použitím metódy Zip.
        /// </summary>
        /// <returns>The query result</returns>

        /* VERZE BEZ ZIP
         * 
         * public List<string> AttackedPeopleInBahamasWithoutJoinQuery()
        {
            var bahamas = Bahamas();

            var result = DataContext.SharkAttacks
                .Where(a => a.CountryId == bahamas.Id)
                .Select(a => new
                {
                    PersonName = DataContext.AttackedPeople
                        .Where(p => p.Name != null && p.Id == a.AttackedPersonId)
                        .Select(p => p.Name)
                        .First(),
                    SharkName = DataContext.SharkSpecies
                        .Where(s => s.Name != null && s.Id == a.SharkSpeciesId)
                        .Select(s => s.LatinName)
                        .First()
                })
                .Select(a => a.PersonName + " was attacked by " + a.SharkName)
                .ToList();

            return result;
        } */

        public List<string> AttackedPeopleInBahamasWithoutJoinQuery()
        {
            var bahamas = Bahamas();

            var attackedPeople = DataContext.SharkAttacks
                .Where(a => a.CountryId == bahamas.Id)
                .OrderBy(a => a.AttackedPersonId)
                .Select(a => new
                {
                    PersonName = DataContext.AttackedPeople
                        .Where(p => p.Name != null && p.Id == a.AttackedPersonId)
                        .Select(p => p.Name)
                        .First()
                })
                .ToList();

            var sharks = DataContext.SharkAttacks
                .Where(a => a.CountryId == bahamas.Id)
                .OrderBy(a => a.AttackedPersonId)
                .Select(a => new
                {
                    SharkName = DataContext.SharkSpecies
                        .Where(s => s.Name != null && s.Id == a.SharkSpeciesId)
                        .Select(s => s.LatinName)
                        .First()
                })
                .ToList();

            var result = attackedPeople.Zip(sharks, (f, s) => f.PersonName + " was attacked by " + s.SharkName).ToList();

            return result;
        }

        /// <summary>
        /// Vráti počet útokov podľa mien žralokov, ktoré sa stali v Austrálii, vo formáte {meno žraloka}: {počet útokov}
        /// </summary>
        /// <returns>The query result</returns>
        public List<string> MostThreateningSharksInAustralia()
        {
            var australiaId = DataContext.Countries
                .Where(c => c.Name == "Australia")
                .Select(c => c.Id)
                .First();

            var australiaAttacks = DataContext.SharkAttacks
                .Where(a => a.CountryId == australiaId)
                .GroupBy(a => a.SharkSpeciesId)
                .Select(a => new { SharkId = a.Key, AttacksCount = a.ToList().Count() })
                .Select(a => new
                {
                    SharkName = DataContext.SharkSpecies
                        .Where(s => a.SharkId == s.Id)
                        .Select(s => s.Name)
                        .First(),
                    AttacksCount = a.AttacksCount
                })
                .Select(a => a.SharkName + ": " + a.AttacksCount)
                .ToList();

            return australiaAttacks;
        }
    }
}

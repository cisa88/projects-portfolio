import '../styles/style.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  MainPageInsuranceAtom,
  MainPageInsuranceCarAtom,
  MainPageInsurancePackageAtom,
} from '../../../state/atoms';

export interface InsurancePackageDTO {
  type: number;
  price: number;
  packages: number[];
}

export function InsuranceSelection() {
  const [step, setStep] = useRecoilState(MainPageInsuranceAtom);
  const [_, setPackage] = useRecoilState(MainPageInsurancePackageAtom);
  const car = useRecoilValue(MainPageInsuranceCarAtom);

  if (!car) return <></>; // should not happen

  const basePrice = [120, 220, 250];

  // generate price according to car params
  const calcPrice = Math.round(
    car.engineSize * 0.05 + car.powerKW * 0.05 + car.weight * 0.01
  );

  const onSubmit = (index: number) => {
    const packages = [];
    if (index == 0) {
      packages.push(0); // PZP
    } else if (index == 1) {
      packages.push(0); // PZP
      packages.push(1); // HAVARIJNA
    } else if (index == 2) {
      packages.push(0); // PZP
      packages.push(1); // HAVARIJNA
      packages.push(2); // SKLO
    }

    setPackage({
      packages: packages,
      price: basePrice[index] + calcPrice,
      type: index,
    });

    setStep(step + 1);
  };

  const getPriceString = (index: number) => (
    <h4 className="mt-2 text-4xl font-semibold text-gray-800 ">
      €{basePrice[index]}
      <span className="text-base font-normal text-gray-600 ">/ Mesiac</span>
    </h4>
  );

  return (
    <section className="bg-white">
      <div className="container px-6 py-8 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Vyberte si svoj balíček poistenia:
            </h2>

            <p className="mt-4 text-gray-500">
              Podľa údajov Vášho auta sme Vám vypočítali základ poistenia na
              nasledujúcu hodnotu:
              <span className="ml-2 font-semibold text-gray-800 ">
                €{calcPrice}
              </span>
              <br />K tejto hodnote sa Vám pričíta cena balíčka, ktorý si môžete
              vybrať nižšie. Poistenie si kedykoľvek môžete zmeniť v aplikácii
              alebo u nás na pobočke.
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-gray-200 ">
            <p className="text-lg font-medium text-gray-800 ">Základné</p>

            {getPriceString(0)}

            <p className="mt-4 text-gray-500 ">Povinné ručenie</p>

            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700 ">
                  Uhradenie škôd, spôsobených vami na cudzom majetku
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="red-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie vozidla v prípade nehody
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="red-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie proti prírodným katastrofám
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="red-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie v prípade krádeže vozidla
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="red-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie v prípade poničenia vozidla vandalom
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="red-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Pripoistenie čelného skla
                </span>
              </div>
            </div>

            <button
              onClick={() => onSubmit(0)}
              className="insurance-selection-color w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Vybrať plán
            </button>
          </div>

          <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-gray-200">
            <p className="text-lg font-medium text-gray-800">Doporučené</p>

            {getPriceString(1)}

            <p className="mt-4 text-gray-500">
              Povinné ručenie a poistenie proti haváriám
            </p>

            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Uhradenie škôd, spôsobených vami na cudzom majetku
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie vozidla v prípade nehody
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie proti prírodným katastrofám
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie v prípade krádeže vozidla
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie v prípade poničenia vozidla vandalom
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="red-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Pripoistenie čelného skla
                </span>
              </div>
            </div>

            <button
              onClick={() => onSubmit(1)}
              className="insurance-selection-color w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Vybrať plán
            </button>
          </div>

          <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-gray-200">
            <p className="text-lg font-medium text-gray-800 ">Premium</p>

            {getPriceString(2)}

            <p className="mt-4 text-gray-500">
              Povinné ručenie, poistenie proti haváriám a pripoistenie skla
            </p>

            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Uhradenie škôd, spôsobených vami na cudzom majetku
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie vozidla v prípade nehody
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie proti prírodným katastrofám
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie v prípade krádeže vozidla
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Poistenie v prípade poničenia vozidla vandalom
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="yellow-color w-5 h-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-4 text-gray-700">
                  Pripoistenie čelného skla
                </span>
              </div>
            </div>

            <button
              onClick={() => onSubmit(2)}
              className="insurance-selection-color w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Vybrať plán
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsuranceSelection;

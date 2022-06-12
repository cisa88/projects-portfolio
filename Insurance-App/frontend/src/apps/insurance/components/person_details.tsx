import React from 'react';
import logo from '../../landing_page/static/img/logo_poisti_sa.png';
import '../styles/style.css';

export function PersonDetails() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-18 w-auto" src={logo} alt="Workflow" />
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Zadajte údaje o osobe, ktorá chce auto poistiť
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="birth-year" className="sr-only">
                Birth Year
              </label>
              <input
                id="birth-year"
                name="birth-year"
                type="number"
                autoComplete="birth-year"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Rok vášho narodenia"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="crashes-in-year" className="sr-only">
                Crashes in Year
              </label>
              <select className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                {/* TODO:
                    change color of first option to gray-500 */}
                <option value="" disabled selected>
                  Koľko ste mali škôd z poistenia vozidla za posledné 2 roky?
                </option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4 a viac</option>
              </select>
            </div>
            <div>
              <label htmlFor="zip-code" className="sr-only">
                Zip Code
              </label>
              <input
                id="zip-code"
                name="zip-code"
                type="number"
                autoComplete="zip-code"
                required
                className="appearance-none rounded-none relative block w-full rounded-b-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="PSČ"
              />
            </div>
          </div>

          <div>
            {/* TODO:
            swap 'a href' with 'button' to check inserted values in form
          - problem with react-router-dom dunno why :-(
          - cannot swap pages with button withou react-router-dom */}
            <a
              href="/insurance/insurance-selection"
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Vypočítať pojistenie
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonDetails;

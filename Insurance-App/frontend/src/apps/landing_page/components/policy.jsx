import React from 'react';
import '../static/style.css';

export function Policy() {
  return (
    <section id="about" class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col">
          <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <div class="w-24 h-full bg-indigo-500"></div>
          </div>

          <div class="sm:flex-row flex-col py-6 mb-12">
            <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              Majte všetky vaše poistenie prehľadne pod jednou strechou
            </h1>
            <p class="sm:w-3/5 leading-relaxed text-base">
              Nehľadiac na to kde bývate a čo riadite, vystavíme vám poistenie na mieru.
            </p>
          </div>
        </div>

        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-center object-scale-down h-full w-full"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/hero01-800x740.png"
              />
            </div>

            <h2 class="text-xl font-medium title-font text-gray-900 mt-5">
              Kryjeme vám chrbát
            </h2>
            <p class="text-base leading-relaxed mt-2">
              Neváhajte sa nám so svojimi problémami ozvať.
              Naša podpora je tu pre vás 24/7.
            </p>
            <a class="text-indigo-500 inline-flex items-center mt-3">
              Podpora
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-center object-scale-down h-full w-full"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/hero02-800x760.png"
              />
            </div>

            <h2 class="text-xl font-medium title-font text-gray-900 mt-5">
              Nájdite si svoje poistenie a ušetrite
            </h2>
            <p class="text-base leading-relaxed mt-2">
              S našimi výhodnými balíčkami môžete ušetriť stovky eur za rok.
            </p>
            <a class="text-indigo-500 inline-flex items-center mt-3">
              Zisti viac
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-center object-scale-down h-full w-full"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/hero03-800x665.png"
              />
            </div>
            <h2 class="text-xl font-medium title-font text-gray-900 mt-5">
              Neviete si rady?
            </h2>
            <p class="text-base leading-relaxed mt-2">
              Prečítajte si často kladené otázky alebo napíšte našej podpore vaše otázky na e-mail a do jedného dňa sa vám ozveme späť.
            </p>
            <a class="text-indigo-500 inline-flex items-center mt-3">
              FAQ
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Policy;

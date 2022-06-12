import React from 'react';
import '../static/style.css';
import person_1 from '../static/img/person_1.jpg';
import person_2 from '../static/img/person_2.jpg';
import person_3 from '../static/img/person_3.jpg';
import person_4 from '../static/img/person_4.jpg';
import person_5 from '../static/img/person_5.jpg';
import person_6 from '../static/img/person_5.jpg';

export function Testimonials() {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 pb-24 mx-auto">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>

        <div class="sm:flex-row flex-col py-6 mb-12">
          <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
            Prečo práve MY?
          </h1>
          <p class="sm:w-3/5 leading-relaxed text-base">
            Sme mladá poistovňa pre mladých ludí. Naším cieľom je zvyšovať
            bezpečnosť Vás a Váších blízkych na cestách aj mimo nich.
          </p>
        </div>

        <div class="flex flex-wrap -m-4 text-center">
          <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="zelena-text w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 class="title-font font-medium text-3xl text-gray-900">
                Cez 2 000
              </h2>
              <p class="leading-relaxed">Klientov</p>
            </div>
          </div>

          <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="zelena-text w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24">
                <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
              </svg>
              <h2 class="title-font font-medium text-3xl text-gray-900">
                Vyše 50
              </h2>
              <p class="leading-relaxed">Operátorov</p>
            </div>
          </div>

          <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="zelena-text w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h2 class="title-font font-medium text-3xl text-gray-900">
                10000+
              </h2>
              <p class="leading-relaxed">Poistení</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container px-5 pb-24 mx-auto">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>

        <div class="sm:flex-row flex-col py-6 mb-12">
          <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
            Aké benefity ponúkame?
          </h1>
        </div>

        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          <div class="p-2 sm:w-1/2 w-full">
            <div class="bg-gray-100 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                class="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span class="title-font font-medium">Žiadne skryté poplatky</span>
            </div>
          </div>

          <div class="p-2 sm:w-1/2 w-full">
            <div class="bg-gray-100 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                class="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span class="title-font font-medium">24/7 dostupná podpora</span>
            </div>
          </div>

          <div class="p-2 sm:w-1/2 w-full">
            <div class="bg-gray-100 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                class="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span class="title-font font-medium">
                Intuitívna mobilná aplikácia
              </span>
            </div>
          </div>

          <div class="p-2 sm:w-1/2 w-full">
            <div class="bg-gray-100 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                class="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span class="title-font font-medium">
                Jasné zmluvné podmienky
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="container px-5 pb-24 mx-auto">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>

        <div class="sm:flex-row flex-col py-6 mb-12">
          <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
            Čo na to naši klienti?
          </h1>
        </div>

        <div class="w-full max-w-6xl mx-auto">
          <div class="-mx-3 md:flex items-start">
            <div class="px-3 md:w-1/3">
              <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div class="w-full flex mb-4 items-center">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src={person_1} alt="" />
                  </div>
                  <div class="flex-grow pl-3">
                    <h6 class="font-bold uppercase text-gray-600">
                      Laura H., Rimavská Sobota
                    </h6>
                  </div>
                </div>
                <div class="w-full">
                  <p>
                    <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                      Dobrá komunikácia, promtná reakcia, rýchly priebeh.
                    <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
              <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div class="w-full flex mb-4 items-center">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src={person_4} alt="" />
                  </div>
                  <div class="flex-grow pl-3">
                    <h6 class="font-bold  uppercase text-gray-600">
                      Viktor P., Nové Mesto nad Váhom
                    </h6>
                  </div>
                </div>
                <div class="w-full">
                  <p>
                    <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                      Nechápem vodičov, ktorí nemajú dojednané povinné ručenie.
                      Nikdy by som takto neriskoval.
                      V minulom roku som spôsobil menšiu nehodu.
                      Nikomu sa našťastie nič nestalo, ale škoda na druhom vozidle bola viac ako 4 000€.
                      Platiť zo svojho vrecka by som ju naozaj nechcel.
                      Povinné ručenie mám uzavreté cez stránky Poisti.sa, kde majú najlepšie ceny.
                    <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="px-3 md:w-1/3">
              <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div class="w-full flex mb-4 items-center">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src={person_2} alt="" />
                  </div>
                  <div class="flex-grow pl-3">
                    <h6 class="font-bold uppercase text-gray-600">
                      Kristína S., Dolný Kubín
                    </h6>
                  </div>
                </div>
                <div class="w-full">
                  <p>
                    <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                      Vlani na jar som si kúpila svoje prvé auto.
                      Chcela som si ho hneď poistiť a kamarát mi odporučil stránky Poisti.sa.
                      Vybrať si a uzavrieť povinné ručenie mi tu zabralo naozaj iba pár minú
                    <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
              <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div class="w-full flex mb-4 items-center">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src={person_3} alt="" />
                  </div>
                  <div class="flex-grow pl-3">
                    <h6 class="font-bold uppercase text-gray-600">
                      Martin P., Spišská Belá
                    </h6>
                  </div>
                </div>
                <div class="w-full">
                  <p>
                    <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                      Už niekoľko rokov si zásadne dojednávam povinné ručenie online.
                      Nezaberie to takmer žiadny čas, a pritom si vždy vyberiem najlacnejšie povinné ručenie.
                      Posledné dva roky využívam stránky Poisti.sa ktoré sú prehľadné, jednoduché a navyše vždy dostanem nejaký ten darček zadarmo.
                    <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="px-3 md:w-1/3">
              <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div class="w-full flex mb-4 items-center">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src={person_5} alt="" />
                  </div>
                  <div class="flex-grow pl-3">
                    <h6 class="font-bold uppercase text-gray-600">
                      Josef K., Topoľčany
                    </h6>
                  </div>
                </div>
                <div class="w-full">
                  <p>
                    <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                      Bezproblémové riešenie škodovej udalosti, rýchle, promptné, bez zbytočného predlžovania.
                      Ako pozitívum hodnotím možnosť komunikovať a riešiť škodovú udalosť online."                
                    <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
              <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div class="w-full flex mb-4 items-center">
                  <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src={person_6} alt="" />
                  </div>
                  <div class="flex-grow pl-3">
                    <h6 class="font-bold uppercase text-gray-600">
                      Katarína H., Žiar nad Hronom
                    </h6>
                  </div>
                </div>
                <div class="w-full">
                  <p>
                    <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                      Povinné ručenie vždy zariaďoval manžel.
                      Potom, čo sme sa rozviedli, som si ho prvýkrát zariaďovala sama.
                      Prekvapilo ma, aké je to ľahké, na Pojisti.sa som si rýchlo a ľahko našla ponuku poistenia a ešte v ten deň som mala auto poistené.
                      Vrelo odporúčam!
                    <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

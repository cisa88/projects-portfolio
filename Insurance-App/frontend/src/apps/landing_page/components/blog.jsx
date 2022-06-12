import React from 'react';
import '../static/style.css';

export function Blog() {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 pb-24 mx-auto">
        <div class="flex flex-col">
          <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <div class="w-24 h-full bg-indigo-500"></div>
          </div>

          <div class="sm:flex-row flex-col py-6 mb-12">
            <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              Naš blog
            </h1>
          </div>
        </div>

        <div class="flex flex-wrap -m-4">
          <div class="p-4 md:w-1/3">
            <div class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-indigo-200 overflow-hidden">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                src="https://cdn.discordapp.com/attachments/763055165607116900/983045022213611560/car_wash.jpg"
                alt="blog"
              />
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Prevencia
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-600 mb-3">
                  10 tipov ako udržiavať auto
                </h1>
                <p class="leading-relaxed mb-3">
                  Základom dobre fungujúceho auta je jeho údržba. Prečítajte si
                  10 základných tipov ako udržovať svoje auto.
                </p>
                <div class="flex items-center flex-wrap ">
                  <button class="bg-indigo-300 hover:scale-105 drop-shadow-md shadow-cla-violate px-4 py-1 rounded-lg">
                    Prečítaj
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-indigo-200 overflow-hidden">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                src="https://cdn.discordapp.com/attachments/763055165607116900/983044391935545416/auto_do_100000.jpg"
                alt="blog"
              />
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Blog
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-600 mb-3">
                  Najlepšie auto do 10 000 €.
                </h1>
                <p class="leading-relaxed mb-3">
                  V tomto blogu si skusíme odpovedať na otázku, ktorá trápi
                  mnohých z nás.
                </p>

                <div class="flex items-center flex-wrap ">
                  <button class="bg-indigo-300 hover:scale-105 drop-shadow-md shadow-cla-violate px-4 py-1 rounded-lg">
                    Prečítaj
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-indigo-200 overflow-hidden">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                src="https://cdn.discordapp.com/attachments/763055165607116900/983044791312982026/car_in_space.jpg"
                alt="blog"
              />
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Zábava
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-600 mb-3">
                  Auto vo vesmíre?
                </h1>
                <p class="leading-relaxed mb-3">
                  Neuveriteľné sa stalo skutočným! Elon Musk vyslal Tesla
                  Roadster na obežnú dráhu.
                </p>

                <div class="flex items-center flex-wrap ">
                  <button class="bg-indigo-300 hover:scale-105 drop-shadow-md shadow-cla-violate px-4 py-1 rounded-lg">
                    Prečítaj
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;

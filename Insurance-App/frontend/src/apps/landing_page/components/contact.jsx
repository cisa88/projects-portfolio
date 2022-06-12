import React from 'react';
import '../static/style.css';

export function Contact() {
  return (
    <section id="contact-us" class="text-black body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col">
          <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <div class="w-24 h-full bg-indigo-500"></div>
          </div>

          <div class="sm:flex-row flex-col py-6 mb-12">
            <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              Kontaktujte nás
            </h1>
            <p class="sm:w-3/5 leading-relaxed text-base">
              V prípade akýchkolvek otázok nás neváhajte kontakovať.
            </p>
          </div>
        </div>

        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm">
                  Meno
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm">
                  Správa
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>

            <div class="p-2 w-full">
              <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Odoslať
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

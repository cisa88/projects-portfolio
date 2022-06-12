import React from 'react';
import '../static/style.css';

export function Products() {
  return (
    <section id="services" class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Vyberte si vaše poistenie a ušetrite.
          </h1>
        </div>

        <div class="flex flex-wrap -m-4 text-center">
          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="flex flex-col border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                class="place-self-center object-center h-auto object-scale-down max-w-100px py-5"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/windshield.png"
                alt=""
                srcset=""
              />

              <h2 class="title-font font-medium text-xl text-gray-900">
                Povinne zmluvné poistenie
              </h2>
            </div>
          </div>

          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="flex flex-col border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                class="place-self-center object-center h-auto object-scale-down max-w-100px py-5"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/electric-car.png"
                alt=""
                srcset=""
              />

              <h2 class="title-font font-medium text-xl text-gray-900">
                Poistenie pre rodinu
              </h2>
            </div>
          </div>

          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="flex flex-col border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                class="place-self-center object-center h-auto object-scale-down max-w-100px py-5"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/tow-truck-1.png"
                alt=""
                srcset=""
              />

              <h2 class="title-font font-medium text-xl text-gray-900">
                Havarijné poistenie
              </h2>
            </div>
          </div>

          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="flex flex-col border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img
                class="place-self-center object-center h-auto object-scale-down max-w-100px py-5"
                src="https://insuranlife.1onestrong.com/wp-content/uploads/2022/03/windshield.png"
                alt=""
                srcset=""
              />

              <h2 class="title-font font-medium text-xl text-gray-900">
                Poistenie čelného skla
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;

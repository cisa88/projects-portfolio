import React from 'react';
import '../static/style.css';

export function Banner() {
  return (
    <section class="text-gray-600 body-font">
      <div className="bg-indigo-500">
        <div id="contact" class="container px-5 py-6 sm:py-24 mx-auto bg-cover">
          <span>
            <div class="lg:w-3/5 flex flex-col sm:flex-row">
              <h1 class="flex-grow sm:pr-16 text-3xl lg:text-5xl font-medium title-font text-gray-900">
                Splňte si svoje sny a poistite.sa
              </h1>

              <div className="sm:hidden">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Banner;

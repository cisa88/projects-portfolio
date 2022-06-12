import React from 'react';
import '../static/style.css';
import logo from '../static/img/logo_poisti_sa.png';

export function Header() {
  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex max-w-xs title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="Logo" />
          {/* <span class="ml-3 text-xl">Poisti.sa</span> */}
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="/#about" className="mr-5 hover:text-gray-900">
            O nás
          </a>
          <a href="/#services" className="mr-5 hover:text-gray-900">
            Služby
          </a>
          <a href="/#contact-us" className="mr-5 hover:text-gray-900">
            Kontaktujte nás
          </a>
        </nav>

        <a
          href="/login"
          class="inline-flex items-center hover-bg border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
          Klientská zóna
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;

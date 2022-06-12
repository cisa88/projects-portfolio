import React from 'react';
import '../static/style.css';
import logo from '../../landing_page/static/img/logo_poisti_sa.png';
import { useRecoilValue } from 'recoil';
import { LoginAtom } from '../../../state/atoms';
import { Navigate } from 'react-router';

export function Sidebar() {
  const auth = useRecoilValue(LoginAtom);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <nav className="w-56 bg-white dark:bg-gray-800 select-none overflow-y-auto transition duration-500 ease-in-out">
      <div className="flex flex-col items-center ">
        <img src={logo} alt="Logo" />

        <img
          className="h-16 w-16 rounded-full object-cover mt-4"
          src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg"
          alt="mickey mouse Profile"
        />
        <span
          className="capitalize mt-2 mb-6 dark:text-gray-400 transition
                duration-500 ease-in-out">
          {auth.firstName + ' ' + auth.lastName}
        </span>
      </div>

      <ul>
        <li
          className="pl-8 py-2 font-semibold text-pink-500 dark:text-pink-400
                border-l-2 border-pink-500 hover:bg-pink-200 mb-2 transition
                duration-500 ease-in-out">
          <button
            className="focus:text-pink-500 dark-focus:text-pink-400
                    focus:outline-none w-full transition duration-500 ease-in-out">
            <span className="flex items-center">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M15 5v4h-4v4H7v4H3v3h7v-4h4v-4h4V8h4V5h-7z"></path>
              </svg>

              <span className="ml-4 capitalize">Moje autá</span>
            </span>
          </button>
        </li>

        {/* <li
                class="pl-8 py-2 font-semibold text-gray-700 dark:text-gray-400
                hover:bg-pink-200 dark-hover:bg-pink-500 mb-2 transition
                duration-500 ease-in-out">

                <button
                    class="focus:text-pink-500 dark-focus:text-pink-400
                    focus:outline-none w-full transition duration-500 ease-in-out">

                    <span class="flex items-center">
                        <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path
                                d="M20 10H4V4h16m0 11H4v-2h16m0-11H4c-1.11 0-2
                                .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11
                                0 2-.89 2-2V4c0-1.11-.89-2-2-2z"></path>
                        </svg>
                        <span class="ml-4 capitalize">Moje poistenia</span>
                    </span>
                </button>
            </li> */}

        <li
          className="pl-8 py-2 font-semibold text-gray-700 dark:text-gray-400
                hover:bg-pink-200 dark-hover:bg-pink-500 transition duration-500
                ease-in-out">
          <button
            className="focus:text-pink-500 dark-focus:text-pink-400
                    focus:outline-none w-full transition duration-500 ease-in-out">
            <span className="flex items-center">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 496 512">
                <path
                  d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43
                                96-96-43-96-96-96zm0 144c-26.5
                                0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5
                                48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248
                                248-111 248-248S385 8 248 8zm0 448c-49.7
                                0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6
                                69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1
                                60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4
                                48.4-130.1
                                48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2
                                0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9
                                0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48
                                256c0-110.3 89.7-200 200-200s200 89.7 200 200c0
                                43.2-13.9 83.2-37.3 115.9z"></path>
              </svg>
              <span className="ml-4 capitalize">Môj profil</span>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

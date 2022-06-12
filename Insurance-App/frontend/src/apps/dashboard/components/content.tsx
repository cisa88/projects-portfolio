import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { AuthorizedUserDTO } from '../../../api/auth';
import { CarDTO, useGetCarsByUserIdSWR } from '../../../api/car';
import {
  InsuranceDTO,
  useGetInsurancesByUserIdSWR,
} from '../../../api/insurance';
import { useGetPackagesByInsuranceIdSWR } from '../../../api/package';
import { LoginAtom } from '../../../state/atoms';
import '../static/style.css';

const Packages = (props: { element: InsuranceDTO }) => {
  const { data, error } = useGetPackagesByInsuranceIdSWR(props.element.id);

  if (error) return <div>Failed to load {JSON.stringify(error)}</div>;
  if (!data) return <div>Loading...</div>;

  let packagesStr = '';

  data.data.forEach((element) => {
    packagesStr = packagesStr + ' ' + element.insuranceType;
  });

  return <>{packagesStr}</>;
};

const Insurances = (props: { element: CarDTO }) => {
  const { data, error } = useGetInsurancesByUserIdSWR(props.element.userID);

  if (error) return <div>Failed to load {JSON.stringify(error)}</div>;
  if (!data) return <div>Loading...</div>;

  const carInsurance = data.data.filter(
    (insurance) => insurance.carID == props.element.id
  );

  if (!carInsurance[0]) return <>Žiadne poistenia</>;

  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row mt-2">
        <div
          className="flex w-full items-center justify-between bg-white
                        dark:bg-gray-800 px-8 py-6 border-l-4 border-green-500
                        dark:border-green-300">
          <div className="flex">
            <div className="flex flex-col ml-6">
              <span className="text-lg font-bold">
                {carInsurance[0].monthlyRate.toString() + '€'}
              </span>
              <div className="mt-4 flex">
                <div className="ml-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
                  <Packages element={carInsurance[0]} />
                </div>

                <div className="flex ml-6">
                  <svg
                    className="h-5 w-5 fill-current
                                            dark:text-gray-300"
                    viewBox="0 0 24 24">
                    <path
                      d="M19
                                                19H5V8h14m-3-7v2H8V1H6v2H5c-1.11
                                                0-2 .89-2 2v14a2 2 0 002 2h14a2 2
                                                0 002-2V5a2 2 0 00-2-2h-1V1m-1
                                                11h-5v5h5v-5z"></path>
                  </svg>
                  <span
                    className="ml-2 text-sm text-gray-600
                                            dark:text-gray-300 capitalize">
                    {carInsurance[0].dueDate.toString().slice(0, 10)}
                  </span>
                </div>

                {/* <div className="flex ml-6">
                    <svg
                      className="h-5 w-5 fill-current
                                            dark:text-gray-300"
                      viewBox="0 0 24 24">
                      <path
                        d="M13 2.05v2.02c3.95.49 7 3.85 7
                                                7.93 0 3.21-1.92 6-4.72 7.28L13
                                                17v5h5l-1.22-1.22C19.91 19.07 22
                                                15.76 22
                                                12c0-5.18-3.95-9.45-9-9.95M11
                                                2c-1.95.2-3.8.96-5.32 2.21L7.1
                                                5.63A8.195 8.195 0 0111 4V2M4.2
                                                5.68C2.96 7.2 2.2 9.05 2
                                                11h2c.19-1.42.75-2.77
                                                1.63-3.9L4.2 5.68M6
                                                8v2h3v1H8c-1.1 0-2 .9-2
                                                2v3h5v-2H8v-1h1c1.11 0 2-.89
                                                2-2v-1a2 2 0 00-2-2H6m6
                                                0v5h3v3h2v-3h1v-2h-1V8h-2v3h-1V8h-2M2
                                                13c.2 1.95.97 3.8 2.22
                                                5.32l1.42-1.42A8.21 8.21 0 014
                                                13H2m5.11 5.37l-1.43 1.42A10.04
                                                10.04 0 0011 22v-2a8.063 8.063 0
                                                01-3.89-1.63z"></path>
                    </svg>
                    <span
                      className="ml-2 text-sm text-gray-600
                                            dark:text-gray-300 capitalize">
                      {useGetPackagesByInsuranceIdSWR(element.id).}
                    </span>
                  </div> */}
              </div>
              <div className="mt-4 flex"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarDiv = (props: { element: CarDTO }) => {
  const [showInsurances, setShowInsurances] = useState(false);

  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row mt-2">
        <div
          className="flex w-full items-center justify-between bg-white
                        dark:bg-gray-800 px-8 py-6 border-l-4 border-green-500
                        dark:border-green-300">
          <div className="flex">
            <div className="flex flex-col ml-6">
              <span className="text-lg font-bold">
                {props.element.brand + ' ' + props.element.model}
              </span>
              <div className="mt-4 flex">
                <div className="ml-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
                  {props.element.plate}
                </div>

                <div className="flex ml-6">
                  <svg
                    className="h-5 w-5 fill-current
                                            dark:text-gray-300"
                    viewBox="0 0 24 24">
                    <path
                      d="M19
                                                19H5V8h14m-3-7v2H8V1H6v2H5c-1.11
                                                0-2 .89-2 2v14a2 2 0 002 2h14a2 2
                                                0 002-2V5a2 2 0 00-2-2h-1V1m-1
                                                11h-5v5h5v-5z"></path>
                  </svg>
                  <span
                    className="ml-2 text-sm text-gray-600
                                            dark:text-gray-300 capitalize">
                    {props.element.registered.toString().slice(0, 10)}
                  </span>
                </div>

                {/* <div className="flex ml-6">
                    <svg
                      className="h-5 w-5 fill-current
                                            dark:text-gray-300"
                      viewBox="0 0 24 24">
                      <path
                        d="M13 2.05v2.02c3.95.49 7 3.85 7
                                                7.93 0 3.21-1.92 6-4.72 7.28L13
                                                17v5h5l-1.22-1.22C19.91 19.07 22
                                                15.76 22
                                                12c0-5.18-3.95-9.45-9-9.95M11
                                                2c-1.95.2-3.8.96-5.32 2.21L7.1
                                                5.63A8.195 8.195 0 0111 4V2M4.2
                                                5.68C2.96 7.2 2.2 9.05 2
                                                11h2c.19-1.42.75-2.77
                                                1.63-3.9L4.2 5.68M6
                                                8v2h3v1H8c-1.1 0-2 .9-2
                                                2v3h5v-2H8v-1h1c1.11 0 2-.89
                                                2-2v-1a2 2 0 00-2-2H6m6
                                                0v5h3v3h2v-3h1v-2h-1V8h-2v3h-1V8h-2M2
                                                13c.2 1.95.97 3.8 2.22
                                                5.32l1.42-1.42A8.21 8.21 0 014
                                                13H2m5.11 5.37l-1.43 1.42A10.04
                                                10.04 0 0011 22v-2a8.063 8.063 0
                                                01-3.89-1.63z"></path>
                    </svg>
                    <span
                      className="ml-2 text-sm text-gray-600
                                            dark:text-gray-300 capitalize">
                      {useGetPackagesByInsuranceIdSWR(element.id).}
                    </span>
                  </div> */}
              </div>

              <div className="mt-4 flex">
                <button
                  className="flex items-center
                                        focus:outline-none border rounded-full
                                        py-2 px-6 leading-none border-gray-500
                                        dark:border-gray-600 select-none
                                        hover:bg-blue-400 hover:text-white
                                        dark-hover:text-gray-200"
                  onClick={() => setShowInsurances(!showInsurances)}>
                  <span>
                    {showInsurances ? 'Skryt poistenia' : 'Zobraz poistenia'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInsurances ? <Insurances element={props.element} /> : ''}
    </div>
  );
};

const Fetch = (props: { id: number }) => {
  const { data, error } = useGetCarsByUserIdSWR(props.id);

  if (error) return <div>Failed to load {JSON.stringify(error)}</div>;
  if (!data) return <div>Loading...</div>;

  const mapped = data.data.map((element) => (
    <>
      <div
        className="border dark:border-gray-700 transition duration-500
                ease-in-out"></div>
      <CarDiv element={element} />
    </>
  ));
  return <div>{mapped}</div>;
};

const Content = () => {
  const auth = useRecoilValue(LoginAtom);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex-1 bg-gray-200 dark:bg-gray-900 overflow-y-auto transition duration-500 ease-in-out">
      <div
        className="px-24 py-12 text-gray-700 dark:text-gray-500 transition
            duration-500 ease-in-out">
        <h2 className="text-4xl font-medium capitalize">Moje autá</h2>
        <div className="mt-1 mb-4 flex items-center justify-between">
          <div className="flex items-center select-none">
            <span className="hover:text-pink-500 cursor-pointer mr-3">
              <svg viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                <path
                  d="M505 442.7L405.3
                                343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
                                44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1
                                208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4
                                2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
                                0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
                                0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0
                                128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </span>

            <input
              className="bg-transparent focus:outline-none"
              placeholder="Search in activity"
            />
          </div>

          <button
            className="flex items-center focus:outline-none border
                    rounded-full py-2 px-6 leading-none border-gray-500
                    select-none hover:text-pink-600 hover:bg-pink-300">
            <svg className="h-5 w-5 fill-current mr-1" viewBox="0 0 24 24">
              <path
                d="M12 1L8 5h3v9h2V5h3m2 18H6a2 2 0 01-2-2V9a2 2 0
                            012-2h3v2H6v12h12V9h-3V7h3a2 2 0 012 2v12a2 2 0 01-2
                            2z"></path>
            </svg>
            <span>Export</span>
          </button>

          <div className="flex items-center select-none">
            <span>Filter</span>
            <button
              className="ml-3 bg-gray-400 dark:bg-gray-600
                        dark:text-gray-400 rounded-full p-2 focus:outline-none
                        hover:text-pink-500 hover:bg-pink-300 transition
                        duration-500 ease-in-out">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0
                                01-1.41 0l-2.01-2.01a.989.989 0
                                01-.29-.83V12h-.03L4.21 4.62a1 1 0
                                01.17-1.4c.19-.14.4-.22.62-.22h14c.22 0
                                .43.08.62.22a1 1 0 01.17 1.4L14.03 12H14z"></path>
              </svg>
            </button>
            <button
              className="ml-2 bg-gray-400 dark:bg-gray-600
                        dark:text-gray-400 rounded-full p-2 focus:outline-none
                        hover:text-pink-500 hover:bg-pink-300 transition
                        duration-500 ease-in-out">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                                19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
              </svg>
            </button>
            <button
              className="ml-2 bg-gray-400 dark:bg-gray-600
                        dark:text-gray-400 rounded-full p-2 focus:outline-none
                        hover:text-pink-500 hover:bg-pink-300 transition
                        duration-500 ease-in-out">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4
                                4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21
                                3.58-4 8-4z"></path>
              </svg>
            </button>
          </div>
        </div>
        <Fetch id={auth.id} />
      </div>
    </main>
  );
};

export default Content;

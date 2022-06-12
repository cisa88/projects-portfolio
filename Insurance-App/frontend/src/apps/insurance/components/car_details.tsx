import logo from '../../landing_page/static/img/logo_poisti_sa.png';
import '../styles/style.css';

import { useForm } from 'react-hook-form';
import { AddCarDTO, carBrands, useGetCarModelsSWR } from '../../../api/car';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState } from 'recoil';
import {
  MainPageInsuranceAtom,
  MainPageInsuranceCarAtom,
} from '../../../state/atoms';
import { useEffect, useState } from 'react';

const schema = yup
  .object({
    plate: yup.string().min(5, 'Musí mať aspoň 5 znakov.').required(),
    brand: yup.string().required('Prosím, zvoľte si jednu z možností.'),
    model: yup.string().required('Prosím, zvoľte si jednu z možností.'),
    engineSize: yup.number().typeError('Zadajte číslo.').required(),
    powerKW: yup
      .number()
      .min(1, 'Číslo musí byť v rozmedzí 1-9999.')
      .max(9999, 'Číslo musí byť v rozmedzí 1-9999.')
      .typeError('Zadajte číslo.')
      .required(),
    weight: yup
      .number()
      .min(500, 'Číslo musí byť v rozmedzí 500-5000.')
      .max(5000, 'Číslo musí byť v rozmedzí 500-5000.')
      .typeError('Zadajte číslo.')
      .required(),
    registered: yup
      .number()
      .min(1900, 'Číslo musí byť v rozmedzí 1900-2022.')
      .max(2022, 'Číslo musí byť v rozmedzí 1900-2022.')
      .typeError('Zadajte číslo.')
      .required(),
    fuelType: yup
      .number()
      .typeError('Prosím, zvoľte si jednu z možností.')
      .required(),
    //userID: yup.number().required(),
  })
  .required();

const CarBrands = () => {
  const options = carBrands.map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ));

  return <>{options}</>;
};

const CarModels = (props: { brand: string }) => {
  const { data, error } = useGetCarModelsSWR(props.brand);
  if (error) return <></>;
  if (!data) return <>Loading</>;

  const options = data.results.map((model) => {
    const showName = model.Model + ' ' + model.Year;

    return (
      <option key={model.objectId} value={showName}>
        {showName}
      </option>
    );
  });

  return <>{options}</>;
};

const CarDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCarDTO>({ resolver: yupResolver(schema) });

  const [brand, setBrand] = useState<string>();
  const [step, setStep] = useRecoilState(MainPageInsuranceAtom);
  const [_, setCar] = useRecoilState(MainPageInsuranceCarAtom);

  const onSubmit = handleSubmit((car) => {
    setCar(car);
    setStep(step + 1);
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-18 w-auto" src={logo} alt="Workflow" />
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Zadajte údaje o aute, ktoré chcete poistiť
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="plate" className="sr-only">
                Plate
              </label>
              <input
                {...register('plate')}
                type="text"
                autoComplete="plate"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ŠPZ"
              />
              <div className="error">{errors.plate?.message}</div>
            </div>
            <div>
              <label htmlFor="brand" className="sr-only">
                Brand
              </label>
              <select
                {...register('brand')}
                onChange={(e) => setBrand(e.target.value)}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                {/* TODO:
                  change color of first option to gray-500 */}
                <option value="" disabled>
                  Značka
                </option>
                <CarBrands />
              </select>
              <div className="error">{errors.brand?.message}</div>
            </div>
            <div>
              <label htmlFor="model" className="sr-only">
                Model
              </label>
              <select
                {...register('model')}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                {/* TODO:
                  change color of first option to gray-500 */}
                <option value="" disabled>
                  Model
                </option>
                {brand ? <CarModels brand={brand} /> : <></>}
              </select>
              <div className="error">{errors.model?.message}</div>
            </div>
            <div>
              <label htmlFor="registered" className="sr-only">
                Year of first evidence
              </label>
              <input
                {...register('registered')}
                type="number"
                autoComplete="registered"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Rok prvej evidencie"
              />
              <div className="error">{errors.registered?.message}</div>
            </div>
            <div>
              <label htmlFor="engineSize" className="sr-only">
                Engine capacity
              </label>
              <input
                {...register('engineSize')}
                type="number"
                autoComplete="engineSize"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Objem motora (cm&sup3;)"
              />
              <div className="error">{errors.engineSize?.message}</div>
            </div>
            <div>
              <label htmlFor="weight" className="sr-only">
                Weight
              </label>
              <input
                {...register('weight')}
                type="number"
                autoComplete="weight"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Hmotnosť (max. prípustná v kg)"
              />
              <div className="error">{errors.weight?.message}</div>
            </div>
            <div>
              <label htmlFor="powerKW" className="sr-only">
                Engine Power
              </label>
              <input
                {...register('powerKW')}
                type="number"
                autoComplete="powerKW"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Výkon motora (kW)"
              />
              <div className="error">{errors.powerKW?.message}</div>
            </div>
            <div>
              <label htmlFor="fuelType" className="sr-only">
                Fuel type
              </label>
              <select
                {...register('fuelType')}
                defaultValue=""
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                {/* TODO:
                  change color of first option to gray-500 */}
                <option value="" disabled>
                  Palivo
                </option>
                <option value="0">Nafta</option>
                <option value="2">Benzín</option>
                <option value="4">LPG</option>
                <option value="3">Hybrid</option>
                <option value="1">Elektrina</option>
              </select>
              <div className="error">{errors.fuelType?.message}</div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Ďalej
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;

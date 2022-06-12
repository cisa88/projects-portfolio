import logo from '../../../landing_page/static/img/logo_poisti_sa.png';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RegisterAtom, RegisterContactAtom } from '../../../../state/atoms';
import { useRecoilState } from 'recoil';

const schema = yup.object({
  phone: yup.string().min(9, 'Musí mať aspoň 9 znakov.').required(),
  street: yup.string().required(),
  streetNumber: yup.number().typeError('Zadajte číslo.').required(),
  city: yup.string().required(),
  zip: yup.string().required(),
});

interface RegisterContactDTO {
  phone: string;
  street: string;
  streetNumber: number;
  city: string;
  zip: string;
}

const ContactInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterContactDTO>({ resolver: yupResolver(schema) });

  const [step, setStep] = useRecoilState(RegisterAtom);
  const [_, setContact] = useRecoilState(RegisterContactAtom);

  const onSubmit = handleSubmit((contact) => {
    const { streetNumber, street, ...newContact } = contact;

    setContact({
      ...newContact,
      street: street + ' ' + streetNumber,
      userID: 0,
    });

    setStep(step + 1);
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-18 w-auto" src={logo} alt="Logo" />
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Kontaktné údaje:
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="phone" className="sr-only">
                Telephone Number:
              </label>
              <input
                {...register('phone')}
                type="text"
                autoComplete="phone"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Telefón"
              />
              <div className="error">{errors.phone?.message}</div>
            </div>
            <div>
              <label htmlFor="street" className="sr-only">
                Ulica:
              </label>
              <input
                {...register('street')}
                type="text"
                autoComplete="street"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ulica"
              />
              <div className="error">{errors.street?.message}</div>
            </div>
            <div>
              <label htmlFor="streetNumber" className="sr-only">
                House Number:
              </label>
              <input
                {...register('streetNumber')}
                type="text"
                autoComplete="streetNumber"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Súpisné číslo"
              />
              <div className="error">{errors.streetNumber?.message}</div>
            </div>
            <div>
              <label htmlFor="zip" className="sr-only">
                Zip Code:
              </label>
              <input
                {...register('zip')}
                type="text"
                autoComplete="zip"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="PSČ"
              />
              <div className="error">{errors.zip?.message}</div>
            </div>
            <div>
              <label htmlFor="city" className="sr-only">
                City:
              </label>
              <input
                {...register('city')}
                type="text"
                autoComplete="city"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mesto"
              />
              <div className="error">{errors.city?.message}</div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Dokončiť
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInformation;

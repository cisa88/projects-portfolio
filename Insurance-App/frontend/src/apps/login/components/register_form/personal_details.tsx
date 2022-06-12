import logo from '../../../landing_page/static/img/logo_poisti_sa.png';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RegisterAtom, RegisterUserAtom } from '../../../../state/atoms';
import { useRecoilState } from 'recoil';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string(),
  birthDate: yup.date().required(),
  citizenID: yup.string().required(),
  licenseDate: yup.date().required(),
});

interface RegisterPersonalDTO {
  firstName: string;
  lastName?: string;
  birthDate: Date;
  citizenID: string;
  licenseDate: Date;
}

const PersonalDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPersonalDTO>({ resolver: yupResolver(schema) });

  const [step, setStep] = useRecoilState(RegisterAtom);
  const [getUser, setUser] = useRecoilState(RegisterUserAtom);

  if (!getUser) {
    setStep(0);
    return <></>;
  }

  const onSubmit = handleSubmit((personal) => {
    setUser({ ...getUser, ...personal });
    setStep(step + 1);
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-18 w-auto" src={logo} alt="Logo" />
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Osobné údaje:
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name:
              </label>
              <input
                {...register('firstName')}
                type="text"
                autoComplete="firstName"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Meno"
              />
              <div className="error">{errors.firstName?.message}</div>
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name:
              </label>
              <input
                {...register('lastName')}
                type="text"
                autoComplete="lastName"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Priezvisko"
              />
              <div className="error">{errors.lastName?.message}</div>
            </div>
            <div>
              {/* TODO:
                replace dd.mm.rrrr with Dátum narodenia
                datepicker should work fine for this, but it shows only blank page when I use it... */}
              <label htmlFor="birthDate" className="sr-only">
                Birth Date:
              </label>
              <input
                {...register('birthDate')}
                type="date"
                autoComplete="birthDate"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Dátum narodenia"
              />
              <div className="error">{errors.birthDate?.message}</div>
            </div>
            <div>
              <label htmlFor="citizenID" className="sr-only">
                Citizen ID:
              </label>
              <input
                {...register('citizenID')}
                type="text"
                autoComplete="citizenID"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Číslo občianskeho preukazu"
              />
              <div className="error">{errors.citizenID?.message}</div>
            </div>
            <div>
              {/* TODO:
                replace dd.mm.rrrr with Dátum vystavenia vodičského preukazu
                datepicker should work fine for this, but it shows only blank page when I use it... */}
              <label htmlFor="licenseDate" className="sr-only">
                Driver License Date:
              </label>
              <input
                {...register('licenseDate')}
                type="date"
                autoComplete="licenseDate"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Dátum vystavenia vodičského preukazu"
              />
              <div className="error">{errors.licenseDate?.message}</div>
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
              Ďalej
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;

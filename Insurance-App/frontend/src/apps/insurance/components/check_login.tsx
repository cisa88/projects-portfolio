import logo from '../../landing_page/static/img/logo_poisti_sa.png';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { LoginAtom, MainPageInsuranceAtom } from '../../../state/atoms';
import { login, LoginDTO } from '../../../api/auth';
import { getUserByEmail } from '../../../api/user';

const schema = yup.object({
  email: yup.string().email('Email je v nesprávnom tvare.').required(),
  password: yup.string().required(),
});

const CheckLogin = () => {
  const [getError, setError] = useState<JSX.Element>(<></>);
  const [_, setLogin] = useRecoilState(LoginAtom);
  const [step, setStep] = useRecoilState(MainPageInsuranceAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (obj) => {
    try {
      const token = await login(obj);

      const user = await getUserByEmail(obj.email);
      if (!user) return; // should not happen

      const authorizedUser = { ...user, token };
      setLogin(authorizedUser);
      setStep(step + 1);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 404)
          setError(<div>Používateľ s týmto emailom neexistuje.</div>);
        else if (error.response?.status == 401)
          setError(<div>Zadali ste nesprávne heslo.</div>);
        else setError(<div>Nastala chyba, nebolo možné Vás prihlásiť.</div>);
      }
    }
  });

  const onRegister = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-18 w-auto" src={logo} alt="Workflow" />
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Na pokračovanie sa musíte prihlásiť do nášho systému
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
              <div className="error">{errors.email?.message}</div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Heslo"
              />
              <div className="error">{errors.password?.message}</div>
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
              Prihlásiť sa
            </button>
          </div>

          <div className="flex items-center justify-center text-sm">
            <button
              onClick={onRegister}
              className="font-medium text-indigo-600 hover:text-indigo-500">
              {' '}
              Nemáte účet?{' '}
            </button>
          </div>
        </form>
        {getError}
      </div>
    </div>
  );
};

export default CheckLogin;

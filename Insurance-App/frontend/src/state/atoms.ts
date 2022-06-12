import { atom } from 'recoil';
import { AuthorizedUserDTO } from '../api/auth';
import { AddCarDTO } from '../api/car';
import { AddContactDTO } from '../api/contact';
import { AddUserDTO } from '../api/user';
import { InsurancePackageDTO } from '../apps/insurance/components/insurance_selection';

export const MainPageInsuranceAtom = atom<number>({
  key: 'MainPageInsuranceAtom',
  default: 0,
});

export const MainPageInsuranceCarAtom = atom<AddCarDTO | undefined>({
  key: 'MainPageInsuranceCarAtom',
  default: undefined,
});

export const MainPageInsurancePackageAtom = atom<
  InsurancePackageDTO | undefined
>({
  key: 'MainPageInsurancePackageAtom',
  default: undefined,
});

export const RegisterAtom = atom<number>({
  key: 'RegisterAtom',
  default: 0,
});

export const RegisterUserAtom = atom<AddUserDTO | undefined>({
  key: 'RegisterUserAtom',
  default: undefined,
});

export const RegisterContactAtom = atom<AddContactDTO | undefined>({
  key: 'RegisterContactAtom',
  default: undefined,
});

export const LoginAtom = atom<AuthorizedUserDTO | undefined>({
  key: 'LoginAtom',
  default: undefined,
});

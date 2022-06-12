import { selector } from 'recoil';
import { LoginAtom, MainPageInsuranceAtom, RegisterAtom } from './atoms';
import CarDetails from '../apps/insurance/components/car_details';
import InsuranceSelection from '../apps/insurance/components/insurance_selection';
import LoginDetails from '../apps/login/components/register_form/login_details';
import ContactInformation from '../apps/login/components/register_form/contact_information';
import PersonalDetails from '../apps/login/components/register_form/personal_details';
import FinishRegistration from '../apps/login/components/register_form/finish_registration';
import CheckLogin from '../apps/insurance/components/check_login';
import FinishInsurance from '../apps/insurance/components/finish_insurance';

export const MainPageInsuranceStepSelector = selector<JSX.Element>({
  key: 'MainPageInsuranceStepSelector',
  get: ({ get }) => {
    const insuranceAtom = get(MainPageInsuranceAtom);
    const registerAtom = get(RegisterAtom);
    const loginAtom = get(LoginAtom);

    if (insuranceAtom == 0) return <CarDetails />;
    if (insuranceAtom == 1) return <InsuranceSelection />;
    if (insuranceAtom == 2) return <CheckLogin />;

    // not registered
    if (!loginAtom) {
      if (registerAtom == 0) return <LoginDetails />;
      if (registerAtom == 1) return <PersonalDetails />;
      if (registerAtom == 2) return <ContactInformation />;
    }

    return <FinishInsurance />;
  },
});

export const RegisterStepSelector = selector<JSX.Element>({
  key: 'RegisterStepSelector',
  get: ({ get }) => {
    const registerAtom = get(RegisterAtom);

    if (registerAtom == 0) return <LoginDetails />;
    if (registerAtom == 1) return <PersonalDetails />;
    if (registerAtom == 2) return <ContactInformation />;

    return <FinishRegistration />;
  },
});

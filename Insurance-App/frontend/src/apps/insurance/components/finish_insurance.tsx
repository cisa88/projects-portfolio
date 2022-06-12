import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addContact } from '../../../api/contact';
import { addUser, getUserByEmail, UserDTO } from '../../../api/user';
import { login, LoginDTO } from '../../../api/auth';

import {
  LoginAtom,
  MainPageInsuranceCarAtom,
  MainPageInsurancePackageAtom,
  RegisterContactAtom,
  RegisterUserAtom,
} from '../../../state/atoms';
import { addCar } from '../../../api/car';
import { addInsurance } from '../../../api/insurance';
import { addPackage } from '../../../api/package';

const FinishInsurance = () => {
  const [loginObj, setLoginObj] = useRecoilState(LoginAtom);
  const registerUser = useRecoilValue(RegisterUserAtom);
  const registerContact = useRecoilValue(RegisterContactAtom);
  const [result, setResult] = useState<JSX.Element | undefined>(undefined);
  const insuranceCar = useRecoilValue(MainPageInsuranceCarAtom);
  const insurancePackage = useRecoilValue(MainPageInsurancePackageAtom);

  useEffect(() => {
    (async () => {
      try {
        if (!insuranceCar || !insurancePackage) throw new Error('Invalid form');

        let user: UserDTO | undefined = undefined;

        // user has new account
        if (
          !loginObj &&
          registerUser &&
          registerContact &&
          registerUser.passwdHash
        ) {
          const newUser = await addUser(registerUser);
          const contactCopy = { ...registerContact, userID: newUser.id };
          await addContact(contactCopy);

          user = newUser;
        } else {
          user = loginObj;
        }

        if (!user) throw new Error('Invalid user');

        // add new car
        const carCopy = { ...insuranceCar, userID: user.id };
        const newCar = await addCar(carCopy);

        // calculate packages price

        // due date month from now
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + 1);

        // create new insurance
        const newInsurance = await addInsurance({
          userID: user.id,
          carID: newCar.id,
          monthlyRate: insurancePackage.price,
          dueDate: dueDate,
        });

        // add packages to insurance
        insurancePackage.packages.forEach(async (pkg) => {
          await addPackage({
            insuranceID: newInsurance.id,
            insuranceType: pkg,
          });
        });

        setResult(
          <div>
            <h1>Registrácia novej poistky bola úspešná. Vitajte u nás.</h1>
            <div>Green Checkmark</div>
            <a href="/login">Prihlásiť sa</a>
            <a href="/">Späť na hlavnú stránku</a>
          </div>
        );
      } catch (error) {
        setResult(
          <div>
            <h1>Je nám to ľúto, ale nevedeli sme Vás zaregistrovať.</h1>
            <div>Chyba</div>
            <div>{JSON.stringify(error)}</div>
            <div>Red Cross</div>
            <a href="/">Späť na hlavnú stránku</a>
          </div>
        );
      }
    })();
  }, [loginObj, registerContact, registerUser, setLoginObj]);

  return result ?? <h1>Loading</h1>;
};

export default FinishInsurance;

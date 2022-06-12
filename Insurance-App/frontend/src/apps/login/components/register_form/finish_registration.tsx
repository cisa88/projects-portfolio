import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { addContact } from '../../../../api/contact';
import { addUser } from '../../../../api/user';
import { RegisterContactAtom, RegisterUserAtom } from '../../../../state/atoms';
import '../../styles/style.css';

const FinishRegistration = () => {
  const user = useRecoilValue(RegisterUserAtom);
  const contact = useRecoilValue(RegisterContactAtom);
  const [result, setResult] = useState<JSX.Element | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!user || !contact) {
        return;
      }

      try {
        const newUser = await addUser(user);
        const contactCopy = { ...contact, userID: newUser.id };
        await addContact(contactCopy);

        setResult(
          <div className="flex purple-color items-center justify-center h-screen bg-white">
            <div className="bg-white rounded-2xl shadow-x1 p-10 max-w-lg">
              <div className="flex flex-col items-center space-y-4">
                <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                  Registrácia úspešná!
                </h1>
                
                <svg className="fill-lime-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
                <p className="text-sm text-gray-500 text-center w-5/6">
                  Registrácia bola úspešná, pokračujte prihlásením alebo sa vráťte na hlavnú stránku.
                </p>
                <div className="flex flex-col items-center justify-center">
                  <a href="/login" className="my-2 text-center text-white border-2 yellow-color rounded-md font-semibold px-4 py-3 w-max">
                    Prihlásiť sa
                  </a>
                  <a href="/" className="my-2 text-center text-white border-2 yellow-color rounded-md font-semibold px-4 py-3 w-max">
                    Späť na hlavnú stránku
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      } catch (error) {
        setResult(
          <div className="flex purple-color items-center justify-center h-screen bg-white">
            <div className="bg-white rounded-2xl shadow-x1 p-10 max-w-lg">
              <div className="flex flex-col items-center space-y-4">
                <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                  Je nám to ľúto, ale nevedeli sme Vás zaregistrovať.
                </h1>
                <svg className="fill-red-500" width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
                <p className="text-sm text-gray-500 text-center w-5/6">
                  Chyba je na našej strane, prosím skúste to o chvíľu znova.
                </p>
                <a href="/" className="text-center text-white border-2 yellow-color rounded-md font-semibold px-4 py-3 w-max">
                  Späť na hlavnú stránku
                </a>
              </div>
            </div>
          </div>
        );
      }
    })();
  }, [contact, user]);

  return result ?? <h1>Loading</h1>;
};

export default FinishRegistration;

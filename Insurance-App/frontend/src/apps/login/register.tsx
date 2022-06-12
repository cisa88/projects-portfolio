import { useRecoilValue } from 'recoil';
import { RegisterStepSelector } from '../../state/selectors';

const Register = () => {
  const currentElement = useRecoilValue(RegisterStepSelector);
  return currentElement;
};

export default Register;

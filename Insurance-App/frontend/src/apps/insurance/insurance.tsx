import { useRecoilValue } from 'recoil';
import { MainPageInsuranceStepSelector } from '../../state/selectors';

const Insurance = () => {
  const currentElement = useRecoilValue(MainPageInsuranceStepSelector);
  return currentElement;
};

export default Insurance;

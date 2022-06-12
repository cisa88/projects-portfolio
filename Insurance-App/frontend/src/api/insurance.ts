import axios from 'axios';
import useSWR from 'swr';
import { APIObject, API_URL, fetcher } from './common';

export const API_INSURANCE = API_URL + '/insurances';

export interface InsuranceDTO {
  id: number;
  monthlyRate: number;
  dueDate: Date;
  userID: number;
  carID: number;
}

export type AddInsuranceDTO = Omit<InsuranceDTO, 'id'>;
export type UpdateInsuranceDTO = Omit<InsuranceDTO, 'userID' | 'carID'>;

//const getInsurance = (id: number) => {};

const useGetInsurancesByUserIdSWR = (userId: number) => {
  return useSWR<APIObject<[InsuranceDTO]>>(
    API_INSURANCE + `?userID=${userId}`,
    fetcher
  );
};

const addInsurance = async (insurance: AddInsuranceDTO) => {
  const response = await axios.post<APIObject<InsuranceDTO>>(
    API_INSURANCE,
    insurance
  );
  return response.data.data;
};

const updateInsurance = async (insurance: UpdateInsuranceDTO) => {
  const response = await axios.put<APIObject<InsuranceDTO>>(
    API_INSURANCE,
    insurance
  );
  return response.data.data;
};

const deleteInsurance = async (id: number) => {
  const response = await axios.delete<APIObject<InsuranceDTO>>(
    API_INSURANCE + '/' + id
  );
  return response.data.data;
};

export {
  useGetInsurancesByUserIdSWR,
  addInsurance,
  updateInsurance,
  deleteInsurance,
};

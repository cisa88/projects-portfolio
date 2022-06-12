import axios from 'axios';
import useSWR from 'swr';
import { APIObject, API_URL, fetcher } from './common';

export const API_PACKAGE = API_URL + '/packages';

export interface PackageDTO {
  id: number;
  insuranceType: number;
  insuranceID: number;
}

export type AddPackageDTO = Omit<PackageDTO, 'id'>;

const useGetPackagesByInsuranceIdSWR = (insuranceId: number) => {
  return useSWR<APIObject<[PackageDTO]>>(
    API_PACKAGE + `?insuranceID=${insuranceId}`,
    fetcher
  );
};

const addPackage = async (pkg: AddPackageDTO) => {
  const response = await axios.post<APIObject<PackageDTO>>(API_PACKAGE, pkg);
  return response.data.data;
};

const deletePackage = async (id: number) => {
  const response = await axios.delete<APIObject<PackageDTO>>(
    API_PACKAGE + '/' + id
  );
  return response.data.data;
};

export { useGetPackagesByInsuranceIdSWR, addPackage, deletePackage };

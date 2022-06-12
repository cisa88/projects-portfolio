import axios from 'axios';
import useSWR from 'swr';
import { APIObject, API_URL, fetcher } from './common';

export const API_CAR = API_URL + '/cars';

export interface CarDTO {
  id: number;
  plate: string;
  brand: string;
  model: string;
  engineSize: number;
  powerKW: number;
  weight: number;
  registered: Date;
  fuelType: number;
  userID: number;
}

export type AddCarDTO = Omit<CarDTO, 'id'>;
export type UpdateCarDTO = Pick<CarDTO, 'id' | 'plate' | 'userID'>;

const useGetCarsByUserIdSWR = (userId: number) => {
  return useSWR<APIObject<[CarDTO]>>(API_CAR + `?userID=${userId}`, fetcher);
};

const addCar = async (car: AddCarDTO) => {
  const response = await axios.post<APIObject<CarDTO>>(API_CAR, car);
  return response.data.data;
};

const updateCar = async (car: UpdateCarDTO) => {
  const response = await axios.put<APIObject<CarDTO>>(API_CAR, car);
  return response.data.data;
};

const deleteCar = async (id: number) => {
  const response = await axios.delete<APIObject<CarDTO>>(API_CAR + '/' + id);
  return response.data.data;
};

export { useGetCarsByUserIdSWR, addCar, updateCar, deleteCar };

export const carBrands = [
  'Acura',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'BMW',
  'Bentley',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Daewoo',
  'Daihatsu',
  'Dodge',
  'Eagle',
  'Ferrari',
  'FIAT',
  'Fisker',
  'Ford',
  'Freightliner',
  'GMC',
  'Genesis',
  'Geo',
  'Honda',
  'HUMMER',
  'Hyundai',
  'INFINITI',
  'Isuzu',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Lincoln',
  'Lotus',
  'MAZDA',
  'Maserati',
  'Maybach',
  'McLaren',
  'Mercedes-Benz',
  'Mercury',
  'MINI',
  'Mitsubishi',
  'Nissan',
  'Oldsmobile',
  'Panoz',
  'Plymouth',
  'Polestar',
  'Pontiac',
  'Porsche',
  'Ram',
  'Rivian',
  'Rolls-Royce',
  'Saab',
  'Saturn',
  'smart',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
];

export interface CarModelDTO {
  results: {
    objectId: string;
    Model: string;
    Year: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

export const carModelsFetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        'X-Parse-Application-Id': 'B2FD0Tv1iV9ZPqxDULvAt1B6vy2vcDNtgoOFSPjA', // This is your app's application id
        'X-Parse-REST-API-Key': '39b4GnsXShZjQbhudvfCcAdlDHWnNbeeus1QnN3M', // This is your app's REST API key
      },
    })
    .then((res) => {
      if (res.status == 200) return res.data;

      const error: any = new Error('Error occured while fetching API.');
      error.status = res.status;
      error.info = res.data?.status;

      throw error;
    });

export const useGetCarModelsSWR = (brand: string) => {
  const where = encodeURIComponent(
    JSON.stringify({
      Make: brand,
    })
  );

  return useSWR<CarModelDTO>(
    `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=50&order=-Model&keys=Model,Year&where=${where}`,
    carModelsFetcher
  );
};

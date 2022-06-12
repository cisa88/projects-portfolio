import axios from 'axios';
import useSWR from 'swr';
import { APIObject, API_URL, fetcher } from './common';

export const API_USER = API_URL + '/users';

export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  birthDate: Date;
  citizenID: string;
  licenseDate: Date;
  passwdHash?: string;
}

export type AddUserDTO = Omit<UserDTO, 'id'>;
export type UpdateUserDTO = Omit<UserDTO, 'birthDate' | 'citizenID'>;

const useGetUserSWR = (id: number) => {
  return useSWR<APIObject<UserDTO>>(API_USER + '/' + id, fetcher);
};

const useGetAllUsersSWR = () => {
  return useSWR<APIObject<[UserDTO]>>(API_USER, fetcher);
};

const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get<APIObject<UserDTO>>(
      API_USER + '?email=' + email
    );
    return response.data.data;
  } catch (error) {
    return undefined;
  }
};

const addUser = async (user: AddUserDTO) => {
  const response = await axios.post<APIObject<UserDTO>>(API_USER, user);
  return response.data.data;
};

const updateUser = async (user: UpdateUserDTO) => {
  const response = await axios.put<APIObject<UserDTO>>(API_USER, user);
  return response.data.data;
};

const deleteUser = async (id: number) => {
  const response = await axios.delete<APIObject<UserDTO>>(API_USER + '/' + id);
  return response.data.data;
};

export {
  useGetUserSWR,
  useGetAllUsersSWR,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
};

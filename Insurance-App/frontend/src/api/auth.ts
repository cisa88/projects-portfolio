import axios from 'axios';
import { APIObject, API_URL } from './common';
import { UserDTO } from './user';

export const API_AUTH = API_URL + '/auth';

export type AuthorizedUserDTO = UserDTO & { token: string };

export interface LoginDTO {
  email: string;
  password: string;
}

export const login = async (obj: LoginDTO) => {
  const response = await axios.post<APIObject<string>>(
    API_AUTH + '/login',
    obj
  );
  return response.data.data;
};

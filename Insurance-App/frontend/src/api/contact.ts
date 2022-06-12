import axios from 'axios';
import useSWR from 'swr';
import { APIObject, API_URL, fetcher } from './common';

export const API_CONTACT = API_URL + '/contacts';

export interface ContactDTO {
  id: number;
  phone: string;
  street: string;
  city: string;
  zip: string;
  userID: number;
}

export type AddContactDTO = Omit<ContactDTO, 'id'>;
export type UpdateContactDTO = Omit<ContactDTO, 'userID'>;

const useGetContactsByUserIdSWR = (userId: number) => {
  return useSWR<APIObject<[ContactDTO]>>(
    API_CONTACT + `?userID=${userId}`,
    fetcher
  );
};

const addContact = async (contact: AddContactDTO) => {
  const response = await axios.post<APIObject<ContactDTO>>(
    API_CONTACT,
    contact
  );
  return response.data.data;
};

const updateContact = async (contact: UpdateContactDTO) => {
  const response = await axios.put<APIObject<ContactDTO>>(API_CONTACT, contact);
  return response.data.data;
};

const deleteContact = async (id: number) => {
  const response = await axios.delete<APIObject<ContactDTO>>(
    API_CONTACT + '/' + id
  );
  return response.data.data;
};

export { useGetContactsByUserIdSWR, addContact, updateContact, deleteContact };

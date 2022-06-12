import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export interface APIObject<T> {
  status: string;
  data: T;
}

export const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    if (res.status == 200) return res.data;

    const error: any = new Error('Error occured while fetching API.');
    error.status = res.status;
    error.info = res.data?.status;

    throw error;
  });

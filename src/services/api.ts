import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_URL}/api`
    : 'http://localhost:3000/api',
});

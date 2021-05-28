import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '../api';

type PageInfo = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface GetUserResponseProps {
  users: User[];
  pageInfo: PageInfo;
}

export async function getUsers(page: number): Promise<GetUserResponseProps> {
  const response = await api.get<{ users: User[]; pageInfo: PageInfo }>(
    '/users',
    {
      params: {
        page,
      },
    },
  );

  const { users, pageInfo } = response.data;

  const formattedUsers = users.map(user => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users: formattedUsers, pageInfo };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}

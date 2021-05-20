import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

import { useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error, refetch } = useUsers(page);
  const { users, pageInfo } = data ?? {};

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal" align="center">
              Usuários
            </Heading>

            <Flex>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="gray"
                mr="4"
                color="gray.700"
                cursor="pointer"
                onClick={() => refetch()}
                leftIcon={
                  <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="gray.300"
                    color={!isLoading && isFetching ? 'pink.500' : 'gray.300'}
                    size="sm"
                  />
                }
              >
                Atualizar
              </Button>
              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text color="red.500">Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>04 de abril, 2021</Td>}
                      <Td>
                        {isWideVersion && (
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                total={pageInfo.total}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

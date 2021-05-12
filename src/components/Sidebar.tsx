import Link from 'next/link'
import { Box, Stack, Text, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link href="/dashboard">
              <ChakraLink display="flex" align="center">
                <Icon as={RiDashboardLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Dashboard</Text>
              </ChakraLink>
            </Link>

            <Link href="/users">
              <ChakraLink display="flex" align="center">
                <Icon as={RiContactsLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Usuários</Text>
              </ChakraLink>
            </Link>
          </Stack>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            AUTOMAÇÃO
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link href="#">
              <ChakraLink display="flex" align="center">
                <Icon as={RiInputMethodLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Formulários</Text>
              </ChakraLink>
            </Link>

            <Link href="#">
              <ChakraLink display="flex" align="center">
                <Icon as={RiGitMergeLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Automação</Text>
              </ChakraLink>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
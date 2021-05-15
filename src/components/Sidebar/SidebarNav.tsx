import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavSection } from './NavSection';
import { NavLink } from './NavLink';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink link="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink link="/users" icon={RiContactsLine}>
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLink link="#" icon={RiInputMethodLine}>
          Formulários
        </NavLink>
        <NavLink link="#" icon={RiGitMergeLine}>
          Automação
        </NavLink>
      </NavSection>
    </Stack>
  );
}

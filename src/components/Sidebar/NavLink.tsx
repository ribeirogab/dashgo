import { ElementType } from 'react';
import { 
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Icon,
  Text,
} from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  link: string;
  icon?: ElementType;
  children: string;
}

export function NavLink({ link, icon, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={link} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        {icon && <Icon as={icon} fontSize="20" />}
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}
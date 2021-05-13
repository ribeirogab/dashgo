import { cloneElement, ReactElement, useMemo } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link, { LinkProps } from 'next/link';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest 
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const isActive = useMemo(() => {
    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
      return true;
    }
    if (
      !shouldMatchExactHref 
      && 
      (asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as)))
      ) {
        return true;
      }
      return false;
  }, [asPath, shouldMatchExactHref, rest.href, rest.as]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}
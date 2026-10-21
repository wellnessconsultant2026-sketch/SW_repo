'use client';

import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter, useParams as useNextParams, useSearchParams } from 'next/navigation';

export function Link({ to, href, children, className, style, onClick, target, rel, ...props }) {
  const destination = href || to || '#';

  const isExternal = typeof destination === 'string' && (
    destination.startsWith('http://') || 
    destination.startsWith('https://') || 
    destination.startsWith('mailto:') || 
    destination.startsWith('tel:')
  );

  if (isExternal) {
    return (
      <a 
        href={destination} 
        className={className} 
        style={style} 
        onClick={onClick} 
        target={target || '_blank'} 
        rel={rel || 'noopener noreferrer'} 
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink 
      href={destination} 
      className={className} 
      style={style} 
      onClick={onClick} 
      target={target} 
      rel={rel} 
      {...props}
    >
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, children, className, activeClassName, style, ...props }) {
  const pathname = usePathname();
  const destination = href || to || '';
  const isActive = pathname === destination || (destination !== '/' && pathname.startsWith(destination));

  let computedClassName = className;
  if (typeof className === 'function') {
    computedClassName = className({ isActive });
  } else if (isActive && activeClassName) {
    computedClassName = `${className || ''} ${activeClassName}`.trim();
  }

  return (
    <Link to={destination} className={computedClassName} style={style} {...props}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  );
}

export function useLocation() {
  const pathname = usePathname() || '/';
  return {
    pathname,
    search: '',
    hash: '',
    state: null
  };
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === 'number') {
      if (to < 0) window.history.back();
      else window.history.forward();
      return;
    }
    if (options.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useParams() {
  const params = useNextParams();
  return params || {};
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  useEffect(() => {
    if (to) {
      if (replace) router.replace(to);
      else router.push(to);
    }
  }, [to, replace, router]);
  return null;
}

export function Outlet({ children }) {
  return children || null;
}

export default {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
  Outlet
};

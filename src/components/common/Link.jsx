'use client';

import React from 'react';
import NextLink from 'next/link';

export default function Link({ to, href, children, className, style, onClick, target, rel, ...props }) {
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

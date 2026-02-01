'use client';

import { useEffect, Fragment, ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AOSProviderProps {
  children: ReactNode;
}

const AOSProvider = ({ children }: AOSProviderProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - default
    });
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default AOSProvider;

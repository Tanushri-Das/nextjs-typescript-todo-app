import React, { ReactNode } from 'react';
import Navbar from './Shared/Navbar/Navbar';
import Footer from './Shared/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

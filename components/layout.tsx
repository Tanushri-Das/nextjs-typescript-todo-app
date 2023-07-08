
import React, { ReactNode } from "react";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";
import { useRouter } from "next/router";

interface LayoutProps {
    children: ReactNode;
  }

const Layout = ({children}: LayoutProps) => {
    const router = useRouter();
    
    return (  
        <div className="container">
            {router.pathname !== "/404" && <Navbar />}
            {children}
           {router.pathname !== "/404" && <Footer />}
        </div>
    );
}
 
export default Layout;

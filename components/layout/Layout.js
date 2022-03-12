import React from 'react';
import Footer from '../footer';

const Layout = ({children}) => {
    return (
        <div>
            <Footer/>
            {children}
        </div>
    );
}

export default Layout;

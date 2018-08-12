import React from 'react';
import NavigationBar from '../components/app/NavigationBar/index';
import Footer from '../components/app/Footer/index';
import './index.css';

const viewTemplate = ({children}) => {
    return(
        <div>
            <NavigationBar />
            <div className="container-fluid">
                {children}
            </div>
            <Footer />
        </div>

    )
};

export default viewTemplate;
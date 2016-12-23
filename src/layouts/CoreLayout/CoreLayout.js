import React from 'react';
import Toolbar from 'components/Toolbar';
import Footer from 'components/Footer';
import 'styles/core.scss';

export const CoreLayout = ({ children }) => {
  return (
    <div className='page-container'>
      <Toolbar />
      <div className='view-container'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;

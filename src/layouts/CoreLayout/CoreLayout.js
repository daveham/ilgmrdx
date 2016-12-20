import React from 'react';
import MainToolbar from 'components/MainToolbar';
//import Footer from 'components/Footer';
import 'styles/core.scss';

import debugLib from 'debug';
const debug = debugLib('app:CoreLayout');

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Statelesss Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
export const CoreLayout = ({ children }) => {
  debug('render');
  return (
    <div className='page-container'>
      <MainToolbar />
      <div className='view-container'>
        {children}
        other stuff
      </div>
    </div>
  );
};

/*
      <MainToolbar />
      <div className='view-container'>
        {children}
      </div>
      <Footer />
*/

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;

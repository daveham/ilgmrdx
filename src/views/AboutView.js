import React from 'react';
import { Link } from 'react-router';

export class AboutView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <h1>About</h1>
        <hr />
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default AboutView;

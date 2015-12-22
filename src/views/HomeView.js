import React from 'react';
import { Link } from 'react-router';

export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <hr />
        <Link to='/counter'>Go To Counter View</Link><br />
        <Link to='/catalog'>Go To Catalog View</Link><br />
        <Link to='/about'>Go To About View</Link>
      </div>
    );
  }
}

export default HomeView;

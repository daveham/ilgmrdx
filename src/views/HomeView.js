import React from 'react';
import { Link } from 'react-router';

export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>InferenceLens Graphics Manager on React/Redux</h1>
        <hr />
        <Link to='/counter'>Counter</Link><br />
        <Link to='/catalog'>Catalog</Link><br />
        <Link to='/about'>About</Link>
      </div>
    );
  }
}

export default HomeView;

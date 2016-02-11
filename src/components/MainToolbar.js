import React from 'react';
import { Link } from 'react-router';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FlatButton from 'material-ui/lib/flat-button';
// import FontIcon from 'material-ui/lib/font-icon';
// import IconButton from 'material-ui/lib/icon-button';
// import Colors from 'material-ui/lib/styles/colors';

export default (props) => {
  const { page } = props || 'home';
  return (
    <Toolbar>
      <ToolbarGroup firstChild float='left'>
        <FlatButton label='Home' disabled={page === 'home'} containerElement={<Link to='/' />} linkButton/>
        <ToolbarSeparator/>
        <FlatButton label='Counter' disabled={page === 'counter'} containerElement={<Link to='/counter' />} linkButton/>
        <FlatButton label='Catalog' disabled={page === 'catalog'} containerElement={<Link to='/catalog' />} linkButton/>
        <FlatButton label='About' disabled={page === 'about'} containerElement={<Link to='/about' />} linkButton/>
      </ToolbarGroup>
      <ToolbarGroup lastChild float='right'>
        <ToolbarTitle text='Graphics Manager'/>
      </ToolbarGroup>
    </Toolbar>
  );
};

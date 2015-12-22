import React, { PropTypes } from 'react';
import styles from './Catalog.scss';
import SourceList from './SourceList';
import debugLib from 'debug';
const debug = debugLib('app:Catalog');

const Catalog = (props) => {
  const { name, sources } = props.data;
  let heading = 'Catalog';
  let openButton = null;
  if (name && name.length > 0) {
    heading = heading + ' - ' + name;
  } else {
    const buttonProps = {
      className: 'btn btn-default',
      onClick: (event) => {
        event.preventDefault();
        debug('open catalog button clicked');
        props.open();
      }
    };

    openButton = (
      <button {...buttonProps}>Open</button>
    );
  }

  return (
    <div className='container text-left'>
      <h2>{heading}</h2>
      {openButton}
      <div className={styles.catalog}>
        <SourceList sources={sources} select={props.select} />
      </div>
    </div>
  );
};

Catalog.propTypes = {
  data: PropTypes.object,
  open: PropTypes.func,
  select: PropTypes.func
};

Catalog.defaultProps = {
  data: {},
  open: () => {},
  select: () => {}
};

export default Catalog;

import React from 'react';
import { styles } from './styles.scss';

export default function Tooltip(props) {
  return (
    <div className={`${styles}`}>
      <div className={`tooltip ${props.position}`}>
        <span>{props.text}</span>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  position: React.PropTypes.string,
  text: React.PropTypes.string,
};

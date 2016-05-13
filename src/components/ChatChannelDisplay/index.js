import React from 'react';
import DataContainer from '../../containers/DataContainer';
import { styles } from './styles.scss';

export function ChatChannelDisplay() {
  return (
    <div className={`${styles}`}>
      <DataContainer />
    </div>
  );
}

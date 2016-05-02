import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import _ from 'lodash';

export default (props) => {

  return (
    <div>
      <Sparklines data={props.data} limit={20}>
        <SparklinesLine color={props.color} />
        <SparklinesSpots />
      </Sparklines>
      <div>Data: {Math.round(props.data)}</div>
    </div>
  );
};

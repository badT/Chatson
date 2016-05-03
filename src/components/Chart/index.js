import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import _ from 'lodash';

export default (props) => {
  return (
    <div>
      <Sparklines data={props.data} limit={200}>
        <SparklinesLine color={props.color} />
        <SparklinesSpots />
      </Sparklines>
    </div>
  );
};

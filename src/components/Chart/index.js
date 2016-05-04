import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default (props) => {
  return (
    <div>
      <Sparklines data={props.data} limit={props.limit}>
        <SparklinesLine color={props.color} />
        <SparklinesSpots />
      </Sparklines>
    </div>
  );
};

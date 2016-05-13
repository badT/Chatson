import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default function SparklineChart(props) {
  return (
    <div>
      <Sparklines data={props.data} limit={props.limit}>
        <SparklinesLine color={props.color} />
        <SparklinesSpots />
      </Sparklines>
    </div>
  );
}

SparklineChart.propTypes = {
  data: React.PropTypes.array,
  limit: React.PropTypes.number,
  color: React.PropTypes.string,
};

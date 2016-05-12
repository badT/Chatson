export const transitionAnims = (emoData, socData, emoColors, socColors) => {
  // Move the lines across the graph
  TweenMax.to('#line-container', 3, { x: '-=40', ease: Power0.easeNone });
  // Scale the splotches
  // Emotion Splotches
  TweenMax.to('#anger-splotch', 0.5, { scale: emoData.avgs.anger });
  TweenMax.to('#sadness-splotch', 0.5, { scale: emoData.avgs.sadness });
  TweenMax.to('#joy-splotch', 0.5, { scale: emoData.avgs.joy });
  TweenMax.to('#fear-splotch', 0.5, { scale: emoData.avgs.fear });
  TweenMax.to('#disgust-splotch', 0.5, { scale: emoData.avgs.disgust });
  // Social Splotches
  TweenMax.to('#openness-splotch', 0.5, { scale: socData.avgs.openness });
  TweenMax.to('#conscientiousness-splotch', 0.5, { scale: socData.avgs.conscientiousness });
  TweenMax.to('#extraversion-splotch', 0.5, { scale: socData.avgs.extraversion });
  TweenMax.to('#agreeableness-splotch', 0.5, { scale: socData.avgs.agreeableness });
  TweenMax.to('#neuroticism-splotch', 0.5, { scale: socData.avgs.neuroticism });
  // Update background opacity and color depending on the dominant attribute
  TweenMax.to('#emo-graph-bg', 0.5, { fill: emoColors[emoData.diff.key], fillOpacity: (emoData.diff.magnitude) });
  TweenMax.to('#soc-graph-bg', 0.5, { fill: socColors[socData.diff.key], fillOpacity: (socData.diff.magnitude) });
};

export const transformData = (data, xCoord) => {
  if (data.length === 0) return;

  const readings = Object.keys(data[0]).reduce((list, reading) => {
    list[reading] = [];
    return list;
  }, {});

  data.forEach(datum => {
    for (let key in datum) {
      if (datum.hasOwnProperty(key)) {
        readings[key].push(datum[key]);
      }
    }
  });

  const transformed = {};
  const paths = {};
  const avgs = {};
  const avgDiff = [];

  for (let key in readings) {
    if (key === 'id') continue;
    if (readings.hasOwnProperty(key)) {
      transformed[key] = readings[key].reduceRight((res, reading, i, coll) => {
        if (i === coll.length - 1) {
          res.path += `${res.x} ${100 - reading}`;
        } else {
          if (reading >= coll[i + 1]) {
            res.path += `C ${res.x + 20} ${100 - (coll[i + 1])} ${res.x + 20} ${100 - (reading)} ${res.x} ${100 - reading}`
          } else {
            res.path += `C ${res.x + 20} ${100 - (coll[i + 1])} ${res.x + 20} ${100 - (reading)} ${res.x} ${100 - reading}`
          }
        }
        res.x -= 40;
        res.avg += (reading / coll.length);
        return res;
      }, { path: 'M', x: xCoord, avg: 0 });
    }
  }

  for (let key in transformed) {
    if (transformed.hasOwnProperty(key)) {
      paths[key] = transformed[key].path;
      avgs[key] = transformed[key].avg;
      avgDiff.push({ key: key, avg: avgs[key] });
      avgs[key] = ((Math.round(avgs[key] * 100) / 100) * 0.0085) + 0.15;
    }
  }

  avgDiff.sort((a, b) => b.avg - a.avg);
  const diff = { key: avgDiff[0].key, magnitude: (avgDiff[0].avg - avgDiff[1].avg) / 100 };

  return { paths, avgs, diff };
};

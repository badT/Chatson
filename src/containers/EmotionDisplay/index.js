import React, { Component } from 'react';
import { connect } from 'react-redux';

import gsap from 'gsap';

/* component styles */
import { styles } from './styles.scss';

const emoColors = {
  anger: '#FF3F39',
  sadness: '#2B56B2',
  disgust: '#AC35B2',
  fear: '#4ACC68',
  joy: '#FFF348',
};

const socColors = {
  openness: '#FF3F39',
  conscientiousness: '#2B56B2',
  extraversion: '#AC35B2',
  agreeableness: '#4ACC68',
  neuroticism: '#FFF348',
};

class EmotionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastAnger: 0,
      xCoord: 440,
      activeGraph: 'emotion',
      emotionData: [],
      emotionPaths: null,
      emotionKey: {
        anger: 0.15,
        sadness: 0.15,
        disgust: 0.15,
        fear: 0.15,
        joy: 0.15,
      },
      dominantEmo: '',
      socialData: [],
      socialPaths: null,
      socialKey: {
        openness: 0.15,
        conscientiousness: 0.15,
        extraversion: 0.15,
        agreeableness: 0.15,
        neuroticism: 0.15,
      },
      dominantSoc: '',
      topRef: false,
      btmRef: false,
    };
  }

  componentWillMount() {
    // because the incoming data is continuous, need to disable
    // requestAnimationFrame so that moving to a new window doesn't
    // get the data animation out of whack
    TweenMax.ticker.useRAF(false);
    TweenMax.lagSmoothing(0);
  }

  componentWillReceiveProps(props) {
    const currentAnger = props.emotion.anger;
    if (currentAnger !== this.state.lastAnger) {
      const altSocialKeys = {};
      delete props.social.id;
      for (let key in props.social) {
        altSocialKeys[key.split('_')[0]] = props.social[key];
      }

      const newEmotionData = this.state.emotionData.concat([props.emotion]);
      const newSocialData = this.state.socialData.concat([altSocialKeys]);

      if (newEmotionData.length > 30) {
        newEmotionData.shift();
        newSocialData.shift();
      }

      const emoData = this.transformData(newEmotionData, this.state.xCoord);
      const socData = this.transformData(newSocialData, this.state.xCoord);

      this.setState({
        lastAnger: currentAnger,
        xCoord: this.state.xCoord + 40,
        emotionData: newEmotionData,
        emotionPaths: emoData.paths,
        emotionKey: emoData.avgs,
        dominantEmo: emoData.diff.key,
        socialData: newSocialData,
        socialPaths: socData.paths,
        socialKey: socData.avgs,
        dominantSoc: socData.diff.key,
      });

      TweenMax.to('#line-container', 3, { x: '-=40', ease: Power0.easeNone });

      TweenMax.to('#anger-splotch', 0.5, { scale: this.state.emotionKey.anger });
      TweenMax.to('#sadness-splotch', 0.5, { scale: this.state.emotionKey.sadness });
      TweenMax.to('#joy-splotch', 0.5, { scale: this.state.emotionKey.joy });
      TweenMax.to('#fear-splotch', 0.5, { scale: this.state.emotionKey.fear });
      TweenMax.to('#disgust-splotch', 0.5, { scale: this.state.emotionKey.disgust });

      TweenMax.to('#openness-splotch', 0.5, { scale: this.state.socialKey.openness });
      TweenMax.to('#conscientiousness-splotch', 0.5, { scale: this.state.socialKey.conscientiousness });
      TweenMax.to('#extraversion-splotch', 0.5, { scale: this.state.socialKey.extraversion });
      TweenMax.to('#agreeableness-splotch', 0.5, { scale: this.state.socialKey.agreeableness });
      TweenMax.to('#neuroticism-splotch', 0.5, { scale: this.state.socialKey.neuroticism });

      TweenMax.to('#emo-graph-bg', 0.5, { fill: emoColors[emoData.diff.key], fillOpacity: (emoData.diff.magnitude) });
      TweenMax.to('#soc-graph-bg', 0.5, { fill: socColors[socData.diff.key], fillOpacity: (socData.diff.magnitude) });
    }
  }

  transformData(data, xCoord) {
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
  }

  renderSplotches(graphKey) {
    if (!graphKey) return;
    const splotches = [];
    for (let splotch in graphKey) {
      splotches.push(<div key={splotch} className="block-grid-item splotch-holder">
        <span id={`${splotch}-splotch`} className="color-splotch"></span>
        <span className="splotch-label">{splotch}</span>
      </div>);
    }
    return (
      <div className="block-grid-md-5 block-grid-sm-3 block-grid-xs-2 splotches-grid">
        {splotches}
      </div>
    );
  }

  renderLines(colors, paths) {
    if (!paths) return;
    const lines = [];
    for (let key in paths) {
      lines.push(<path key={key} stroke={colors[key]} fill="none" d={paths[key]} />)
    }
    return (
      <g>{lines}</g>
    );
  }

  renderOutlines(paths) {
    if (!paths) return;
    const outlines = [];
    for (let key in paths) {
      outlines.push(<path key={key} stroke="#FFF" className="stroke-outline" fill="none" d={paths[key]} />);
    }
    return (
      <g>{outlines}</g>
    )
  }

  handleMouseEnter(line) {
    if (line === 'top') this.setState({ topRef: true });
    if (line === 'btm') this.setState({ btmRef: true });
  }

  handleMouseLeave(line) {
    if (line === 'top') this.setState({ topRef: false });
    if (line === 'btm') this.setState({ btmRef: false });
  }

  toggleGraph(graph) {
    if (graph === 'social' && this.state.activeGraph === 'emotion') this.setState({ activeGraph: 'social' });
    if (graph === 'emotion' && this.state.activeGraph === 'social') this.setState({ activeGraph: 'emotion' });
  }

  render() {
    return (
      <div className={`${styles}`}>
        <div className="row">
          <div className="col-xs-6 graph-tab-holder">
            <h2 
              className={`graph-tab ${this.state.activeGraph === 'emotion' ? 'tab-active' : ''}`}
              onClick={() => this.toggleGraph('emotion')}>
                Channel Emotions
            </h2>
          </div>
          <div className="col-xs-6 text-right graph-tab-holder">
            <h2 
              className={`graph-tab ${this.state.activeGraph === 'social' ? 'tab-active' : ''}`}
              onClick={() => this.toggleGraph('social')}>
                Social Attributes
            </h2>
          </div>
        </div>

        <section className="graph-main row">
          <section className={`graph-key dom-emo-${this.state.dominantEmo} dom-soc-${this.state.dominantSoc}`}>
            <div className={`row splotch-row ${this.state.activeGraph === 'emotion' ? 'splotch-row-active' : ''}`}>
              {this.renderSplotches(emoColors)}
            </div>
            <div className={`row splotch-row ${this.state.activeGraph === 'social' ? 'splotch-row-active' : ''}`}>
              {this.renderSplotches(socColors)}
            </div>
          </section>
          
          <div className="graph-row">
            <div className="col-lg-12 line-graph-container">
              <span className={`graph-explanation ${this.state.topRef ? 'visible' : ''}`}>Values above this line indicate strong emotion</span>
              <span className={`graph-explanation ${this.state.btmRef ? 'visible' : ''}`}>Values below this line indicate weak emotion</span>
              <svg width="100%" height="400" viewBox="0 0 400 103" preserveAspectRatio="none">
                
                <rect className={`graph-bg ${this.state.activeGraph === 'emotion' ? 'bg-active' : ''}`} id="emo-graph-bg" x="0" y="0" width="400" height="100" fill="#fff" fillOpacity="0" />
                <rect className={`graph-bg ${this.state.activeGraph === 'social' ? 'bg-active' : ''}`} id="soc-graph-bg" x="0" y="0" width="400" height="100" fill="#fff" fillOpacity="0" />

                <path className="reference-line" d="M 0.3 25 l 399.7 0" />
                <rect id="upper-ref" x="0" y="0" width="400" height="25" fill="#fff" className={`ref-box ${this.state.topRef ? 'visible' : ''}`} />

                <path className="reference-line" d="M 0.3 50 l 399.7 0" />
                <rect id="lower-ref" x="0" y="50" width="400" height="50" fill="#fff" className={`ref-box ${this.state.btmRef ? 'visible' : ''}`} />

                <g id="line-container">
                  <g className={`graph-lines ${this.state.activeGraph === 'emotion' ? 'lines-active' : ''}`}>
                    {this.renderOutlines(this.state.emotionPaths)}
                    {this.renderLines(emoColors, this.state.emotionPaths)}
                  </g>
                  <g className={`graph-lines ${this.state.activeGraph === 'social' ? 'lines-active' : ''}`}>
                    {this.renderOutlines(this.state.socialPaths)}
                    {this.renderLines(socColors, this.state.socialPaths)}
                  </g>
                </g>

                <path id="reference-line-top" stroke="transparent" d="M 0.3 25 l 399.7 0" onMouseEnter={() => this.handleMouseEnter('top')} onMouseLeave={() => this.handleMouseLeave('top')} />
                <path id="reference-line-btm" stroke="transparent" d="M 0.3 50 l 399.7 0" onMouseEnter={() => this.handleMouseEnter('btm')} onMouseLeave={() => this.handleMouseLeave('btm')} />

                <path stroke="#ddd" fill="none" d="M 0.3 0 l 0 100 z" />
                <path stroke="#ddd" fill="none" d="M 0.3 103 l 0 -3 l 399.4 0 l 0 3" />
              </svg>
              <span className="x-axis-label start">30 Sec<br/>Ago</span>
              <span className="x-axis-label end">Now</span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ tone }) {
  if (tone.toneData) {
    return {
      emotion: tone.toneData.emotion,
      social: tone.toneData.social,
    };
  }
  return {
    emotion: tone,
    social: tone,
  };
}

export default connect(mapStateToProps)(EmotionDisplay);

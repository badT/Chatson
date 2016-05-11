import React, { Component } from 'react';
import { connect } from 'react-redux';
import gsap from 'gsap';

import { emoColors, socColors, splotchDesc, splotchDescLT25, splotchDescLT50, splotchDescGT75 } from './descriptions';
import { transformData, transitionAnims, capitalizeFirstLetter } from './helpers';

/* component styles */
import { styles } from './styles.scss';

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

      const emoData = transformData(newEmotionData, this.state.xCoord);
      const socData = transformData(newSocialData, this.state.xCoord);

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

      transitionAnims(emoData, socData, emoColors, socColors);
    }
  }

  renderSplotches(colorKey, key) {
    if (!colorKey) return;
    const splotches = [];
    for (let splotch in colorKey) {
      splotches.push(
        <div key={splotch} className="block-grid-item splotch-holder">
          <div className="color-splotch-holder">
            <span id={`${splotch}-splotch`} className="color-splotch"></span>
            <span className="splotch-tooltip tooltip">
              {`Avg for last 90 seconds: ${this.state[key][splotch].toFixed(2)}`}<br/>
              {`${this.state[key][splotch].toFixed(2) <= 0.25 ? splotchDescLT25[splotch] : ''}`}
              {`${this.state[key][splotch].toFixed(2) <= 0.5 ? splotchDescLT50[splotch] : ''}`}
              {`${this.state[key][splotch].toFixed(2) >= 0.75 ? splotchDescGT75[splotch] : ''}`}
            </span>
          </div>
          <span className="splotch-label">
            <span className={`${splotch}-splotch-text`}>{capitalizeFirstLetter(splotch)}</span>
            <span className="splotch-label-tooltip tooltip">
              {splotchDesc[splotch]}
            </span>
          </span>
        </div>
      );
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
        {/* TAB DISPLAY */}
        <section className="row">
          <div className="col-xs-12 graph-tab-holder">
            <h2
              className={`graph-tab ${this.state.activeGraph === 'emotion' ? 'tab-active' : ''}`}
              onClick={() => this.toggleGraph('emotion')}>
                Channel Emotions
            </h2>
            <h2
              className={`graph-tab ${this.state.activeGraph === 'social' ? 'tab-active' : ''}`}
              onClick={() => this.toggleGraph('social')}>
                Social Attributes
            </h2>
          </div>
        </section>

        {/* MAIN GRAPH (key and line graph)*/}
        <section className="graph-main row">
          <section className={`graph-key dom-emo-${this.state.dominantEmo} dom-soc-${this.state.dominantSoc}`}>
            <div className={`row splotch-row ${this.state.activeGraph === 'emotion' ? 'splotch-row-active' : ''}`}>
              {this.renderSplotches(emoColors, 'emotionKey')}
            </div>
            <div className={`row splotch-row ${this.state.activeGraph === 'social' ? 'splotch-row-active' : ''}`}>
              {this.renderSplotches(socColors, 'socialKey')}
            </div>
          </section>

          <div className="graph-row">
            <div className="col-lg-12 line-graph-container">
              <div className={`graph-refs ${this.state.activeGraph === 'emotion' ? 'refs-active' : ''}`}>
                <span className={`graph-explanation ${this.state.topRef ? 'visible' : ''}`}>Values above this line indicate that the chat is more likely to be perceived as conveying this emotion</span>
                <span className={`graph-explanation ${this.state.btmRef ? 'visible' : ''}`}>Values below this line indicate that the chat is less likely to be perceived as conveying this emotion</span>
              </div>

              <div className={`graph-refs ${this.state.activeGraph === 'social' ? 'refs-active' : ''}`}>
                <span className={`graph-explanation ${this.state.topRef ? 'visible' : ''}`}>Values above this line indicate that the chat sentiment is closely aligning with this social attribute</span>
                <span className={`graph-explanation ${this.state.btmRef ? 'visible' : ''}`}>Values below this line indicate that the chat sentiment is more likely to be perceived as aligning with the opposite extreme of this attribute</span>
              </div>

              <svg width="100%" height="400" viewBox="0 0 400 100" preserveAspectRatio="none">

                <rect className={`graph-bg ${this.state.activeGraph === 'emotion' ? 'bg-active' : ''}`} id="emo-graph-bg" x="0" y="0" width="400" height="100" fill="#fff" fillOpacity="0" />
                <rect className={`graph-bg ${this.state.activeGraph === 'social' ? 'bg-active' : ''}`} id="soc-graph-bg" x="0" y="0" width="400" height="100" fill="#fff" fillOpacity="0" />

                <g className={`graph-refs ${this.state.activeGraph === 'emotion' ? 'refs-active' : ''}`}>               
                  <path className="reference-line" d="M 0.3 25 l 399.7 0" />
                  <rect id="upper-ref" x="0" y="0" width="400" height="25" fill="#fff" className={`ref-box ${this.state.topRef ? 'visible' : ''}`} />
                  <path className="reference-line" d="M 0.3 50 l 399.7 0" />
                  <rect id="lower-ref" x="0" y="50" width="400" height="50" fill="#fff" className={`ref-box ${this.state.btmRef ? 'visible' : ''}`} />
                </g>

                <g className={`graph-refs ${this.state.activeGraph === 'social' ? 'refs-active' : ''}`}>               
                  <path className="reference-line" d="M 0.3 25 l 399.7 0" />
                  <rect id="upper-ref" x="0" y="0" width="400" height="25" fill="#fff" className={`ref-box ${this.state.topRef ? 'visible' : ''}`} />
                  <path className="reference-line" d="M 0.3 75 l 399.7 0" />
                  <rect id="lower-ref" x="0" y="75" width="400" height="25" fill="#fff" className={`ref-box ${this.state.btmRef ? 'visible' : ''}`} />
                </g>

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

                <g className={`graph-refs ${this.state.activeGraph === 'emotion' ? 'refs-active' : ''}`}>
                  <path className="reference-line-trigger" stroke="transparent" d="M 0.3 25 l 399.7 0" 
                    onMouseEnter={() => this.handleMouseEnter('top')} 
                    onMouseLeave={() => this.handleMouseLeave('top')} />
                  <path className="reference-line-trigger" stroke="transparent" d="M 0.3 50 l 399.7 0" 
                    onMouseEnter={() => this.handleMouseEnter('btm')} 
                    onMouseLeave={() => this.handleMouseLeave('btm')} />
                </g>

                <g className={`graph-refs ${this.state.activeGraph === 'social' ? 'refs-active' : ''}`}>
                  <path className="reference-line-trigger" stroke="transparent" d="M 0.3 25 l 399.7 0" 
                    onMouseEnter={() => this.handleMouseEnter('top')} 
                    onMouseLeave={() => this.handleMouseLeave('top')} />
                  <path className="reference-line-trigger" stroke="transparent" d="M 0.3 75 l 399.7 0" 
                    onMouseEnter={() => this.handleMouseEnter('btm')} 
                    onMouseLeave={() => this.handleMouseLeave('btm')} />
                </g>
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

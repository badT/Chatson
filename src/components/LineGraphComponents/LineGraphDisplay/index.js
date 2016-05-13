import React, { Component } from 'react';
import Loader from '../../Loader';
import { emoColors, socColors } from '../descriptions';
/* component styles */
import { styles } from './styles.scss';

export default class LineGraphDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topRef: false,
      btmRef: false,
    };
  }

  handleMouseEnter(line) {
    if (line === 'top') this.setState({ topRef: true });
    if (line === 'btm') this.setState({ btmRef: true });
  }

  handleMouseLeave(line) {
    if (line === 'top') this.setState({ topRef: false });
    if (line === 'btm') this.setState({ btmRef: false });
  }

  renderLines(colors, paths) {
    if (!paths) return;
    const lines = [];
    Object.keys(paths).forEach(key => {
      lines.push(<path key={key} stroke={colors[key]} fill="none" d={paths[key]} />);
    });
    return (
      <g>{lines}</g>
    );
  }

  renderOutlines(paths) {
    if (!paths) return;
    const outlines = [];
    Object.keys(paths).forEach(key => {
      outlines.push(<path key={key} stroke="#FFF" className="stroke-outline" fill="none" d={paths[key]} />);
    });
    return (
      <g>{outlines}</g>
    );
  }

  render() {
    return (
      <div className={`${styles}`}>
        <div className="col-lg-12 line-graph-container">
          {/* Reference Line Explanations */}
          <div className={`graph-refs ${this.props.activeGraph === 'emotion' ? 'refs-active' : ''}`}>
            <span className={`graph-explanation ${this.state.topRef ? 'visible' : ''}`}>Values above this line indicate that the chat is more likely to be perceived as conveying this emotion</span>
            <span className={`graph-explanation ${this.state.btmRef ? 'visible' : ''}`}>Values below this line indicate that the chat is less likely to be perceived as conveying this emotion</span>
          </div>

          <div className={`graph-refs ${this.props.activeGraph === 'social' ? 'refs-active' : ''}`}>
            <span className={`graph-explanation ${this.state.topRef ? 'visible' : ''}`}>Values above this line indicate that the chat sentiment is closely aligning with this social attribute</span>
            <span className={`graph-explanation ${this.state.btmRef ? 'visible' : ''}`}>Values below this line indicate that the chat sentiment is more likely to be perceived as aligning with the opposite extreme of this attribute</span>
          </div>

          {/* Loading message and animation */}
          <div className={`loader ${this.props.waitingForMsgs ? 'loader-active' : ''}`}>
            <span className="loader-msg">Waiting for New Messages</span>
            <Loader />
          </div>

        {/* Main Graph */}
          <svg width="100%" height="400" viewBox="0 0 400 100" preserveAspectRatio="none">
            {/* Graph Backgrounds */}
            <rect className={`graph-bg ${this.props.activeGraph === 'emotion' ? 'bg-active' : ''}`} id="emo-graph-bg" x="0" y="0" width="400" height="100" fill="#fff" fillOpacity="0" />
            <rect className={`graph-bg ${this.props.activeGraph === 'social' ? 'bg-active' : ''}`} id="soc-graph-bg" x="0" y="0" width="400" height="100" fill="#fff" fillOpacity="0" />

            {/* Graph Reference Lines and Boxes */}
            <g className={`graph-refs ${this.props.activeGraph === 'emotion' ? 'refs-active' : ''}`}>
              <path className="reference-line" d="M 0.3 25 l 399.7 0" />
              <rect id="upper-ref" x="0" y="0" width="400" height="25" fill="#fff" className={`ref-box ${this.state.topRef ? 'visible' : ''}`} />
              <path className="reference-line" d="M 0.3 50 l 399.7 0" />
              <rect id="lower-ref" x="0" y="50" width="400" height="50" fill="#fff" className={`ref-box ${this.state.btmRef ? 'visible' : ''}`} />
            </g>
            <g className={`graph-refs ${this.props.activeGraph === 'social' ? 'refs-active' : ''}`}>
              <path className="reference-line" d="M 0.3 25 l 399.7 0" />
              <rect id="upper-ref" x="0" y="0" width="400" height="25" fill="#fff" className={`ref-box ${this.state.topRef ? 'visible' : ''}`} />
              <path className="reference-line" d="M 0.3 75 l 399.7 0" />
              <rect id="lower-ref" x="0" y="75" width="400" height="25" fill="#fff" className={`ref-box ${this.state.btmRef ? 'visible' : ''}`} />
            </g>

            {/* Graph Lines */}
            <g id="line-container">
              <g className={`graph-lines ${this.props.activeGraph === 'emotion' ? 'lines-active' : ''}`}>
                {this.renderOutlines(this.props.emotionPaths)}
                {this.renderLines(emoColors, this.props.emotionPaths)}
              </g>
              <g className={`graph-lines ${this.props.activeGraph === 'social' ? 'lines-active' : ''}`}>
                {this.renderOutlines(this.props.socialPaths)}
                {this.renderLines(socColors, this.props.socialPaths)}
              </g>
            </g>

            {/* Reference Line Triggers (hovering brings up box and explanation) */}
            <g className={`graph-refs ${this.props.activeGraph === 'emotion' ? 'refs-active' : ''}`}>
              <path
                className="reference-line-trigger"
                stroke="transparent"
                d="M 0.3 25 l 399.7 0"
                onMouseEnter={() => this.handleMouseEnter('top')}
                onMouseLeave={() => this.handleMouseLeave('top')}
              />
              <path
                className="reference-line-trigger"
                stroke="transparent"
                d="M 0.3 50 l 399.7 0"
                onMouseEnter={() => this.handleMouseEnter('btm')}
                onMouseLeave={() => this.handleMouseLeave('btm')}
              />
            </g>
            <g className={`graph-refs ${this.props.activeGraph === 'social' ? 'refs-active' : ''}`}>
              <path
                className="reference-line-trigger"
                stroke="transparent"
                d="M 0.3 25 l 399.7 0"
                onMouseEnter={() => this.handleMouseEnter('top')}
                onMouseLeave={() => this.handleMouseLeave('top')}
              />
              <path
                className="reference-line-trigger"
                stroke="transparent"
                d="M 0.3 75 l 399.7 0"
                onMouseEnter={() => this.handleMouseEnter('btm')}
                onMouseLeave={() => this.handleMouseLeave('btm')}
              />
            </g>
          </svg>
          <span className="x-axis-label start">30 Sec<br />Ago</span>
          <span className="x-axis-label end">Now</span>
        </div>
      </div>
    );
  }
}

LineGraphDisplay.propTypes = {
  activeGraph: React.PropTypes.string,
  waitingForMsgs: React.PropTypes.bool,
  emotionPaths: React.PropTypes.object,
  socialPaths: React.PropTypes.object,
};

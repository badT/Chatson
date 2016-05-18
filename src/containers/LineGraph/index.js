import React, { Component } from 'react';
import { connect } from 'react-redux';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import { emoColors, socColors } from './descriptions';
import { transformData, transitionAnims } from './helpers';
import LineGraphTabs from '../../components/LineGraphComponents/LineGraphTabs';
import LineGraphKey from '../../components/LineGraphComponents/LineGraphKey';
import LineGraphDisplay from '../../components/LineGraphComponents/LineGraphDisplay';
import { styles } from './styles.scss';

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingForMsgs: true,
      firstMsgIn: false,
      firstToneIn: false,
      deadChannel: false,
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
    };
    this.toggleGraph = this.toggleGraph.bind(this);
  }

  componentWillMount() {
    // because the incoming data is continuous, need to disable
    // requestAnimationFrame so that moving to a new window doesn't
    // get the data animation out of whack
    TweenMax.ticker.useRAF(false);
    TweenMax.lagSmoothing(0);

    this.deadChannelTimer = setTimeout(() => {
      this.setState({ deadChannel: true });
    }, 12000);
  }

  componentWillReceiveProps(props) {
    if (props.emotion) {
      // clear the timers if they are set...
      if (this.msgTimer) {
        clearTimeout(this.msgTimer);
        this.msgTimer = null;
      }
      if (this.deadChannelTimer) {
        clearTimeout(this.deadChannelTimer);
        this.deadChannelTimer = null;
      }

      if (!this.state.firstMsgIn) {
        this.setState({ firstMsgIn: true });
        this.msgTimer = setTimeout(() => { this.setState({ waitingForMsgs: false, firstToneIn: true }); }, 3000);
      } else if (this.state.waitingForMsgs) {
        this.setState({ waitingForMsgs: false });
      }

      const currentAnger = props.emotion.anger;
      if (currentAnger !== this.state.lastAnger) {
        const altSocialKeys = {};
        // delete props.social.id;

        Object.keys(props.social).forEach(key => {
          if (key === 'id') return;
          altSocialKeys[key.split('_')[0]] = props.social[key];
        });

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
    } else {
      this.msgTimer = setTimeout(() => { this.setState({ waitingForMsgs: true }); }, 4000);
    }
  }

  componentWillUnmount() {
    if (this.msgTimer) {
      clearTimeout(this.msgTimer);
    }
    if (this.deadChannelTimer) {
      clearTimeout(this.deadChannelTimer);
    }
  }

  toggleGraph(graph) {
    if (graph === 'social' && this.state.activeGraph === 'emotion') this.setState({ activeGraph: 'social' });
    if (graph === 'emotion' && this.state.activeGraph === 'social') this.setState({ activeGraph: 'emotion' });
  }

  render() {
    return (
      <div className={`${styles}`}>
        {/* DEAD CHANNEL WARNING */}
        <div className={`dead-channel-warning ${this.state.deadChannel ? 'active' : ''}`}>
          <div className="dead-channel-msg">
            <h2>This channel seems dead! Please choose another channel from the menu above.</h2>
          </div>
        </div>

        {/* TAB DISPLAY */}
        <LineGraphTabs
          activeGraph={this.state.activeGraph}
          toggleGraph={this.toggleGraph}
        />

        {/* MAIN GRAPH (key and line graph)*/}
        <section className="graph-main row">
          <LineGraphKey
            dominantEmo={this.state.dominantEmo}
            dominantSoc={this.state.dominantSoc}
            activeGraph={this.state.activeGraph}
            emotionKey={this.state.emotionKey}
            socialKey={this.state.socialKey}
          />
          <LineGraphDisplay
            activeGraph={this.state.activeGraph}
            waitingForMsgs={this.state.waitingForMsgs}
            firstMsgIn={this.state.firstMsgIn}
            firstToneIn={this.state.firstToneIn}
            emotionPaths={this.state.emotionPaths}
            socialPaths={this.state.socialPaths}
          />
        </section>
      </div>
    );
  }
}

function mapStateToProps({ tone }) {
  if (tone && tone.tone) {
    return {
      emotion: tone.tone.emotion,
      social: tone.tone.social,
    };
  }
  return {
    emotion: null,
    social: null,
  };
}

export default connect(mapStateToProps)(LineGraph);

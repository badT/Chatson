import React from 'react';
/* component styles */
import { styles } from './styles.scss';
const emoChart = require('./assets/emotionChart.jpg');
const socChart = require('./assets/socialChart.jpg');

export function About() {
  return (
    <div className="top">
      <section className={`${styles}`}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <section>
              <p className="intro">
                Welcome to Chatson, a live chat analyzer created to give users insight into the emotional state and crowd mentality
                of Twitch chat streams. Twitch is the world’s leading social video platform and community for gamers.
                Expand the sidebar to see a list of Twitch's channels that currently have the most viewers. Select a channel for a real time visualization of its emotional and social tone, current chat stream, and chat statistics.
              </p>
            </section>
            <p className="tone">
              Emotional and social tone data is calculated using
              <a href="http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html"> IBM Watson™ Tone Analyzer</a>.
              The main chart's legend icons grow and shrink proportionally with the intensity of their corresponding attribute. The most prominent attribute is highlighted in bold in addition to the background color of the chart taking on that attribute's color with the saturation level matching its intensity. When viewing the real time charts, be sure to mouse over features for more information.
            </p>
          </div>
        </div>
        <div className="row separate">
          <div className="col-md-7 .col-md-pull-4">
            <section className="msg-chart">
              <img src={emoChart} className="img-responsive" role="presentation" />
            </section>
          </div>
          <div className="col-md-5 .col-md-push-8">
            <section className="msg-data">
              <p>
                Emotional tone is inferred from different types of emotions and feelings commonly expressed in language.
              </p>
              <ul>
                <li>
                  <b>Anger:</b> expressed either actively with targeted verbal attacks or passively through tension and hostility.
                </li>
                <li>
                  <b>Sadness:</b> indicates a feeling of loss and disadvantage.
                </li>
                <li>
                  <b>Disgust:</b> a response of revulsion to something considered offensive or unpleasant.
                </li>
                <li>
                  <b>Fear:</b> a response to perceived danger or some negative stimulus.
                </li>
                <li>
                  <b>Joy:</b> having a sense of well-being, inner peace, love, safety and contentment.
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="row separate">
          <div className="col-md-7 .col-md-pull-4">
            <section className="msg-chart">
              <img src={socChart} className="img-responsive" role="presentation" />
            </section>
          </div>
          <div className="col-md-5 .col-md-push-8">
            <section className="msg-data">
              <p>
                Social tone data uses the Big Five personality characteristics. The Big Five is the first and most widely
                used personality model to describe how a person engages with the world.
              </p>
              <ul>
                <li>
                  <b>Openness:</b> the extent to which a person is open to experiencing a variety of activities.
                </li>
                <li>
                  <b>Conscientiousness:</b> a person's tendency to act in an organized or thoughtful way.
                </li>
                <li>
                  <b>Extraversion:</b> a person's tendency to seek stimulation in the company of others.
                </li>
                <li>
                  <b>Areeableness:</b> a person's tendency to be compassionate and cooperative toward others.
                </li>
                <li>
                  <b>Neuroticism:</b> the extent to which a person's emotions are sensitive to their environment.
                </li>
              </ul>
            </section>
          </div>
        </div>
        <p className="text-center .pagination-centered">
          An explanation of the science behind the Tone Analyzer, as well as research references, can be found
          <a href="http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tone-analyzer/science.shtml"> here</a>.
        </p>
      </section>
    </div>
  );
}

import React, { Component } from 'react';
/* component styles */
// import { styles } from './styles.scss';
const emotionPic = './assets/emotionChart.png';
const socialPic = './assets/socialChart.png';

export class About extends Component {
  render() {
    return (
      // <about className={`${styles}`}>
      <section>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <section>
              <p>
                hi, twitchBot was created to give a user a visual representation of what is going on in a Twitch channel - the world’s leading social video platform and community for gamers. With our mood charts and graphs analyzing the realtime flow of comments, a user can instantly decide whether to join the channel. Chat messages are send to the Watson cognitive system API to return an analysis of emotional & social tone that is streamed to connected users.
                Users select one of the top 25 currently active twitch streams and are presented with real­time visuals of the mood, frequency and length of incoming messages. Users may also view long term data from 4 channels selected by our team.
              </p>
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 .col-sm-pull-4">
            <section>
              <img src={emotionPic} className="img-responsive" role="presentation" />
            </section>
          </div>
          <div className="col-sm-4 .col-sm-push-8">
            <section>
              <p>
                words about emotions words about emotions. words about emotions. words about emotions.
              </p>
              <p>
                words about emotions words about emotions. words about emotions. words about emotions.
              </p>
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 .col-sm-pull-4">
            <section>
              <img src={socialPic} className="img-responsive" role="presentation" />
            </section>
          </div>
          <div className="col-sm-4 .col-sm-push-8">
            <section>
              <p>
                words about social words about social. words about social. words about social.
              </p>
              <p>
                words about social words about social. words about social. words about social.
              </p>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

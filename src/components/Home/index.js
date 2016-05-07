import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* component styles */
import { styles } from './styles.scss';

const metaData = {
  title: 'Twitch Chat Visualizer',
  description: 'Get a sense of how a Twitch channel is devolving',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'twitch,chat,sentiment',
    },
  },
};

export class Home extends Component {
  render() {
    return (
      <section className={`${styles}`}>
        <DocumentMeta {...metaData} />
        <div className="home-container">
          <p>Welcome to the Twitch Chat Visualizer. Select one of the currently active channels to see an analysis of its chat activity.</p>
        </div>
      </section>
    );
  }
}

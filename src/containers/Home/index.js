import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { DataDisplay } from 'components/DataDisplay';

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
      <section>
        <DocumentMeta {...metaData} />
        <DataDisplay socket={this.props.socket}/>
      </section>
    );
  }
}

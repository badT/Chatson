import React from 'react';
import DocumentMeta from 'react-document-meta';
import { TopChannels } from '../../containers/TopChannels';
import { styles } from './styles.scss';

const metaData = {
  title: 'Chatson: Watson Chat Analysis',
  description: 'Get a visual representation of a chat channel\'s activity and group sentiment',
  canonical: 'http://chatson.science',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'twitch,chat,sentiment',
    },
  },
};

export function Home() {
  return (
    <section className={`${styles}`}>
      <DocumentMeta {...metaData} />
      <div className="home-container">
        <p>Welcome to Chatson! We use Watson's tone analyzer to provide you with a visualization of the mood and attitude in a chat stream. See the menu above to read more about our process or to select one of the top currently streaming Twitch chat channels to see a live analysis.</p>
      </div>
      <TopChannels />
    </section>
  );
}

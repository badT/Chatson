import React from 'react';
import DocumentMeta from 'react-document-meta';
import TopChannels from '../../containers/TopChannels';
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
        <p className="intro">Welcome to Chatson, a tool for visualizing the emotional state and crowd mentality in Twitch chat streams. Below you'll find long term analysis of some popular Twitch channels. Select from the menu to learn more about Chatson or to see real time analysis of currently streaming Twitch channels.</p>
      </div>
      <TopChannels longTermTone={[]} />
    </section>
  );
}

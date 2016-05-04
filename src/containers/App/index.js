import React, { Component } from 'react';

/* global styles for app */
import './styles/app.scss';

/* application components */
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.socket = io();
  }

  render() {
    return (
      <section>
        <Header />
          <main className="container">
          {this.props.children && React.cloneElement(this.props.children, {
            socket: this.socket
          })}
          </main>
        <Footer />
      </section>
    );
  }
}

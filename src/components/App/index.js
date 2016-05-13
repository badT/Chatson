import React, { Component } from 'react';
import './styles/app.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <section>
        <Header />
        <main>
          <div className="container">
            {this.props.children}
          </div>
        </main>
        <Footer />
      </section>
    );
  }
}

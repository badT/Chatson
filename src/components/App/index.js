import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import './styles/app.scss';

export function App(props) {
  return (
    <section>
      <Header />
      <main>
        <div className="container">
          {props.children}
        </div>
      </main>
      <Footer />
    </section>
  );
}

App.propTypes = {
  children: React.PropTypes.any,
};

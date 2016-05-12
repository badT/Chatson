import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import configureStore from '../../store/configureStore';
import { Header } from '../../components/Header/index';

describe('<Header />', () => {
  const store = configureStore();

  const wrapper = mount(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  it('should render <ChannelDropdown /> container', () => {
    expect(wrapper.find('.dropdown-menu')).to.have.length(1);
  });

});

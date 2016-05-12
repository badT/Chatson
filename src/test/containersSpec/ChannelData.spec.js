import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

import ConnectedChannelData from '../../containers/ChannelData/index';
import configureStore from '../../store/configureStore';
const store = configureStore();


describe('<ChannelData />', () => {
  sinon.spy(ConnectedChannelData.prototype, 'componentDidMount');
  sinon.spy(ConnectedChannelData.prototype, 'render');


  it('should render message data', () => {
    const wrapper = mount(<ConnectedChannelData store={store} />);
    expect(wrapper.find('.msg-data')).to.have.length(3);
  });

  it('should call componentDidMount function', () => {
    expect(ConnectedChannelData.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('should call render function', () => {
    expect(ConnectedChannelData.prototype.render.calledOnce).to.equal(true);
  });

  it('should set lastMsg state', () => {
    const wrapper = mount(<ConnectedChannelData store={store} />);
    expect(wrapper.state().lastMsg).to.not.exist;
    wrapper.setState({ lastMsg: 'blumpyPals' });
    expect(wrapper.state().lastMsg).to.equal('blumpyPals');
  });

});

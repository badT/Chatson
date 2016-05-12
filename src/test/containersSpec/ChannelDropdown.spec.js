import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

import ConnectedChannelDropdown from '../../containers/ChannelDropdown/ChannelDropdown';
import configureStore from '../../store/configureStore';
const store = configureStore();


describe('<ChannelDropdown />', () => {
  sinon.spy(ConnectedChannelDropdown.prototype, 'render');

  it('should render button for channel dropdown', () => {
    const wrapper = mount(<ConnectedChannelDropdown store={store} />);
    expect(wrapper.find('div')).to.have.length(2);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should call render function', () => {
    expect(ConnectedChannelDropdown.prototype.render.calledOnce).to.equal(true);
  });

  it('should recieve store from redux', () => {
    const wrapper = mount(<ConnectedChannelDropdown store={store} />);
    expect(wrapper.state().storeState.channels).to.exist;
    expect(wrapper.state().storeState.tone).to.exist;
  });

});

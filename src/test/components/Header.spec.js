import React from 'react';
import dom from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { shallow } from 'enzyme';

import { Header } from '../../components/Header/index';

describe('<Header />', () => {

  it('should render <ChannelDropdown /> container', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(ChannelDropdown)).to.have.length(1);
  });

});

// describe('Header component', function(){
//
//   before('render and locate element', function() {
//     const renderedComponent = TestUtils.renderIntoDocument(
//       <Header />
//     );
//     const Header = TestUtils.findRenderedDOMComponentWithClass(
//       renderedComponent,
//       'Header'
//     );
//     const ChannelDropdown = TestUtils.findRenderedDOMComponentWithClass(
//       renderedComponent,
//       'ChannelDropdown'
//     );
//
//     this.sidebar = sidebar.getDOMNode();
//     this.username = username.getDOMNode();
//   });
//   it('Sidebar should exist', function() {
//     expect(this.sidebar).toExist();
//   });
//   it('user name should be "' + user.name+ '"', function() {
//     expect(this.username.textContent).toBe(user.name);
//   });
//
//
// });

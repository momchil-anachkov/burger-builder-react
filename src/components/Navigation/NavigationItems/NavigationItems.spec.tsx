import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated={false} />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated={true} />);
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render logout <NavigationItem /> if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toBe(true);
  });

});

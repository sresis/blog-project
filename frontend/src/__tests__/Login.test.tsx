import React from "react";
import Login from "../Components/Login";
import Enzyme, {mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
configure({adapter: new Adapter()});

  describe('Check input fields', () => {
    it('There should be 2 input fields', () => {
        let test = (<Login/>);
        let wrapper = mount(test);
        expect(wrapper.find('input')).toHaveLength(2);
        expect(wrapper.find('input#username')).toHaveLength(1);

    });
  });
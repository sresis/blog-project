import React from "react";
import CreatePost from "../Components/CreatePost";
import Enzyme, {mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
configure({adapter: new Adapter()});

  describe('Validate create post form', () => {
    it('Create Post form has 2 fields', () => {
        let test = (<CreatePost/>);
        let wrapper = mount(test);
        expect(wrapper.find('form')).toHaveLength(1);
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('textarea')).toHaveLength(1);
    });
  });
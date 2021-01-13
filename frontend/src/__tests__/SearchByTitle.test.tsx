import React from "react";
import SearchByTitle from "../Components/SearchByTitle";
import Enzyme, {mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
configure({adapter: new Adapter()});

  describe('Validate search form', () => {
    it('There should be a search form with input field for title', () => {
        let test = (<SearchByTitle/>);
        let wrapper = mount(test);
        expect(wrapper.find('form')).toHaveLength(1);
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('input#title')).toHaveLength(1);


    });
  });
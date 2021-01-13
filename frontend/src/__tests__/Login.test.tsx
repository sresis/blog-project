import React from "react";
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Login from "../Components/Login";
import Enzyme, { shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
configure({adapter: new Adapter()});

function renderLogin() {
  
    return render(<Login/>);
  }

  
  describe('Check input fields', () => {
    it('There should be 2 input fields', () => {
        let test = (<Login/>);
        let wrapper = mount(test);
        expect(wrapper.find('input')).toHaveLength(2);
        expect(wrapper.find('input#username')).toHaveLength(1);

    });
  });
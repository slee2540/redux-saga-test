import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "../setupTests";
import Navbar from "./Navbar";

// configure({ adapter: new Adapter() });

describe("Navbar component", () => {
  it("starts with a count of 0", () => {
    const wrapper = shallow(<Navbar />);
    const text = wrapper.find("p").text();
    expect(text).toEqual("Count: 0");
  });

  it("increments count by 1 when the increment button is clicked", () => {
    const wrapper = shallow(<Navbar />);
    const incrementBtn = wrapper.find("button.increment");
    incrementBtn.simulate("click");
    const text = wrapper.find("p").text();
    expect(text).toEqual("Count: 1");
  });

  it("decrements count by 1 when the decrement button is clicked", () => {
    const wrapper = shallow(<Navbar />);
    const decrementBtn = wrapper.find("button.decrement");
    decrementBtn.simulate("click");
    const text = wrapper.find("p").text();
    expect(text).toEqual("Count: -1");
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

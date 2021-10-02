import React from 'react';
import { mount } from 'enzyme';
import TestComponent from './TestComponent';
import FFProvider from '../FFProvider';

const featureNodeTest = () => (
  <TestComponent>
    <TestComponent name="b1" />
    <TestComponent name="b2">
      <TestComponent name="b21" />
    </TestComponent>
  </TestComponent>
);

describe('Provider tests', () => {
  it('should render element tree', () => {
    const testRender = mount(
      <FFProvider flag="r1" restrictions={['r1', 'r2']}>
        <TestComponent>
          <TestComponent name="c1" />
          <TestComponent name="c2">
            <TestComponent name="c21" />
          </TestComponent>
        </TestComponent>
      </FFProvider>,
    );
    expect(testRender.find({ name: 'c1' }).exists()).toEqual(false);
    expect(testRender.find({ name: 'c2' }).exists()).toEqual(false);
    expect(testRender.find({ name: 'c21' }).exists()).toEqual(false);
  });

  it('should disable all flagged elements', () => {
    const testRender = mount(
      <FFProvider flag="r3" restrictions={['r1', 'r2']}>
        <TestComponent>
          <TestComponent name="c1" />
          <TestComponent name="c2">
            <TestComponent name="c21" />
          </TestComponent>
        </TestComponent>
      </FFProvider>,
    );
    expect(testRender.find({ name: 'c1' }).exists()).toEqual(true);
    expect(testRender.find({ name: 'c2' }).exists()).toEqual(true);
    expect(testRender.find({ name: 'c21' }).exists()).toEqual(true);
  });

  it('should replace components', () => {
    const testRender = mount(
      <FFProvider
        flag="r3"
        restrictions={['r1', 'r2']}
        replacement={featureNodeTest()}
      >
        <TestComponent>
          <TestComponent name="c1" />
          <TestComponent name="c2">
            <TestComponent name="c21" />
          </TestComponent>
        </TestComponent>
      </FFProvider>,
    );
    expect(testRender.find({ name: 'c1' }).exists()).toEqual(true);
    expect(testRender.find({ name: 'c2' }).exists()).toEqual(true);
    expect(testRender.find({ name: 'c21' }).exists()).toEqual(true);
    expect(testRender.find({ name: 'b1' }).exists()).toEqual(false);
    expect(testRender.find({ name: 'b2' }).exists()).toEqual(false);
    expect(testRender.find({ name: 'b21' }).exists()).toEqual(false);
  });
});

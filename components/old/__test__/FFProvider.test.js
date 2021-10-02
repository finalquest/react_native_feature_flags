import React from 'react';
import {
  mount,
} from 'enzyme';
import TestComponent from './TestComponent';
import FFProvider from '../FFProvider';

const featureNodeTest = (customProps = {}) => {
  const defaultProps = { auto: true, restrictions: ['r1', 'r2'] };
  const props = { ...defaultProps, ...customProps };
  return (
    <FFProvider {...props}>
      <TestComponent>
        <TestComponent name="c1" />
        <TestComponent features={['r2']} name="c2">
          <TestComponent name="c21" />
        </TestComponent>
      </TestComponent>
    </FFProvider>
  );
};

describe('Provider tests', () => {
  it('should render element tree', () => {
    const testRender = mount(
      <FFProvider auto restrictions={['r1', 'r2']}>
        <TestComponent>
          <TestComponent name="c1" />
          <TestComponent name="c2">
            <TestComponent name="c21" />
          </TestComponent>
        </TestComponent>
      </FFProvider>,
    );
    expect(testRender.find('#c1').exists()).toEqual(true);
    expect(testRender.find('#c2').exists()).toEqual(true);
    expect(testRender.find('#c21').exists()).toEqual(true);
  });

  it('should disable flagged leaf elements', () => {
    const testRender = mount(
      <FFProvider auto restrictions={['r1', 'r2']}>
        <TestComponent>
          <TestComponent name="c1" />
          <TestComponent name="c2">
            <TestComponent features={['r1']} name="c21" />
          </TestComponent>
        </TestComponent>
      </FFProvider>,
    );
    expect(testRender.find('#c1').exists()).toEqual(true);
    expect(testRender.find('#c2').exists()).toEqual(true);
    expect(testRender.find('#c21').exists()).toEqual(false);
  });

  it('should disable flagged node elements with their children', () => {
    const testRender = mount(featureNodeTest());
    expect(testRender.find('#c1').exists()).toEqual(true);
    expect(testRender.find('#c2').exists()).toEqual(false);
    expect(testRender.find('#c21').exists()).toEqual(false);
  });

  it('should handle restriction changes', () => {
    const testRender = mount(featureNodeTest());
    expect(testRender.find('#c2').exists()).toEqual(false);
    testRender.setProps({ restrictions: ['r1'] });
    expect(testRender.find('#c2').exists()).toEqual(true);
  });

  it('should replace using custom replacement', () => {
    const testRender = mount(featureNodeTest());
    testRender.setProps({ replacement: <div id="repl" /> });
    expect(testRender.find('#c2').exists()).toEqual(false);
    expect(testRender.find('#repl').exists()).toEqual(true);
  });

  it('should not apply FF to all DOM elements if auto prop is off', () => {
    const testRender = mount(featureNodeTest({ auto: false }));
    expect(testRender.find('#c1').exists()).toEqual(true);
    expect(testRender.find('#c2').exists()).toEqual(true);
    expect(testRender.find('#c21').exists()).toEqual(true);
  });

  it('should hide all elements if hideall prop is on', () => {
    const testRender = mount(featureNodeTest({ auto: true, hideall: true }));
    expect(testRender.find('#c1').exists()).toEqual(true);
    expect(testRender.find('#c2').exists()).toEqual(false);
    expect(testRender.find('#c21').exists()).toEqual(false);
  });

  // it('should work with composite components', () => {
  //   const CompositeTestComponent = ({name}) => (
  //     <TestComponent name={name}>
  //       <TestComponent name={name + '1'} features={['r1']}/>
  //       <TestComponent name={name + '2'}/>
  //     </TestComponent>
  //   );
  //   const testRender = mount(
  //     <FFProvider auto restrictions={['r1', 'r2']}>
  //       <CompositeTestComponent name='c1'/>
  //     </FFProvider>
  //   );
  //   testRender.setProps({auto: false});
  //   expect(testRender.find('#c1').exists()).toEqual(true);
  //   expect(testRender.find('#c11').exists()).toEqual(false);
  //   expect(testRender.find('#c12').exists()).toEqual(true);
  // });
});

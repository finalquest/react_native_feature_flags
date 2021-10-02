import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import TestComponent from './TestComponent';
import FFProvider from '../FFProvider';
import FFHOC from '../FFHOC';

const FFTestComponent = FFHOC(TestComponent, ['r1']);

const HocProviderTest = () => (
  <FFProvider restrictions={['r1', 'r2']}>
    <TestComponent>
      <TestComponent features={['r2']} name="c1" />
      <FFTestComponent name="c2">
        <TestComponent name="c21" />
      </FFTestComponent>
    </TestComponent>
  </FFProvider>
);

describe('FF High Order Component tests', () => {
  it('should wrap component in FFAwareComponent with features', () => {
    const testRender = shallow(<FFTestComponent name="c" />);
    expect(testRender.prop('features')).toEqual(['r1']);
  });

  it('provider should work for without auto prop if components are FFHOC', () => {
    const testRender = mount(<HocProviderTest />);
    expect(testRender.find('#c1').exists()).toEqual(true);
    expect(testRender.find('#c2').exists()).toEqual(false);
    expect(testRender.find('#c21').exists()).toEqual(false);
  });
});

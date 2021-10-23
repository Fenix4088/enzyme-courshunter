import React from 'react';
import { SuccessProvider, useSuccess } from './successContext';
import { mount, shallow } from 'enzyme';

const FunctionalComponent = () => {
  useSuccess();
  return (
    <div />
  );
};

describe('success Context', () => {

  it('should throw error if not inside success Provider', () => {
    expect(() => shallow(<FunctionalComponent />)).toThrow('useSuccess must be used within a  SuccessProvider');
  });

  it('should does not throw error if not inside success Provider', () => {
    expect(() => mount(
      <SuccessProvider><FunctionalComponent /></SuccessProvider>)).not.toThrow('useSuccess must be used within a  SuccessProvider');
  });

});

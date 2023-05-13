import React from 'react';

import './styles.css'

import Input from '../src/js/components/standard/Input';

export default {
  title: 'Input',
  component: Input,
};

export const Normal = () => (
  <div className="p-2">
    <Input
      label="Label"
      error="Error Statement"
    />
  </div>
);

import React from 'react';

import './styles.css'

import { action } from '@storybook/addon-actions';
import Button from '../src/js/components/standard/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => <Button label="Button Label"/>;

export const Outline = () => <Button isOutline label="Button Label"/>;

export const Danger = () => <Button isDanger label="Button Label"/>;

export const DangerOutline = () => <Button isDanger isOutline label="Button Label"/>;

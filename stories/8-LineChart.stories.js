import React from 'react';

import './styles.css'

import Card from '../src/js/components/standard/Card';
import LineChart from '../src/js/components/standard/LineChart'

export default {
  title: 'Line Chart',
  component: LineChart,
};

export const Primary = () => (
  <div>
    <LineChart />
  </div>
);

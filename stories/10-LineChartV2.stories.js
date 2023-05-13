import React from 'react';

import './styles.css'

import Card from '../src/js/components/standard/Card';
import LineChartV2 from '../src/js/components/standard/LineChartV2'

export default {
  title: 'Line Chart V2',
  component: LineChartV2,
};

export const Primary = () => (
  <div style={{ height: 400 }}>
    <Card>
      <LineChartV2 />
    </Card>
  </div>
);

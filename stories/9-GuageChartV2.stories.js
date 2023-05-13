import React from 'react';

import './styles.css'

import Card from '../src/js/components/standard/Card';
import GuageChartV2 from '../src/js/components/standard/GuageChartV2'

export default {
  title: 'Guage Chart V2',
  component: GuageChartV2,
};

export const Primary = () => (
  <div style={{ width: 400 }}>
    <Card>
      <GuageChartV2 />
    </Card>
  </div>
);

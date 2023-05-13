import React from 'react';

import './styles.css'

import Card from '../src/js/components/standard/Card';
import GuageChart from '../src/js/components/standard/GuageChart'

export default {
  title: 'Guage Chart',
  component: GuageChart,
};

export const Primary = () => (
  <div style={{ width: 400 }}>
    <Card>
      <GuageChart />
    </Card>
  </div>
);

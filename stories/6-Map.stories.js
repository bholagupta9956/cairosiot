import React from 'react';

import './styles.css'

import Map from '../src/js/components/standard/Map.jsx';

export default {
  title: 'Map',
  component: Map,
};

export const Primary = () => (
  <Map>
    <div lat={12.960651} lng={77.641619} className="h-4 w-4 rounded-full bg-primary" onClick={() => alert("HI")} />
  </Map>
);

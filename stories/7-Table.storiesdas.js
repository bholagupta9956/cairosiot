import React from 'react';

import './styles.css'

import Table, { DeviceDetailsRow, DeviceDetailsHead } from '../src/js/components/standard/Table.jsx';

import ICImage from '../src/images/icons/ic-icon.svg';


export default {
  title: 'Table',
  component: Table,
};

export const Primary = () => (
  <Table>
    <thead>
      <DeviceDetailsHead />
    </thead>
    <tbody>
      <DeviceDetailsRow />
      <DeviceDetailsRow />
      <DeviceDetailsRow />
      <DeviceDetailsRow />
    </tbody>
  </Table>
);

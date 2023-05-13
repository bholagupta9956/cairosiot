import React from 'react';

import './styles.css'

import { StackedListContainer, StackedListItem } from '../src/js/components/standard/StackedList';

import ICImage from '../src/images/icons/ic-icon.svg';


export default {
  title: 'Stacked List',
  component: Primary,
};

export const Primary = () => (
  <div className="m-4">
    <StackedListContainer>
      <StackedListItem />
      <StackedListItem />
      <StackedListItem />
    </StackedListContainer>
  </div>
);

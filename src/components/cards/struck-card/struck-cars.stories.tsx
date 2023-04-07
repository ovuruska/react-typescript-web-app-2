import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import StruckCard, { StruckCardProps } from './struck-card';

export default {
  title: 'StruckCard',
  component: StruckCard,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<StruckCardProps> = (args) => <StruckCard {...args} />;


export const Basic = Template.bind({});
Basic.args = {
  content: 'Basic Struck Card',
  checked: false,
  onClick: () => {
    console.log('clicked');
  },
  price: 80,
};

export const Checked = Template.bind({});
Checked.args = {
  content: 'Checked Struck Card',
  checked: true,
  onClick: () => {
    console.log('clicked');
  },
  struckPrice: 100,
  price: 80,
};

export const DifferentPrices = Template.bind({});
DifferentPrices.args = {
  content: 'Struck Card with Different Prices',
  checked: false,
  onClick: () => {
    console.log('clicked');
  },
  struckPrice: 150,
  price: 120,
};

export const LongContent = Template.bind({});
LongContent.args = {
  content: 'Struck Card with a Longer Content Description for Testing',
  checked: false,
  onClick: () => {

  },
  struckPrice: 100,
  price: 80,
};

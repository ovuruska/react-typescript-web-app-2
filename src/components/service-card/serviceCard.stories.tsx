import { Story, Meta } from '@storybook/react';
import { CardComponent, CardProps } from './serviceCard';
// @ts-ignore
import grooming from '../../../assets/grooming.svg';

export default {
  title: 'CardComponent',
  component: CardComponent,
} as Meta;

const Template: Story<CardProps> = (args) => <CardComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  svg: grooming
  ,
  title: 'Card Title',
  subtitle: 'Card Subtitle',
};

/*
import React from 'react';
import './index.module.scss';



const NoApptCard = () => {
  return <div>

  </div>
}

export default NoApptCard
 */

// Path: src/components/cards/no-appt-card/index.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import NoApptCard,{NoApptCardProps} from './index';

export default {
  title: 'Components/Cards/NoAppointmentCard', component: NoApptCard,
} as Meta;

const Template: Story<NoApptCardProps> = (args) => <NoApptCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => {console.log("clicked")},
}

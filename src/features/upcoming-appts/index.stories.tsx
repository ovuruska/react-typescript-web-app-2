/*
import { AppointmentEntity } from '@domain/types/common/appointment';

export interface UpcomingApptsDumbProps {
  appointments: AppointmentEntity[];
}

const UpcomingApptsDumb = ({
  appointments,
                           }:UpcomingApptsDumbProps) => {
  return <div data-testid={"upcoming-appts"}></div>
}

export default UpcomingApptsDumb

 */

// Path: src/features/upcoming-appts/index.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import UpcomingApptDumb, { UpcomingApptsDumbProps } from './index.dumb';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { AppointmentEntity } from '@domain/types/common/appointment';
import PageCard from '@components/cards/page-card/page-card';

const appointmentGenerator = new AppointmentMockGenerator();

export default {
  title: 'Features/UpcomingAppointments', component: UpcomingApptDumb,
};

const Template: Story<UpcomingApptsDumbProps> = (args) => <PageCard><UpcomingApptDumb {...args} /></PageCard>;
export const NoAppointment = Template.bind({});
NoAppointment.args = {
  appointments: [] as AppointmentEntity[],
};

export const OneAppointment = Template.bind({});
OneAppointment.args = {
  appointments: appointmentGenerator.generateMany(1),
};

export const TwoAppointments = Template.bind({});
TwoAppointments.args = {
  appointments: appointmentGenerator.generateMany(2),
}

export const FiveAppointments = Template.bind({});
FiveAppointments.args = {
  appointments: appointmentGenerator.generateMany(5),
}

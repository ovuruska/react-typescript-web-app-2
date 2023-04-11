/*
import React from 'react';
import style from './index.module.scss';

export interface ClientCardProps{
  name: string;
  email: string;

} ;

const ClientCard = ({
                      name,
                      email,
                    }: ClientCardProps) => {
  return <div>

  </div>
}

export default ClientCard
 */

// Path: src/components/cards/client-card/index.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ClientCard, { ClientCardProps } from './index';

export default {
  title: 'Components/Cards/ClientCard',
  component: ClientCard,
}

const Template: Story<ClientCardProps> = (args) => <ClientCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "John Doe",
  email: "johndoe@gmail.com"
}


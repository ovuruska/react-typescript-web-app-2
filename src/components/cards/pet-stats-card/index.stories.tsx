/*
import React from 'react';
import style from 'index.module.scss';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { BiRightArrow } from 'react-icons/bi';

export interface PetStatsCard {
  pet: PetDetailsEntity;
  onClick: () => void;
}

const PetStatsCard = ({pet,onClick}:PetStatsCard) => {
  return <div data-testid={'pet-stats-card'} className={style.petStatsCard}>
    <div className={style.petStatsCardHeader}>
      <div className={style.petStatsCardHeaderLeft}>
        <h4>{pet.name}</h4>
        <p>{pet.age}</p>

      </div>
      <BiRightArrow onClick={onClick}/>
    </div>
    <div className={style.petStatsCardContent}> </div>
  </div>
}

export default PetStatsCard;

 */

// Path: src/components/cards/pet-stats-card/index.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import PetStatsCard, { PetStatsCardProps } from './index';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';

export default {
  title: 'Components/Cards/PetStatsCard',
  component: PetStatsCard,
} as Meta;

const petDetailsGenerator  = new PetDetailsMockGenerator();
const pet = petDetailsGenerator.generateOne();

const Template: Story<PetStatsCardProps> = (args) => <PetStatsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  pet
}

export const WithOnClick = Template.bind({});
WithOnClick.args = {
  ...Default.args,
  onClick: () => {console.log('clicked')},
}


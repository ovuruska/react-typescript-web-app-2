/*
import React, { ChangeEvent, useState } from 'react';
import {breeds} from '@components/inputs/dog-breed-select/index.constants';


export interface DropdownSelectProps {
  onSelect? : (breed:string) => void;
  initialValue?:string;

}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({ onSelect,initialValue }) => {
  const [selectedBreed, setSelectedBreed] = useState<string>(initialValue ?? "");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(event.target.value);
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  return (
    <select value={selectedBreed} onChange={handleChange}>
      <option value="">Select a dog breed</option>
      {breeds.map((breed, index) => (
        <option key={index} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;

 */

// Path: src/components/inputs/dog-breed-select/index.stories.ts

import React from 'react';
import { Meta, Story } from '@storybook/react';
import DropdownSelect, { DropdownSelectProps } from './index';

export default {
  title: 'Components/Inputs/DropdownSelect', component: DropdownSelect,
};

const options = [{
  value: 'Poodle', label: 'Poodle',
}, {
  value: 'Golden Retriever', label: 'Golden Retriever',
}];

const Template: Story<DropdownSelectProps<string>> = (args) => <DropdownSelect {...args} />;
export const Default = Template.bind({});
Default.args = {
  options
};

export const WithInitialValue = Template.bind({});


WithInitialValue.args = {
  ...Default.args,
   initialValue: options[0],
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: 'Select breed',
}


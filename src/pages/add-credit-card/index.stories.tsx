/*
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AddPetPage, { AddPetPageProps } from "./index.dumb";
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: "Pages/AddPet",
  component: AddPetPage,
} as Meta;

const Template: Story<AddPetPageProps> = (args) => {
  return <PageCard>
    <AddPetPage {...args} />
  </PageCard>;
}

export const AddPet = Template.bind({});
AddPet.args = {

}



 */
// Path: src/pages/add-credit-card/index.stories.tsx

import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AddCreditCardDumb,AddCreditCardDumbProps} from '@pages/add-credit-card/index.dumb';

export default {
  title: "Pages/AddCreditCard",
  component: AddCreditCardDumb,
} as Meta;

const Template: Story<AddCreditCardDumbProps> = (args) => {
  return <AddCreditCardDumb {...args} />;
}
Template.bind({});
export const AddCreditCard = Template.bind({});
AddCreditCard.args = {

}

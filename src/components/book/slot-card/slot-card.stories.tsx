import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import SlotCard from "./slot-card";

export default {
  title: "SlotCard",
  component: SlotCard,
} as ComponentMeta<typeof SlotCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SlotCard> = (args) => (
  <SlotCard time={"9:00"} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};

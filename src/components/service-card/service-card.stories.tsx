import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import ServiceCard from "./service-card";
import svgSrc from "../../assets/grooming.svg";

export default {
  title: "Service Card",
  component: ServiceCard,
} as ComponentMeta<typeof ServiceCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ServiceCard> = (args) => (
  <ServiceCard
    title="Grooming"
    subtitle="Tincidunt ornare massa"
    svgSrc={svgSrc}
  />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};

/*import styles from "./cta-primary.module.scss";
interface CtaPrimaryProps {
  content: string;
  loading?: boolean;
  onClick?: () => void;
}

const CtaPrimary : React.FC<CtaPrimaryProps> = ({
  content,
  onClick,
  loading = false
                    }) => {


  return <button data-testid={"cta-primary"} onClick={onClick} className={ loading ? styles.ctaPrimary__loading : styles.ctaPrimary   }>
    <label className={styles.ctaPrimary__label}>{content}</label>
  </button>

}

export default CtaPrimary
*/
// Path: src/components/buttons/cta-primary/cta-primary.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CtaPrimary, { CtaPrimaryProps } from './cta-primary';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/Buttons/CtaPrimary',
  component: CtaPrimary,
}

const Template: Story<CtaPrimaryProps> = (args) => <CtaPrimary {...args} />;
export const Default = Template.bind({});
Default.args = {

}

export const WithValue = Template.bind({});
WithValue.args = {
  content: 'Click me',
}

export const VeryLongValue = Template.bind({});
VeryLongValue.args = {
  content: faker.lorem.paragraphs(30)
}


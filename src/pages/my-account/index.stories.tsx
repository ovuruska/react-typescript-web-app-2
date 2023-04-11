/*
import React from 'react';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/all';

export interface MyAccountDumbProps{
  onClickAppointments?: () => void;
  onClickMyPets?: () => void;
  onClickChangePassword?: () => void;
  onClickBack?: () => void;
  onClickLogout?: () => void;
  onClickPaymentMethods?: () => void;
}

const MyAccountDummy: React.FC<MyAccountDumbProps> = ({
                                                        onClickAppointments,
                                                        onClickMyPets,
                                                        onClickChangePassword,
                                                        onClickBack,
                                                        onClickLogout,
                                                        onClickPaymentMethods,
                                                      }) => {
  return <div className={style.myAccount}>
    <div className={style.myAccountHeader}>
      <BiLeftArrow onClick={onClickBack}/>
      <h1>My Account</h1>
    </div>
    <div className={style.myAccountBody}>
      <div className={style.myAccountBody__buttonGroup}></div>
    </div>

  </div>;
};

export default MyAccountDummy

 */

// Path: src/pages/my-account/index.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'

import MyAccountDummy, { MyAccountDumbProps } from './index.dumb';
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: 'Pages/MyAccount',
  component: MyAccountDummy,
}

const Template: Story<MyAccountDumbProps> = (args) => <PageCard><MyAccountDummy {...args} /></PageCard>;
export const Default = Template.bind({});
Default.args = {
  name: "John Doe",
  email: "john.doe@gmail.com"
}

import ApptCard, { ApptCardProps } from '@components/cards/appt-card/index';
import React from 'react';
import ApptCardCompleted from '@components/cards/appt-card/completed';
import ApptCardCancelled from '@components/cards/appt-card/cancelled';

export interface ApptCardFactoryProps extends ApptCardProps {
  status?: string;
}

const ApptCardFactory: React.FC<ApptCardFactoryProps> =  (props: ApptCardFactoryProps) => {
  const {status = ""} = props;
  if (status == 'Completed') {
    return <ApptCardCompleted {...props} />;
  }else if(status == 'Cancelled') {
    return <ApptCardCancelled {...props} />;
  }else{
    return <ApptCard {...props} />;
  }
}

export default ApptCardFactory;

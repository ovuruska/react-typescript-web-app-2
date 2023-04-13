import { AppointmentEntity } from '@domain/types/common/appointment';
import CancelReasonForm from '@components/journeys/appt-cancel/cancel-reason';
import React from 'react';
import CancelConfirmation from '@components/journeys/appt-cancel/cancel-confirmation';
import CancelRejected from '@components/journeys/appt-cancel/cancel-rejected';
import { useFirebase } from '@hooks/firebase-context';
import useMe from '@hooks/use-me';
import ApptDetails from '@components/journeys/appt-cancel/appt-details';


export interface ApptRemovalJourneyProps {
  appointment: AppointmentEntity;
  open?: boolean;
  close?: () => void;
}

const ApptCancelJourney = ({
                              appointment, open, close,
                            }: ApptRemovalJourneyProps) => {

  const [step, setStep] = React.useState(0);
  const {analytics} = useFirebase();
  const me = useMe();

  const handleClose = () => {
    setStep(0);
    close?.();
  };

  const checkforDate = () => {
    // If appointment start date has 1 day left, then set step to 2
    const now = new Date().getTime();
    const startTime = new Date(appointment.start).getTime();
    const diff = startTime - now;
    const days = diff / (1000 * 60 * 60 * 24);
    if (days <= 1) {
      setStep(2);
    } else {
      setStep(1);
    }

  };


  if (!open) {
    return null;
  }else if(step === 0){
    return <ApptDetails onClose={handleClose} appointment={appointment} onNext={checkforDate} />
  } else if (step === 1) {
    return <CancelReasonForm   onClose={handleClose} appointment={appointment}
                             onNext={checkforDate} />;
  } else if (step === 2) {
    return <CancelConfirmation onClose={handleClose} onNext={handleClose} />;
  } else if (step === 3) {
    return <CancelRejected onClose={handleClose} onNext={handleClose} />;
  } else {
    handleClose();
    return null;
  }
};


export default ApptCancelJourney

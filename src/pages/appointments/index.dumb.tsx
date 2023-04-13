import { AppointmentEntity } from '@domain/types/common/appointment';
import { PetEntity } from '@domain/types/common/pet';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import DropdownSelect, { DropdownSelectItem } from '@components/inputs/dropdown-select';
import ApptCard from '@components/cards/appt-card';
import { useState } from 'react';

export interface AppointmentsPageDumbProps {
  appointments?: AppointmentEntity[];
  pets?: PetEntity[];
  goBack?: () => void;
  onApptClicked?: (appt: AppointmentEntity) => void;
}

const AppointmentsPageDumb = ({
  appointments = [],
  pets = [],
  goBack,
  onApptClicked
}: AppointmentsPageDumbProps) => {

  const [selectedPet,setSelectedPet] = useState<string>("All Pets");
  const [time,setTime] = useState<string>("All");

  const petOptions : DropdownSelectItem<string>[] = pets.map(pet => ({
    label: pet.name,
    value: pet.name
  }) );
  const initialValue = {label:"All Pets",value:"All Pets"}
  petOptions.push(initialValue);

  const initialValue2 = {
    label:"All",
    value:"All"
  }
  const options = [
    initialValue2,
    {
      label:"Upcoming",
      value:"Upcoming",
    },
    {
      label:"Past",
      value:"Past"
    }
  ]

  let filteredAppointments = appointments.filter((appt) => {
    const now = new Date().toString();
    if(time === "Upcoming"){
      return appt.start > now
    }else if(time === "Past"){
      return appt.start < now
    }
    return true;
  })

  filteredAppointments = filteredAppointments.filter((appt) => {
    if(selectedPet === "All Pets"){
      return true;
    }else{
      return appt.pet.name === selectedPet;
    }
  });

  const handleApptClicked = (appt: AppointmentEntity) => {
    onApptClicked && onApptClicked(appt);
  }


  return <div className={style.appointmentsPage}>
    <div className={style.appointmentsPageHeader}>
      <BiLeftArrow onClick={goBack}/>
      <h1>Appointments</h1>
    </div>
    <div style={{
      height:"40px"
    }}></div>
    <div className={style.appointmentsPageContent}>
      <div className={style.appointmentsPageContent__header}>
        <DropdownSelect options={petOptions} initialValue={initialValue}/>
        <DropdownSelect options={options} initialValue={initialValue2}/>
      </div>
      <div className={style.appointmentsPageContent__body}>
        {
          filteredAppointments.length === 0 ?
            <p data-testid={"appointments-page-no-appts-available"} className={style.appointmentsPageContent__bodyText}>No appointments available</p>:
            filteredAppointments.map((appt) => <ApptCard onClick={()=>handleApptClicked(appt)} date={appt.start} branch={appt.branch} employee={appt.employee} service={appt.appointment_type}/>)


        }
      </div>

    </div>

  </div>;
}

export default AppointmentsPageDumb;

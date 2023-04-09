import PageCard from '@components/cards/page-card/page-card';
import style from './index.module.scss';
import ServiceHeader from '@features/service-header/service-header';

export interface BookingJourneyProps {
  children: React.ReactNode;
  selectable: boolean;
}

const BookingJourney: React.FC<BookingJourneyProps> = ({
  children,
selectable = false
}: BookingJourneyProps) => {
  return <PageCard>
    <ServiceHeader selectable={selectable}/>
    <div className={style.bookingJourney}>

    {children}
    </div>

  </PageCard>
}

export default BookingJourney;

export interface DailyAvailableSlot {
  start: string;
  end: string;
  employee: number;
  branch: number;
}

export type  DailyAvailableSlotsResponse = DailyAvailableSlot[];

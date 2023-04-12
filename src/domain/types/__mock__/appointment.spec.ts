import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';

describe('AppointmentMockGenerator', () => {
  const generator = new AppointmentMockGenerator();
  it('should be defined.',()=>{
    expect(generator).toBeDefined();
  });

  it('should generate one appointment.',()=>{
    const appointment = generator.generateOne();
    expect(appointment).toBeDefined();
    expect(appointment.id).toBeDefined();
    expect(appointment.start).toBeDefined();
    expect(appointment.end).toBeDefined();
    expect(appointment.customer_notes).toBeDefined();

  });

  it('should generate many appointments.',()=>{
    const appointments = generator.generateMany(5);
    expect(appointments).toBeDefined();
  });
});

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/Appointment';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

// Separation of Concerns

appointmentRouter.get('/', (req, res) => {
  const appointments = appointmentRepository.all();
  return res.json(appointments);
});

appointmentRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentsInSameDate) {
    return res
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = appointmentRepository.create({
    provider,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentRouter;

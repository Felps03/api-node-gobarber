import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import locale from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment'

import Notification from '../schemas/Notification';

class CreateAppointmentServices {
  async run({ provider_id, user_id, date }) {

    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      throw new Error('Validation fails');

    const { provider_id, date } = req.body;

    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!checkIsProvider)
      throw new Error('You can only create appointments with providers');

    if (req.userId === provider_id)
      throw new Error('You can not create appointments with yourself.');

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date()))
      throw new Error('Past dates are not permitted');

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    })

    if (checkAvailability)
      throw new Error('Appointment dates is not available');

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date
    });

    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h", { locale });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id
    });

  }

}

export default new CreateAppointmentServices();
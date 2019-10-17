import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import locale from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment'
import User from '../models/User';
import Appointment from '../models/Appointment'
import Notification from '../schemas/Notification';

import File from '../models/File';

import CancelAppointmentServices from '../services/CancelAppointmentServices';

class AppointmentController {

  async index(req, res) {
    const { page = 1 } = req.query;

    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [{
        model: User,
        as: 'provider',
        attributes: ['id', 'name'],
        include: [{
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        }]
      }]
    })

    return res.json(appointment);
  }

  async store(req, res) {
    // const { provider_id, date } = req.body;

    // const appointment = await CreateAppointmentServices.run({
    //   provider_id,
    //   user_id: req.userId,
    //   date
    // });

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

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await CancelAppointmentServices.run({
      provider_id: req.params.id,
      user_id: req.userId
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();

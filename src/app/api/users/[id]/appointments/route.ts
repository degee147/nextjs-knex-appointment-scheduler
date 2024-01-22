import { createResponse } from '../../../../../../utils/common';
import db from '../../../../../../utils/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {

    const appointments = await db('appointments').where({ user_id: params.id }).select('*');
    for (const appointment of appointments) {
        appointment.provider = await db('providers').where('id', appointment.provider_id).first();
        if (appointment.provider) {
            appointment.doctor = await db('users').where('id', appointment.provider.user_id).first();
        }
        appointment.title = appointment.doctor.name;
        appointment.date = appointment.appointment_date;
    }
    return createResponse("Appointments Fetched", 200, { appointments, success: true });
    // return createResponse("User Appointments for " + params.id, 200, appointments);
}
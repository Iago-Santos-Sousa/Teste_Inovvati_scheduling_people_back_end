const { dbSchedule } = require("../db/dataBase");
const someUtils = require("../utils/someUtils");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
// Estendendo o dayjs com o plugin de parse format
dayjs.extend(customParseFormat);

const insertSchedule = async (
  person_name,
  location,
  scheduling_date,
  user_id
) => {
  try {
    const sqlQuery = `INSERT INTO scheduling.appointments (person_name, location, scheduling_date, user_id) VALUES (?, ?, ?, ?)`;
    const params = [person_name, location, scheduling_date, user_id];
    const [result] = await dbSchedule.query(sqlQuery, params);
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const listAppointments = async () => {
  try {
    const sqlQuery = `SELECT scheduling_id, person_name, location, scheduling_date, registration_date FROM scheduling.appointments`;
    const [result] = await dbSchedule.query(sqlQuery);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAppointment = async (scheduling_id) => {
  try {
    const sqlQuery = `SELECT scheduling_id, person_name, location, scheduling_date, registration_date FROM scheduling.appointments WHERE scheduling_id = ?`;
    const param = [scheduling_id];
    const [result] = await dbSchedule.query(sqlQuery, param);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTheAppointmentTimeAndLocation = async (
  schedulingDateSearch,
  location
) => {
  try {
    const sqlQuery = `SELECT scheduling_id, person_name, location, scheduling_date, registration_date FROM scheduling.appointments WHERE location = ?`;
    const param = [location];
    const [result] = await dbSchedule.query(sqlQuery, param);
    let getSchedulingDateSearch = "";

    if (result.length > 0) {
      getSchedulingDateSearch = someUtils.formatedSchedulingDateSearch(
        result[0].scheduling_date
      );
    }

    schedulingDateSearch = dayjs(
      schedulingDateSearch,
      "YYYY-MM-DD HH:mm"
    ).format("YYYY-MM-DD HH:mm");

    if (getSchedulingDateSearch === schedulingDateSearch && result.length > 0) {
      return result;
    }

    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateSchedule = async (updateData) => {
  try {
    const scheduling = await getAppointment(updateData.scheduling_id);
    const sqlQuery = `UPDATE scheduling.appointments SET person_name = ?, location = ?, scheduling_date = ?, user_id = ? WHERE scheduling_id = ?`;
    const params = [
      updateData.person_name,
      updateData.location,
      updateData.scheduling_date,
      updateData.user_id,
      updateData.scheduling_id,
    ];

    const [result] = await dbSchedule.query(sqlQuery, params);
    if (!result.affectedRows) {
      return [];
    }

    const updateSchedule = {
      ...scheduling[0],
      ...updateData,
    };

    return [updateSchedule];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAppointment = async (scheduling_id) => {
  try {
    const sqlQuery = `DELETE FROM scheduling.appointments WHERE scheduling_id = ?`;
    const param = [scheduling_id];
    const [result] = await dbSchedule.query(sqlQuery, param);
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  insertSchedule,
  listAppointments,
  getAppointment,
  updateSchedule,
  deleteAppointment,
  getTheAppointmentTimeAndLocation,
};

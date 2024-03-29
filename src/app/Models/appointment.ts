import { AppStatus } from "../Enums/AppStatus";

export interface IAppointment {
  id: number;
  date: Date;
  order: number;
  status: AppStatus;
  createdDate: Date;
  doctorID: number;
  patientID: number;
}

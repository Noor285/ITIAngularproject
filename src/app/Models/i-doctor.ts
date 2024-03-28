import { Gender } from "../Enums/Gender";
import { Status } from "../Enums/Status";

export interface IDoctor {
  id:number,
  name : string,
  email : string,
  governance : string,
  address : string,
  nationalID : string,
  phone : string,
  gender : Gender,
  dob : Date,
  appointmentPrice : number,
  status : Status,
  specialityID : string,
}

// Id:number,
// Name : string,
// Email : string,
// Governance : string,
// Address : string,
// NationalID : string,
// Phone : string,
// Gender : Gender,
// DOB : Date,
// AppointmentPrice : number,
// Status : Status,
// SpecialityID : string,


export interface IDoctor2 {
  id:number,
  name : string,
  email : string,
  governance : string,
  address : string,
  nationalID : string,
  phone : string,
  gender : Gender,
  dob : Date,
  appointmentPrice : number,
  status : Status,
  specialityID : string,
}

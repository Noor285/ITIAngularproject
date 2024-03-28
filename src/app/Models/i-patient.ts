import { Gender } from "../Enums/Gender";
import { Status } from "../Enums/Status";

export interface IPatient {
  Id:number,
  Name: string,
  Email: string,
  Phone : number,
  DOB?: Date | null,
  Gender?: Gender | null,
  Status?: Status | null
}


import { Injectable } from '@angular/core';
import { IPatient } from './../Models/i-patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  httpOption: { headers: HttpHeaders; };

  constructor(private httpClient:HttpClient) {
    this.httpOption={
      headers:new HttpHeaders({
         'Content-Type':'application/json',
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
        Authorization: `mazen__${localStorage.getItem('token')}`
      })
    };
   }




  getAllPatients(): Observable<IPatient[]> {
    return this.httpClient.get<IPatient[]>(`https://localhost:7013/api/Patient/Details`)};



  addPatient(patient: IPatient): Observable<IPatient> {
    return this.httpClient.post<IPatient>(`https://localhost:7013/api/Patient/Create/`, patient);
  }

  editPatient(updatedPatient: IPatient): Observable<IPatient> {
    return this.httpClient.put<IPatient>(`https://localhost:7013/api/Patient/Update`, updatedPatient);
  }

  getPatientById(patientId: number): Observable<IPatient> {
    return this.httpClient.get<IPatient>(`https://localhost:7013/api/Patient/${patientId}`);
  }

  deletePatient(patientId: number): Observable<void> {
    return this.httpClient.delete<void>(`https://localhost:7013/api/Patient/Delete/${patientId}`);
  }

  getPatientProfile():Observable<any>{
    return this.httpClient.get("https://mazen.cyclic.app/user/userProfile",this.httpOption);
  }

  getpatientProfileById(patientId: number): Observable<IPatient> {
    return this.httpClient.get<IPatient>(`https://localhost:7013/api/Patient/${patientId}`);
  }

  postpatientRate(bodyOfreview: any): Observable<IPatient> {
    return this.httpClient.post<IPatient>(`https://localhost:7013/api/Patient/Review/Add,bodyOfreview`,bodyOfreview);
  }

}

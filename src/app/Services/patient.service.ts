
import { Injectable } from '@angular/core';
import { IPatient } from './../Models/i-patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient) { }




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



}

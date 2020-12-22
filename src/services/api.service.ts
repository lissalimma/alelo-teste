import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<any>{
    return this.http.get(`${environment.api}/vehicle`);
  }

  getVehicles(page, limit): Observable<any>{
    return this.http.get(`${environment.api}/vehicle?page=${page}&limit=${limit}`);
  }

  getVehicleById(id): Observable<any>{
    return this.http.get(`${environment.api}/vehicle/${id}`);
  }

  getWithPlate(filter): Observable<any>{
    return this.http.get(`${environment.api}/vehicle?filter=${filter}`);
  }

  delete(id): Observable<any>{
    return this.http.delete(`${environment.api}/vehicle/${id}`);
  }

  create(vehicle): Observable<any>{
    return this.http.post(`${environment.api}/vehicle`, vehicle);
  }

  update(vehicle): Observable<any>{
    return this.http.put(`${environment.api}/vehicle/${vehicle.id}`, vehicle);
  }
}

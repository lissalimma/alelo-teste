import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {environment} from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) { }

  getVehicles(page, limit): Observable<any>{
    return this.http.get(`${environment.api}/vehicle?page=${page}&limit=${limit}`).pipe(take(1));
  }

  getWithPlate(filter): Observable<any>{
    return this.http.get(`${environment.api}/vehicle?filter=${filter}`).pipe(take(1));
  }

  delete(id): Observable<any>{
    return this.http.delete(`${environment.api}/vehicle/${id}`).pipe(take(1));
  }

  create(vehicle): Observable<any>{
    return this.http.post(`${environment.api}/vehicle`, vehicle).pipe(take(1));
  }

  update(id, vehicle): Observable<any>{
    return this.http.put(`${environment.api}/vehicle/${id}`, vehicle).pipe(take(1));
  }
}

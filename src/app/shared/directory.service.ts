import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
    getColumnConfig(columns){
        // return this.http.post(environment.apiBaseUrl + '../../assets/data/columns.json')
    }
}

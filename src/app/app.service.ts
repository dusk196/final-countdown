import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

var { G_KEY } = process.env;

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private httpClient: HttpClient) { }

  public getCalendarEvents(): Observable<Object> {
    return this.httpClient.get(environment.API_PATH + G_KEY); // environment.API_KEY can also be used
  }

}

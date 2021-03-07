import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
// })
export interface Loggs {
    // data: object;
    data: {
        status: number;
        type: string;
        message: string;
        data: object;
    };
}

@Injectable()
export class LoggsService {

    constructor(private http: HttpClient) { }

    fetchLoggs(email): Observable<Loggs> {
        return this.http.get<Loggs>(baseUrl + 'loggs/' + email);
    }

}

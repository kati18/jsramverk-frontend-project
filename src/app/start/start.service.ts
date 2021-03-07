import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
// })

export interface Start {
    data: {
        status: number;
        type: string;
        message: string;
        data: {
            site: string;
            description: string;
            trade_info: string;
        }
    };
}

@Injectable()
export class StartService {

    constructor(private http: HttpClient) { }

    fetchStart(): Observable<Start> {
        return this.http.get<Start>(baseUrl);
    }

}

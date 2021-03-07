import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//     providedIn: 'root'
// })

export interface Account {
    data: {
        status: number;
        type: string;
        message: string;
        data: {
            email: string;
            liquid_assets: number;
            amount_trattkantarell: number;
            amount_stensopp: number;
        }
    };
}

export interface AccountDeposit {
    data: {
        status: number;
        type: string;
        message: string;
    };
    errors: object;
}

@Injectable()
export class AccountsService {

    constructor(private http: HttpClient) { }

    fetchAccount(email): Observable<Account> {
        return this.http.get<Account>(baseUrl + 'accounts/' + email);
    }

    updateAccount(formData): Observable<AccountDeposit> {
        const headers = {'content-type': 'application/json'};

        // console.log('formData in accounts.service.ts: ', formData);
        return this.http.post<AccountDeposit>(baseUrl + 'accounts/', formData, {headers});

    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as dayjs from 'dayjs';
import 'dayjs/locale/se';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//     providedIn: 'root'
// })

export interface Login {
    data: {
        message: string;
        user: object;
        token: string;
        expiresIn: string;
    };

    errors: object;
}

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(formData): Observable<Login> {
        const headers = {'content-type': 'application/json'};

        console.log('Data2 i service-fil: ', formData);

        return this.http.post<Login>(baseUrl + 'login', formData, {headers})

        .pipe(tap(res => this.setSession(res)),
            shareReplay());
    }

    private setSession(authResult): void {
        dayjs.locale('se');
        // console.log('authResult: ', authResult);
        // console.log('expiresIn från login.service.ts: ', authResult.data.expiresIn);
        // console.log('Har jag anv:s email här? ', authResult.data.user.email);

        // const expiresAt = dayjs().add(authResult.data.expiresIn, 'h');
        const expiresAt = dayjs().add(authResult.data.expiresIn, 'm');
        // console.log('expiresAt: ', expiresAt);

        localStorage.setItem('id_token', authResult.data.token);
        const token = localStorage.getItem('id_token');
        // console.log('token: ', token);

        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        const logInExpiresAt = localStorage.getItem('expires_at');
        // console.log('logInExpiresAt', logInExpiresAt);

        localStorage.setItem('user', authResult.data.user.email);
        const loggedInUser = localStorage.getItem('user');
        // console.log('user från login.service.ts', loggedInUser);
    }

    logOut(): void {
        // console.log('Hej från logOut i login.service');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');

        const tokenAfterRemovalAndLogOut = localStorage.getItem('id_token');
        // console.log('tokenAfterRemovalAndLogOut: ', tokenAfterRemovalAndLogOut);
    }

    public isLoggedIn(): boolean {
        return dayjs().isBefore(this.getExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpiration(): any {
        dayjs.locale('se');
        const expiration = localStorage.getItem('expires_at');
        // console.log('expiration from getExpiration ', expiration);
        const expiresAt =  JSON.parse(expiration);
        // console.log('expiresAt from getExpiration ', expiresAt);
        return dayjs(expiresAt);

    /**Below in order to see if dayjs work. Formats the datetime to ISO standard
     * format. The code is also necessary for the button Get expiration date
     * and for the method getExpiration() in the component-file.:
     */
        // let sally = dayjs(expiresAt);
        // console.log("sally: ", sally);
        // return sally.format();
    }

    public loggedInEmail(): any {
        return this.getLoggedInEmail();
    }

    getLoggedInEmail(): any {
        const loggedInEmail = localStorage.getItem('user');
        // console.log('loggedInEmail från login.service.ts: ', loggedInEmail);
        return loggedInEmail;
    }
}

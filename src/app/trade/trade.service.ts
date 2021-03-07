import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import of the client library of Socket.IO. The library loads on the browser:
import { io } from 'socket.io-client';
// import { Observable } from 'rxjs/Observable';
import { Observable, throwError } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
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

export interface BuyMushrooms {
    data: {
        status: number;
        type: string;
        message: string;
    };
    errors: object;
}

@Injectable()
export class TradeService {
    // Below to be used when developing locally:
    // private socket = io('http://localhost:5000');
    // Below to be used on production server i e on Debian:
    private socket = io('https://socket-server-project.ktibe.me');

    constructor(private http: HttpClient) { }

    allItemsReceived(): any {
        // const observable = new Observable<{name: string, currValue: number}>(observer => {
        const observable = new Observable<{name: string, startingPoint: number}>(observer => {
      // const observable = new Observable<{user: string, message: object}>(observer => {
        this.socket.on('allItems', (data) => {
          observer.next(data);
        });
        return () => {this.socket.disconnect(); };
    }); // lint - 2 spaces added in front of });

        return observable; // lint - 2 spaces added in front of return observable;
    }

    fetchAccount(email): Observable<Account> {
        return this.http.get<Account>(baseUrl + 'accounts/' + email);
    }

    buyMushrooms(formData): Observable<BuyMushrooms> {
        const headers = {'content-type': 'application/json'};

        // console.log('formData i buyMushrooms trade.service.ts: ', formData);
        return this.http.post<BuyMushrooms>(baseUrl + 'trades/buy', formData, {headers});
    }

    sellMushrooms(formData): Observable<BuyMushrooms> {
        const headers = {'content-type': 'application/json'};

        // console.log('formData i buyMushrooms trade.service.ts: ', formData);
        return this.http.post<BuyMushrooms>(baseUrl + 'trades/sell', formData, {headers});
    }

}

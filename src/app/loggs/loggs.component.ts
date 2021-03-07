import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
// import {Router} from '@angular/router';
import {LoggsService } from './loggs.service';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-loggs',
    templateUrl: './loggs.component.html',
    styleUrls: ['./loggs.component.css'],
    providers: [ LoggsService, LoginService ]
})
export class LoggsComponent implements OnInit, AfterContentChecked, OnDestroy {
    isLoggedIn: boolean;
    loggedInEmail: string;
    private subscription: any;
    loggTexts: object;

    constructor(
        private loggsService: LoggsService,
        private loginService: LoginService
        // private router: Router
    ) { }

    ngOnInit(): void {
        if (this.loginService.isLoggedIn()) {
            this.isLoggedIn = this.loginService.isLoggedIn();
            this.loggedInEmail = this.loginService.loggedInEmail();
            console.log('this.loggedInEmail i ngOnInit loggs.component.ts: ', this.loggedInEmail);

            this.subscription = this.loggsService.fetchLoggs(this.loggedInEmail)
            // this.tradeService.fetchAccount(this.loggedInEmail)
                .subscribe((data) => {
                    console.log('data från ngOnInit i loggs.component.ts: ', data);
                    this.loggTexts = data.data.data;
                    // console.log('data från ngOnInit i loggs.component.ts: ', data.data.data.email);
                    // console.log('data från ngOnInit i loggs.component.ts: ', data.data.data.liquid_assets);
                    // console.log('data från ngOnInit i loggs.component.ts: ', data.data.data.amount_trattkantarell);
                    // console.log('data från ngOnInit i loggs.component.ts: ', data.data.data.amount_stensopp);
                    //
                    // this.email = data.data.data.email;
                    // this.liquidAssets = data.data.data.liquid_assets;
                    // this.amountTrattkantarell = data.data.data.amount_trattkantarell;
                    // this.amountStensopp = data.data.data.amount_stensopp;
                    // this.depositForm.get('email').setValue(data.data.data.email);
                    // this.depositForm.get('liquidAssets').setValue(data.data.data.liquid_assets);

                },
                (error) => {
                    console.log('error från ngOnInit i accounts.components.ts: ', error);
                }
            );
        }
    }

    ngAfterContentChecked(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { LoginService } from '../login/login.service';
import { StartService } from '../start/start.service';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css'],
    providers: [ LoginService, StartService ]
})
export class StartComponent implements OnInit, AfterContentChecked,  OnDestroy {
    isLoggedIn: boolean;
    textIfLoggedIn = 'To see your account go to My account, to trade go to Trade and to see your transaction logg go to My trade loggs.';
    textIfNotLoggedIn = 'To see your account and/or trade you need to be registered and logged in.';
    private subscription: any;
    startTexts: object; // an array object

    constructor(
        private loginService: LoginService,
        private startService: StartService
    ) { }

    ngOnInit(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();

        this.subscription = this.startService.fetchStart()
        // this.meService.fetchMe()
            .subscribe((data) => {
                // this.texts = data.data;
                this.startTexts = data.data.data;
            });
    }

    ngAfterContentChecked(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

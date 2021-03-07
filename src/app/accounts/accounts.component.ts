import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AccountsService } from './accounts.service';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css'],
    providers: [ AccountsService, LoginService ]
})
export class AccountsComponent implements OnInit, AfterContentChecked, OnDestroy {
    isLoggedIn: boolean;
    loggedInEmail: string;
    private subscription: any;
    email: string;
    liquidAssets: number;
    amountTrattkantarell: number;
    amountStensopp: number;
    errorMessage = '';
    successMessage = '';

    depositForm = new FormGroup({
        email: new FormControl(''),
        liquidAssets: new FormControl(),
        deposit: new FormControl('', Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.pattern('[0-9]{1,4}')
        ]))
    });

    constructor(
        private accountsService: AccountsService,
        private loginService: LoginService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.loginService.isLoggedIn()) {
            this.isLoggedIn = this.loginService.isLoggedIn();
            this.loggedInEmail = this.loginService.loggedInEmail();
            // console.log('this.loggedInEmail i ngOnInit accounts.component.ts: ', this.loggedInEmail);

            this.subscription = this.accountsService.fetchAccount(this.loggedInEmail)
            // this.tradeService.fetchAccount(this.loggedInEmail)
                .subscribe((data) => {
                    // console.log('data från ngOnInit i accounts.component.ts: ', data);
                    // console.log('data från ngOnInit i accounts.component.ts: ', data.data.data.email);
                    // console.log('data från ngOnInit i accounts.component.ts: ', data.data.data.liquid_assets);
                    // console.log('data från ngOnInit i accounts.component.ts: ', data.data.data.amount_trattkantarell);
                    // console.log('data från ngOnInit i accounts.component.ts: ', data.data.data.amount_stensopp);

                    this.email = data.data.data.email;
                    this.liquidAssets = data.data.data.liquid_assets;
                    this.amountTrattkantarell = data.data.data.amount_trattkantarell;
                    this.amountStensopp = data.data.data.amount_stensopp;
                    this.depositForm.get('email').setValue(data.data.data.email);
                    this.depositForm.get('liquidAssets').setValue(data.data.data.liquid_assets);

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

    onSubmit(): void {
        const depositFormData = this.depositForm.value;
        // console.log('depositFormData: ', depositFormData);

        this.accountsService.updateAccount(this.depositForm.value)
        .subscribe(
            (data) => {
            // console.log('data från report.comp.ts: ', data);
            // console.log('data.data: ', data.data);
            this.successMessage = data.data.message;
            // console.log('successMessage: ', this.successMessage);
            // this.submitted = true; // has no effect since redirect
            // console.log('data.data.token: ', data.data.token);
            this.router.navigate(['/trade']);
        },
            (error) => {
                // console.log('6error: ', error);
                this.errorMessage = error.error.errors.title;
                // console.log('errorMessage: ', this.errorMessage);
            }
        );
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get deposit(): any { return this.depositForm.get('deposit'); }

}

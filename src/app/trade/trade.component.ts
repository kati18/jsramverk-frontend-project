import { Component, OnInit, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TradeService } from './trade.service';
import { LoginService } from '../login/login.service';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.css'],
    providers: [ TradeService, LoginService ]
})
export class TradeComponent implements OnInit, AfterContentChecked {
    katjasTest: string;
    isLoggedIn: boolean;
    items: object[] = []; // an array of objects
    loggedInEmail: string;
    loggedInEmailLiquidAssets: number;
    loggedInEmailTratt: number;
    loggedInEmailSten: number;
    dTimeStamp: object;
    tradeData: ChartDataSets[] = [
        {label: 'Trattkantarell', data: [], borderColor: 'red'},
        {label: 'Stensopp', data: [], borderColor: 'blue'}
    ];
    tradeChartType: ChartType = 'line';
    tradeLabels: Label[] = [];
    tradeOptions: ChartOptions = {
        animation: {
            duration: 0
        }
    };
    limit = 20;
    private subscription: any;
    tradeForm = new FormGroup({
        timeStamp: new FormControl(''),
        email: new FormControl(''),
        liquidAssets: new FormControl(),
        ownedTratt: new FormControl(),
        ownedSten: new FormControl(),
        realTimePrice: new FormControl(),
        amount: new FormControl('', Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.pattern('[0-9]{1,4}')
        ])),
        mushroom: new FormControl('')
    });

    errorMessage = '';
    successMessage = '';
    submittedNotOK: boolean;

    constructor(
        private tradeService: TradeService,
        private loginService: LoginService,
        private router: Router,
    ) {
        this.tradeService.allItemsReceived()
            // .subscribe(data => this.items = data);
            // alt.:
            .subscribe((data) => {
                // console.log('data från trade.component.ts: ', data);
                this.items = data;

                if (this.tradeForm.value.mushroom === 'Trattkantarell') {
                    this.tradeForm.get('realTimePrice').setValue(data[0].startingPoint);
                }
                if (this.tradeForm.value.mushroom === 'Stensopp') {
                    this.tradeForm.get('realTimePrice').setValue(data[1].startingPoint);
                }

                // this.tradeForm.get('realTimePrice').setValue(data[0].startingPoint);
                // console.log('8this.loggedInEmail: ', this.loggedInEmail);
                this.tradeForm.get('timeStamp').setValue(this.dTimeStamp);
                this.tradeForm.get('email').setValue(this.loggedInEmail);
                this.tradeForm.get('liquidAssets').setValue(this.loggedInEmailLiquidAssets);
                this.tradeForm.get('ownedTratt').setValue(this.loggedInEmailTratt);
                this.tradeForm.get('ownedSten').setValue(this.loggedInEmailSten);

                // console.log('this.items[0]: ', this.items[0]);
                // console.log('this.items[1]: ', this.items[1]);
                // console.log('data[0]: ', data[0]);
                // console.log('data[1]: ', data[1]);
                // console.log('data[0].startingPoint: ', data[0].startingPoint);
                // console.log('data[1].startingPoint: ', data[1].startingPoint);
                //
                // console.log('2this.items från trade.component.ts: ', this.items);

                this.pushToTradeData(this.items);
            });

        // console.log('this.items från trade.component.ts: ', this.items);
    }

    ngOnInit(): void {
        this.katjasTest = 'Fungerar detta?';
        // this.tradeService.getAllItems();
        // console.log('this.items från ngOnInit: ', this.items);

        if (this.loginService.isLoggedIn()) {
            this.isLoggedIn = this.loginService.isLoggedIn();
            this.loggedInEmail = this.loginService.loggedInEmail();
            // console.log('this.loggedInEmail från ngOnInit: ', this.loggedInEmail);

            this.subscription = this.tradeService.fetchAccount(this.loggedInEmail)
                .subscribe((data) => {
                    this.loggedInEmailLiquidAssets = data.data.data.liquid_assets;
                    this.loggedInEmailTratt = data.data.data.amount_trattkantarell;
                    this.loggedInEmailSten = data.data.data.amount_stensopp;
                    // this.tradeForm.get('liquidAssets').setValue(data.data.data.liquid_assets);
                    // console.log('data från ngOnInit i trade.component.ts: ', data);
                },
                (error) => {
                    console.log('error från ngOnInit i trade.components.ts: ', error);
                }
            );
        }
    }

    ngAfterContentChecked(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    private isTradeDataFull(chartData: ChartDataSets[], limit: number): boolean {
        return chartData[1].data.length >= limit;
    }

    private removeOldestItemInTradeData(): void {
        this.tradeData[0].data = this.tradeData[0].data.slice(1);
        this.tradeData[1].data = this.tradeData[1].data.slice(1);
        this.tradeLabels = this.tradeLabels.slice(1);
    }

    private pushToTradeData(itemArray): void { // lint - : void added
        if (this.isTradeDataFull(this.tradeData, this.limit)) {
            this.removeOldestItemInTradeData();
        }

        // console.log('itemArray[0].startingPoint', itemArray[0].startingPoint);
        // console.log('itemArray[1].startingPoint', itemArray[1].startingPoint);

        this.tradeData[0].data.push(itemArray[0].startingPoint);
        this.tradeData[1].data.push(itemArray[1].startingPoint);
        const d = new Date(); // iso-format: 2021-02-26T10:29:38.928Z

        this.dTimeStamp = d;
        // console.log('d från pushToTradeData: ', d);
        this.tradeLabels.push(d.toLocaleTimeString());
    }

    onSubmit(clickedButton): void { // lint void added
        // console.log('clickedButton: ', clickedButton);
        // console.log('this.tradeForm.value: ', this.tradeForm.value);
        // console.log('clickedButton.attributes.id.value :', clickedButton.attributes.id.value);

        if (clickedButton.attributes.id.value === 'buy-button') {
            this.buy(this.tradeForm.value);
        } else {
            this.sell(this.tradeForm.value);
        }
    }

    buy(formData): void {
        // console.log('Hej från function buy()');
        // console.log('formData från buy(): ', formData);

        this.tradeService.buyMushrooms(this.tradeForm.value)
        .subscribe(
            (data) => {
            // console.log('data från report.comp.ts: ', data);
            // // console.log('data.data: ', data.data);
            this.submittedNotOK = false;
            this.successMessage = data.data.message;
            // console.log('successMessage: ', this.successMessage);
            // this.submitted = true;
            this.router.navigate(['/accounts']);
        },
            (error) => {
                // console.log('error: ', error);
                this.submittedNotOK = true;
                this.errorMessage = error.error.errors.title + '. Check your liquid assets before buying.';
                // console.log('errorMessage: ', this.errorMessage);
            }
        );
        // this.router.navigate(['/accounts']);
    }

    sell(formData): void {
        // console.log('Hej från function sell()');
        // console.log('formData från sell(): ', formData);
        this.tradeService.sellMushrooms(this.tradeForm.value)
        .subscribe(
            (data) => {
            // console.log('data från report.comp.ts: ', data);
            // // console.log('data.data: ', data.data);
            // this.submittedNotOK = false;
            this.successMessage = data.data.message;
            // console.log('successMessage: ', this.successMessage);
            // this.submitted = false;
            this.router.navigate(['/accounts']);
        },
            (error) => {
                // console.log('error: ', error);
                this.submittedNotOK = true;
                this.errorMessage = error.error.errors.title + '. Check your holdings before selling.'  ;
                // console.log('errorMessage: ', this.errorMessage);
            }
        );
        // this.router.navigate(['/accounts']);
    }

    changeMushroom(e): void {
        this.tradeForm.get('realTimePrice').setValue('');
        this.tradeForm.get('amount').setValue('');
        this.errorMessage = '';
    }

    get amount(): any { return this.tradeForm.get('amount'); }// ???

}

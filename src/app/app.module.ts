// The root module of the application
// This file is imported into and invoked from src/main.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// Below delares the reactive-form directives needed to use reactive forms
import { ReactiveFormsModule } from '@angular/forms';
// import {AutoSizeInputModule} from 'ngx-autosize-input'; //201016: not in use now
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TradeComponent } from './trade/trade.component';
import { StartComponent } from './start/start.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoggsComponent } from './loggs/loggs.component';

import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TradeComponent,
    StartComponent,
    AccountsComponent,
    LoggsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    // AutoSizeInputModule,// not in use 201016
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  // The main application view, called the root component and top level component,
  // which hosts all other app views. Only the root NgModule should set the bootstrap property:
  bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

        console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}

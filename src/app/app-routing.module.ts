import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// The extension .ts is and should be left out in the imports below:
import { AppComponent } from './app.component';
// import { MeComponent } from './me/me.component';
// import { ReportComponent } from './report/report.component';
// import { ReportsComponent } from './reports/reports.component';
// import { ChatComponent } from './chat/chat.component';
import { TradeComponent } from './trade/trade.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoggsComponent } from './loggs/loggs.component';

/* Below tells the Router which view to display when a user clicks a link
or pastes a URL into the browser address bar.*/
const routes: Routes = [
    // { path: 'reports', component: ReportsComponent },
    // { path: 'reports/week/:week_no', component: ReportComponent },
    // { path: 'chat', component: ChatComponent },
    // { path: 'me', component: MeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'loggs', component: LoggsComponent },
    { path: 'trade', component: TradeComponent },
    { path: '', component: StartComponent },
    { path: '**', component: StartComponent }
];

// @NgModule({
// /* The imports array is configured with the routes at the app´s root level.,
//    The forRoot() method supplies the services and directives needed for routing.: */
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]// -> the AppRoutingModule becomes available throughout the app
// })

// Test 201023 - handles the scrolling in the app:
@NgModule({
/* The imports array is configured with the routes at the app´s root level.,
   The forRoot() method supplies the services and directives needed for routing.: */
  imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]// -> the AppRoutingModule becomes available throughout the app
})
// End test 201023 - handles the scrolling in the app

export class AppRoutingModule { }

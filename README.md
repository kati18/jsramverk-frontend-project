# TradeAngular

[![Build Status](https://travis-ci.org/kati18/jsramverk-frontend-project.svg?branch=master)](https://travis-ci.org/kati18/jsramverk-frontend-project)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kati18/jsramverk-frontend-project/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-frontend-project/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/kati18/jsramverk-frontend-project/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kati18/jsramverk-frontend-project/build-status/master)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Installations/dependencies:

    - @angular/cdk
    - @angular/material
    - chart.js
    - dayjs
    - ng2-charts
    - ngx-autosize-input
    - socket.io-client

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Production server

Navigate to `https://trade-angular.ktibe.me/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running UI tests

Run `npm test` to execute the UI tests via Selenium and mocha.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## GitHub

The course repository for the Trade Angular is available at [My GitHub repo Trade Angular](https://github.com/kati18/jsramverk-frontend-project.git)<br>
A realtime price server is available at [My Github repo Realtime price server](https://github.com/kati18/jsramverk-socket-server-project.git)<br>
A backend Trade API is available at [My Github repo Trade API](https://github.com/kati18/jsramverk-backend-project.git)

## Implementation

Jag har valt att implementera min trade-app i Angular och då i sex stycken olika komponenter förutom förälder-komponenten. Vissa delar av applikationen såsom formulär för att köpa/sälja, sätta in medel på depån och transaktionslogg ser användaren först efter godkänd autentisering. Applikationen har också en graf för realtids-priser i en av komponenterna. Historiken försvinner vid omladdning av sidan och varje gång komponenten renderas upp på nytt. Kanske hade detta kunnat undvikas om jag hade placerat grafen i förälder-komponenten istället men å andra sidan hade ju grafen synts överallt då vilket jag inte ville. Grafen skapar jag med hjälp av npm-modulen ng2-charts vilket ju också, om jag har förstått det rätt, är speciellt utvecklad för Angular2-applikationer och därför kändes lämplig att använda och prova på. I applikationen finns totalt fyra olika formulär som alla valideras i frontenden avseende olika aspekter: obligatoriska värden(required), format(pattern) och/eller storlek på värde(min). Användaren får således direkt återkoppling på felaktig/ogiltig input och därmed möjlighet att korrigera innan formulären postas.

## Tester frontend

För att testa frontenden har jag gjort och tänkt på samma sätt som jag gjorde i kmom04 d v s jag har gjort många tester, se urval nedan, varav några även går mot det driftsatta backend API:et(Trade API).

Use cases:
1. Användaren ska från startsidan kunna trycka på navigeringslänken Trade för att se rubrik och informationstext på webbsidan för handel.
2. Användaren ska från startsidan kunna trycka på navigeringslänken Register för att komma till ett registrerings-formulär och knappen Register ska bli aktiv när användaren har fyllt i både giltigt användarnamn och ett lösenord.
3. Användaren ska från startsidan kunna trycka på navigeringslänken Login för att komma till ett inloggnings-formulär och knappen Login ska bli aktiv när användaren har fyllt i både giltigt användarnamn och ett lösenord.
4. Användaren ska från annan sida än startsidan kunna trycka på navigeringslänken Start för att se information om applikationen Trade.
5. Användaren ska efter autentisering kunna se navigeringslänkarna till "My account", "My trade logg" och "Logout".

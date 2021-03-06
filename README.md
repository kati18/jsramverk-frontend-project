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

Jag har valt att implementera min trade-app i Angular och d?? i sex stycken olika komponenter f??rutom f??r??lder-komponenten. Vissa delar av applikationen s??som formul??r f??r att k??pa/s??lja, s??tta in medel p?? dep??n och transaktionslogg ser anv??ndaren f??rst efter godk??nd autentisering. Applikationen har ocks?? en graf f??r realtids-priser i en av komponenterna. Historiken f??rsvinner vid omladdning av sidan och varje g??ng komponenten renderas upp p?? nytt. Kanske hade detta kunnat undvikas om jag hade placerat grafen i f??r??lder-komponenten ist??llet men ?? andra sidan hade ju grafen synts ??verallt d?? vilket jag inte ville. Grafen skapar jag med hj??lp av npm-modulen ng2-charts vilket ju ocks??, om jag har f??rst??tt det r??tt, ??r speciellt utvecklad f??r Angular2-applikationer och d??rf??r k??ndes l??mplig att anv??nda och prova p??. I applikationen finns totalt fyra olika formul??r som alla valideras i frontenden avseende olika aspekter: obligatoriska v??rden(required), format(pattern) och/eller storlek p?? v??rde(min). Anv??ndaren f??r s??ledes direkt ??terkoppling p?? felaktig/ogiltig input och d??rmed m??jlighet att korrigera innan formul??ren postas.

## Tester frontend

F??r att testa frontenden har jag gjort och t??nkt p?? samma s??tt som jag gjorde i kmom04 d v s jag har gjort m??nga tester, se urval nedan, varav n??gra ??ven g??r mot det driftsatta backend API:et(Trade API).

Use cases:
1. Anv??ndaren ska fr??n startsidan kunna trycka p?? navigeringsl??nken Trade f??r att se rubrik och informationstext p?? webbsidan f??r handel.
2. Anv??ndaren ska fr??n startsidan kunna trycka p?? navigeringsl??nken Register f??r att komma till ett registrerings-formul??r och knappen Register ska bli aktiv n??r anv??ndaren har fyllt i b??de giltigt anv??ndarnamn och ett l??senord.
3. Anv??ndaren ska fr??n startsidan kunna trycka p?? navigeringsl??nken Login f??r att komma till ett inloggnings-formul??r och knappen Login ska bli aktiv n??r anv??ndaren har fyllt i b??de giltigt anv??ndarnamn och ett l??senord.
4. Anv??ndaren ska fr??n annan sida ??n startsidan kunna trycka p?? navigeringsl??nken Start f??r att se information om applikationen Trade.
5. Anv??ndaren ska efter autentisering kunna se navigeringsl??nkarna till "My account", "My trade logg" och "Logout".

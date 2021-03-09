/**
 * Originally a duplicate of test file for application me-angular
 * Functional/UI tests for frontend application trade-angular
 */
"use strict";

const assert = require("assert");
/**
 * a webdriver test object that provides awareness that webdriver is being used,
 * wraps around MochaJS test functions(before, beforeEach, it etc),
 * wraps Mocha so it does not have to be imported:
 */
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

// The Selenium Webdriver object:
let browser;


// Test suite "Trade-app"
test.describe("Trade-app", function() {
    // does something before execution of each test case in the test suite:
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        // Sets the starting url in browser when the testing begins,
        // is only a host-server("a place") on which the tests are running:
        // browser.get("http://localhost:8084/app/");
        browser.get("http://localhost:8084/");
        done();
    });
    // does something after execution of each test case in the test suite:
    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    async function goToNavLink(target) {
        // console.log("target från goToNavLink: ", target);
        await browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    async function findNavLink(target) {
        // console.log("target från goToNavLink: ", target);
        await browser.findElement(By.linkText(target)).then(function(element) {
            element.isDisplayed().then(function(value) {
                assert.equal(value, true);
            });
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            // console.log("target från matchUrl: ", target);
            // console.log("url från matchUrl: ", url);
            assert.ok(url.endsWith(target));
        });
    }

    async function assertByElement(target, elToAssert) {
        // console.log("target från assertByElement", target);
        await browser.findElement(By.css(elToAssert)).then(async function(element) {
            await element.getText().then(function(text) {
                // console.log("text från assertByElement: ", text);
                assert.equal(text, target);
            });

            // console.log("utanför getText");
        });
    }

    async function assertById(target, idToFind) {
        // console.log("target från assertById", target);
        // console.log("idToFind från assertById", idToFind);
        await browser.findElement(By.id(idToFind)).then(async function(element) {
            await element.getText().then(function(text) {
                // console.log("text från assertById: ", text);
                assert.equal(text, target);
            });
            // console.log("utanför getText");
        });
    }


    // Test case "Test to go to Index":
    test.it("Test to go to Index", function(done) {
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            }).then(function() {
                    assertByElement("My project in course jsramverk", "h1");
            }).then(function() {
                    matchUrl("/");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Trade":
    test.it("Test to go to Trade", function(done) {
        goToNavLink("Trade");
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            }).then(function() {
                    assertById("Realtime prices on mushrooms", "trade-title");
            }).then(function() {
                    assertByElement("If you want to trade mushrooms you need to be " +
                             "registered and logged in.", "h3");
            }).then(function() {
                    matchUrl("/trade");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Start":
    test.it("Test to go to Start", function(done) {
        goToNavLink("Start");
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            }).then(function() {
                    assertById("Start works!", "start");
            }).then(function() {
                    assertById("Welcome to Katja's fake trading site!", "start-title"); // from BE
            }).then(function() {
                    assertByElement("Here you can trade with Trattkantareller and Stensoppar.",
                             "h3"); // from BE
            }).then(function() {
                    matchUrl("/");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Register":
    test.it("Test to go to Register", function(done) {
        goToNavLink("Register");
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            }).then(function() {
                    assertById("Welcome to register!", "register-title");
            }).then(function() {
                    matchUrl("/register");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Login":
    test.it("Test to go to Login", function(done) {
        goToNavLink("Login");
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            }).then(function() {
                    assertById("Welcome to login!", "login-title");
            }).then(function() {
                    matchUrl("/login");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test if button for registration is enabled":
    test.it("Test if button for registration is enabled", function(done) {
        goToNavLink("Register");

        browser.findElements(By.className("register-input")).then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("fakePassword");
            }).then(function() {
                browser.findElement(By.className("register-button")).then(function(buttonElement) {
                    buttonElement.isEnabled().then(function(value) {
                        assert.equal(value, true);
                    })
                })
            }).then(function() {
                done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test if button for login is enabled":
    test.it("Test if button for login is enabled", function(done) {
        goToNavLink("Login");

        let promiseInputs = browser.findElements(By.className("login-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("fakePassword");
        });

        browser.findElement(By.className("login-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, true);
            });
        });

        done();
    });


    // Test case "Test if button for registration is enabled when missing @ in email":
    test.it("Test if button for registration is enabled when missing @ in email", function(done) {
        goToNavLink("Register");

        let promiseInputs = browser.findElements(By.className("register-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18test.se");
            inputElements[1].sendKeys("fakePassword");
        });

        browser.findElement(By.className("register-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, false);
            });
        });

        done();
    });


    // Test case "Test if button for login is enabled when missing password":
    test.it("Test if button for login is enabled when missing password", function(done) {
        goToNavLink("Login");

        let promiseInputs = browser.findElements(By.className("login-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("");
        });

        browser.findElement(By.className("login-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, false);
            });
        });

        done();
    });

    // Test case "Test if nav link that demands authentication is visible after logging in":
    test.it("Test if nav link that demands authentication is visible after logging in", function(done) {
        goToNavLink("Login");

        browser.findElements(By.className("login-input")).then(function(inputElements) {
            inputElements[0].sendKeys("travis.18@test.se");
            inputElements[1].sendKeys("prussiluskaNgillarfillifjonkan?%");
            }).then(function() {
                browser.findElement(By.className("login-button")).click();
            }).then(function() {
                findNavLink("Logout");
            }).then(function() {
                findNavLink("My account");
            }).then(function() {
                browser.findElement(By.className("logout")).click();
            }).then(function() {
                done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to log in and go to Account":
    test.it("1.Test to log in and go to Account", function(done) {
        goToNavLink("Login");

        let promiseInputs = browser.findElements(By.className("login-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("travis.18@test.se");
            inputElements[1].sendKeys("prussiluskaNgillarfillifjonkan?%");
        });

        browser.findElement(By.className("login-button")).click();

        goToNavLink("My account");
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            // }).then(function() {
            //         assertById("Start works!", "start");
            }).then(function() {
                    assertById("travis.18@test.se", "account-details"); // from BE
            }).then(function() {
                    assertByElement("Current assets and holdings", "h1");
            }).then(function() {
                    matchUrl("/accounts");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });

            // browser.findElement(By.className("logout")).click();
            goToNavLink("Logout");

            browser.findElement(By.linkText("Login")).then(function(linkElement) {
                linkElement.isDisplayed().then(function(value) {
                    assert.equal(value, true);
                });
            });

            done();

    });

    // Test case "Test to log in and go to My trade logg":
    test.it("1.Test to log in and go to My trade logg", function(done) {
        goToNavLink("Login");

        let promiseInputs = browser.findElements(By.className("login-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("travis.18@test.se");
            inputElements[1].sendKeys("prussiluskaNgillarfillifjonkan?%");
        });

        browser.findElement(By.className("login-button")).click();

        goToNavLink("My trade logg");
        browser.getTitle().then(function(title) {
                assert.equal(title, "TradeAngular");
            // }).then(function() {
            //         assertById("Start works!", "start");
            }).then(function() {
                    assertById("My trade logg", "loggs-title");
            }).then(function() {
                    assertByElement("Transactions", "caption");
            }).then(function() {
                    matchUrl("/loggs");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });

        // browser.findElement(By.className("logout")).click();
        // browser.findElement(By.linkText("Logout")).click();
        goToNavLink("Logout");

        browser.findElement(By.linkText("Login")).then(function(linkElement) {
            linkElement.isDisplayed().then(function(value) {
                assert.equal(value, true);
            });
        });

        done();

    });

    // Test case "Test to log in and go to My trade logg":
    test.it("2.Test to log in and go to My trade logg", function(done) {
        goToNavLink("Login");

        browser.findElements(By.className("login-input")).then(function(inputElements) {
            inputElements[0].sendKeys("travis.18@test.se");
            inputElements[1].sendKeys("prussiluskaNgillarfillifjonkan?%");
            }).then(function() {
                    browser.findElement(By.className("login-button")).click();
            }).then(function() {
                    goToNavLink("My trade logg");
            }).then(function() {
                browser.getTitle().then(function(title) {
                    assert.equal(title, "TradeAngular");
                });
            }).then(function() {
                    assertById("My trade logg", "loggs-title");
            }).then(function() {
                    assertByElement("Transactions", "caption");
            }).then(function() {
                    matchUrl("/loggs");
            }).then(function() {
                    goToNavLink("Logout");
            }).then(function() {
                    browser.findElement(By.linkText("Login")).then(function(linkElement) {
                        linkElement.isDisplayed().then(function(value) {
                            assert.equal(value, true);
                        });
                    });
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });

    // Test case "Test to ensure authenticated user´s account is fetched":
    test.it("Test to ensure authenticated user´s account is fetched", function(done) {

        goToNavLink("Login");
        browser.findElements(By.className("login-input")).then(function(inputElements) {
            inputElements[0].sendKeys("travis.18@test.se");
            inputElements[1].sendKeys("prussiluskaNgillarfillifjonkan?%");
            }).then(function() {
                    browser.findElement(By.className("login-button")).click();
            }).then(function() {
                    goToNavLink("My account");
            }).then(function() {
                    browser.getTitle().then(function(title) {
                        assert.equal(title, "TradeAngular");
                    });
            }).then(function() {
                    assertById("travis.18@test.se", "account-details"); // from BE
            }).then(function() {
                    assertByElement("Current assets and holdings", "h1");
            }).then(function() {
                    matchUrl("/accounts");
            }).then(function() {
                    browser.findElement(By.className("logout")).click();
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });

});

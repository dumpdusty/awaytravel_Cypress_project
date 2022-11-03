//This is a test project for testing AwayTravel website

import "cypress-real-events/support";

describe('Home Page', function () {
    it('test_1.0 home page', function () {
        cy.visit('/')
        cy.url().should('include', 'https://www.awaytravel.com/')
        cy.title().should("contain", 'Away | Built for modern travel')
        cy.get(`[aria-label="homepage"]`).should(`be.visible`)
        cy.contains(`[class="headroom-wrapper"]`, `Help`).should(`be.visible`)
        cy.get(`#email-capture-input`).should(`be.visible`)
    })
})

describe('Stores link', function () {
    it('test_2.0 stores page', function () {
        cy.visit('/')
        cy.contains('Stores').click({force: true})
        cy.url().should('include', '/stores')

        //this assertion failed. Better to put it to separate test
        cy.title().should(`eq`, `VISIT US IRL`)
    })
})

describe('Testing each store page', function () {
    //better to put the arrays declared below to fixtures directory and import from there
    const cityArray = ['Austin', 'Boston', 'Chicago', 'Dallas', 'Houston', 'LA: Venice Beach', 'LA: West Hollywood', 'London', 'NYC: NoHo', 'NYC: Williamsburg', 'San Francisco', 'Seattle', 'Toronto']
    const addressArray = ['TX 78758', 'MA 02210', 'IL 60610', 'TX 75205', 'TX 77027', 'CA 90291', 'CA 90069', 'WC2H 9LL', 'NY 10012', 'NY 11249', 'CA 94102', 'WA 98105', 'ON M6A 2T9']

    before(function () {
        cy.visit(`/stores`)
    })

    it('Test 3.0 Navigate to Stores Page', () => {
        cy.get('div[class^=masthead_title] h1').should('have.text', 'Visit us IRL');
    })

    //checking the names for all stores
    it(`Test 3.1 check store city names`, function () {
        for (let i = 0; i < cityArray.length; i++) {
            cy.get(`[class^="content_tile_medium_diptych_copyContainer"]`).should(`contain`, `${cityArray[i]}`)
        }
    })

    //checking the addresses for all stores
    it(`Test 3.2 check stores has addresses`, function () {
        for (let i = 0; i < addressArray.length; i++) {
            cy.get(`[class^="content_tile_medium_diptych_copyContainer"]`).should(`contain`, `${addressArray[i]}`)
        }
    })

    //checking the links for all stores
    it(`Test 3.3 check stores has link`, function () {
        for (let i = 0; i < cityArray.length; i++) {
            cy.get(`[class^="content_tile_medium_diptych_copyContainer"]`).should(`contain`, `See store`)
        }
    })
})

describe(`Arrow icon`, function () {
    before(function () {
        cy.visit(`/stores`)
    })
    it(`Test 4.0 check arrow animation`, function () {
        cy.get('div[class*=copyContainer] div[class*=cta_iconRight]')
            .eq(0).realHover()
            .invoke('attr', 'class').should('contain', 'cta_lightExit');
    })
})

describe(`Testing Houston store`, function () {
    before(function(){
        cy.visit(`/stores`)
        cy.get(`[data-link="/stores/houston"]`).click()
    })
    it(`Test 5.0 check the title`, function () {
        cy.title().should(`contain`, `Away in Houston`)
    })
    it(`Test 5.1 check description`, function(){
        cy.get(`a[href^="tel"]`).should(`be.visible`)
        cy.get(`a[href^="mailto"]`).should(`be.visible`)
        cy.get(`a[href="/help/our-stores"]`).should(`be.visible`)
    })
    it(`Test 6.0 check additional information`, function(){
        cy.get(`[class^="store_location_messages_tiles"]`).should(`contain`, `Sanitizing stations`)
        cy.get(`div[class^="store_location_messages_tiles"] svg`).eq(0).invoke(`attr`, `width`)
            .should(`eq`, `80`)
        cy.get(`div[class^="store_location_messages_tiles"] svg`).eq(1).invoke(`attr`, `width`)
            .should(`eq`, `80`)
        cy.get(`div[class^="store_location_messages_tiles"] svg`).eq(2).invoke(`attr`, `width`)
            .should(`eq`, `80`)

    })
})


describe(`Testing Chicago store`, function () {
    before(function () {
        cy.visit(`/stores`)
        cy.get(`[data-link="/stores/chicago"]`).click()
    })
    it(`Test 7.0 check the title`, function () {
        cy.title().should(`contain`, `Away in Chicago`)
    })
    it(`Test 7.1 check description`, function () {
        cy.get(`a[href^="tel"]`).should(`be.visible`)

        //this assertion failed. Better put all assertions into separate test cases
        cy.get(`a[href^="mailto"]`).should(`be.visible`)

        cy.get(`a[href="/help/our-stores"]`).should(`be.visible`)
    })
    it(`Test 8.0 check additional information`, function () {
        cy.get(`[class^="store_location_messages_tiles"]`)
            .should(`contain`, `Sanitizing stations`)
        cy.get(`div[class^="store_location_messages_tiles"] svg`).eq(0).invoke(`attr`, `width`)
            .should(`eq`, `80`)
        cy.get(`div[class^="store_location_messages_tiles"] svg`).eq(1).invoke(`attr`, `width`)
            .should(`eq`, `80`)
        cy.get(`div[class^="store_location_messages_tiles"] svg`).eq(2).invoke(`attr`, `width`)
            .should(`eq`, `80`)

    })
})

describe(`Testing Gallery`, function () {
    before(function(){
        cy.visit(`/stores`)
        cy.get(`[data-link="/stores/houston"]`).click()
    })

    it(`Test 9.1 check the all images loaded`, function () {
        cy.get(`[class="component component-gallery"]`)
            .find(`[class^="image_component"]`).each((el) =>{
            cy.wait(5000)
            cy.wrap(el).should('exist')
                .and((el) => {
                    expect(el[0].naturalWidth).to.be.greaterThan(0)
                    expect(el[0].naturalHeight).to.be.greaterThan(0)
                })
        })
    })

    it(`Test 9.1 check arrow icons present on a page`, function () {
        cy.get(`[class*="nextButton"]`).should('be.visible')
        cy.get(`[class*="prevButton"]`).should('be.visible')

    })
})

//Last two tasks were not completed due to lack of time.
//I'm going to do it later this week and push it to the same repository

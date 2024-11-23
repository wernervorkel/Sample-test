// Test
context('add publisher notes to campaign', () => {
    before(function() {
    cy.loginViaAPI();
    });
    
    it('should add publisher notes', () => {
    cy.publisherNotes();
    //campaign info for publishers
    cy.campaignInfoPublisherNotes();
    });
    });
    
    
    // Command
    //add publiser notes
    Cypress.Commands.add('publisherNotes', () => {
    //filter to search for 44025 campaign in search bar
    cy.get(
        '[data-cy="search-results"] > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix > [data-cy="search"]'
    )
    .type('44025', { delay: 200, force: true })
    .get('.mat-mdc-option > .mdc-list-item__primary-text')
    .contains('44025')
    .click({ force: true });
    cy.url().should('contain', '/overview');
    //campaign>admin>requirements
    cy.get('[data-cy-menu="Admin"]')
    .first()
    .click({ force: true });
    cy.get('[data-cy-menu="Admin_Setup"]').click({
    multiple: true,
    force: true,
    });
    cy.url().should('contain', '/admin/setup');
    cy.contains(' Requirements ').click({ force: true });
    cy.wait(1000);
    //clear publisher notes editor
    cy.get('.fr-element').clear();
    cy.wait(2000);
    //add and validate dummy check jobs
    cy.get(
    ':nth-child(4) > .content-padding-sml > [data-cy="toggle-condition1"] > .mat-checkbox-layout > .mat-checkbox-inner-container'
    ).click({ force: true });
    cy.get(
    ':nth-child(5) > .content-padding-sml > [data-cy="toggle-condition1"] > .mat-checkbox-layout > .mat-checkbox-inner-container'
    ).click({ force: true });
    cy.get('.content-padding-sml > [data-cy="btn-save"]')
    .contains(' Append to Publisher Notes ')
    .click({ force: true });
    cy.wait(1000);
    //validate jobs in publisher editor
    cy.get('.fr-element')
    .contains('Test Data Check')
    .should('be.visible');
    cy.get('.fr-element')
    .contains('Non Standard Character Check')
    .should('be.visible');
    cy.get('.mat-button-wrapper')
    .contains(' Save ')
    .click({ force: true });
    });

    Cypress.Commands.add('campaignInfoPublisherNotes', () => {
    //campaign publishers
    cy.get('[data-cy-menu="campaign publisher"]').click({ force: true });
    cy.url().should('contain', '/publishers');
    cy.contains(' Publisher A (Lead Export)- DO NOT TOUCH ').click({
    force: true,
    });
    cy.url().should('contain', '/current_campaigns');
    cy.get('.cdk-column-campaign-id_2 > .mat-focus-indicator').click({
    force: true,
    });
    cy.get('#filterSearch').type('44025');
    cy.wait(2000);
    cy.contains(' Apply ').click({ force: true });
    cy.get('[data-cy-tablecontrols="Refresh Table Contents"]').click({
    multiple: true,
    force: true,
    });
    //campaign info icon
    cy.get(
    '[matbutton=""][data-cy-publisher="Campaign Information"] > .mat-tooltip-trigger'
    ).click({ multiple: true, force: true });
    cy.wait(5000);
    //campaign info modal- click on publisher notes
    cy.get('#mat-tab-label-4-1 > .mat-tab-label-content')
    .contains('Publisher Notes')
    .click({ force: true });
    //validate jobs are visible in pub notes
    cy.get('.ng-untouched > .mat-form-field')
    .contains('Test Data Check')
    .should('be.visible');
    cy.get('.ng-untouched > .mat-form-field')
    .contains('Non Standard Character Check')
    .should('be.visible');
    });
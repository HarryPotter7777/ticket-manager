/// <reference types="cypress" />

context('Todo', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('add a todo', () => {
        // initialize a todo
        cy.getBySel('add-task').should('be.visible').click();
        cy.getBySel('modal-add-title', { timeout: 1000 }).eq(0)
            .type('test');
        cy.getBySel('modal-add-description').eq(0)
            .type('test description');
        cy.getBySel('modal-add-submit').eq(0)
            .click();

        cy.getBySel('todo-title').eq(0).contains('test');
    });

    it('update a todo', () => {
        // initialize a todo
        cy.getBySel('add-task').should('be.visible').click();
        cy.getBySel('modal-add-title', { timeout: 1000 }).eq(0)
            .type('test');
        cy.getBySel('modal-add-description').eq(0)
            .type('test description');
        cy.getBySel('modal-add-submit').eq(0)
            .click();
        cy.getBySel('todo-title').eq(0).contains('test');

        // update a todo
        cy.getBySel('todo-title').eq(0).click();
        cy.getBySel('modal-update-title', { timeout: 1000 }).eq(0)
            .type('update test');
        cy.getBySel('modal-update-description').eq(0)
            .type('update description');
        cy.getBySel('modal-update-submit').eq(0)
            .click();
        cy.getBySel('todo-title').eq(0).contains('update test');
    });

    it('check a todo', () => {
        // initialize a todo
        cy.getBySel('add-task').should('be.visible').click();
        cy.getBySel('modal-add-title', { timeout: 1000 }).eq(0)
            .type('test');
        cy.getBySel('modal-add-description').eq(0)
            .type('test description');
        cy.getBySel('modal-add-submit').eq(0)
            .click();
        cy.getBySel('todo-title').eq(0).contains('test');

        // check a todo
        cy.getBySel('todo-checkbox').eq(0).get('input[type="checkbox"]').eq(0)
            .check().should('be.checked');
        cy.getBySel('todo-checkbox').eq(0).get('input[type="checkbox"]').eq(0)
            .uncheck().should('not.be.checked');
    });
});
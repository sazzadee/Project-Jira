describe('Issue deletion', () => {
    const issueDetailsModal = '[data-testid="modal:issue-details"]';
    const trashIcon = '[data-testid="icon:trash"]';
    const confirmModal = '[data-testid="modal:confirm"]';
    const backlogList = '[data-testid="board-list:backlog"]';

    beforeEach(() => {
        cy.visit('/');
        cy.contains('This is an issue of type: Task.').click();
    });
    //assignment 3 Test case 1
    it('Should delete the issue and not be visible anymore', () => {
        cy.get(issueDetailsModal).should('be.visible').within(() => {
            cy.get(trashIcon).should('be.visible').click();
        });
        cy.get(confirmModal).should('be.visible').within(() => {
            cy.get('button').contains('Delete issue').should('be.visible').click();
        });

        cy.get(confirmModal).should('not.exist');
        cy.get(issueDetailsModal).should('not.exist');

        cy.get(backlogList).contains('This is an issue of type: Task.').should('not.exist');
    });
    //Assignment 3 Test case 2
    it('Should be able to cancel issue deletion', () => {
        cy.get(issueDetailsModal).should('be.visible').within(() => {
            cy.get(trashIcon).should('be.visible').click();
        });
        cy.get(confirmModal).should('be.visible').within(() => {
            cy.get('button').contains('Cancel').should('be.visible').click();
        });

        cy.get(confirmModal).should('not.exist');
        cy.get(issueDetailsModal).should('be.visible');

        cy.get(backlogList).contains('This is an issue of type: Task.').should('be.visible');
    });
});

describe("Issue comments creating, editing and deleting", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.url()
            .should("eq", `${Cypress.env("baseUrl")}project/board`)
            .then((url) => {
                cy.visit(url + "/board");
                cy.contains("This is an issue of type: Task.").click();
            });
    });

    const getIssueDetailsModal = () =>
        cy.get('[data-testid="modal:issue-details"]');

    it("Should create, edit, and delete a comment successfully", () => {
        const initialComment = "TEST_COMMENT";
        const editedComment = "TEST_COMMENT_EDITED";

        // Create a comment
        getIssueDetailsModal().within(() => {
            cy.contains("Add a comment...").click();

            cy.get('textarea[placeholder="Add a comment..."]').type(initialComment);

            cy.contains("button", "Save").click().should("not.exist");

            cy.contains("Add a comment...").should("exist");
            cy.get('[data-testid="issue-comment"]').should("contain", initialComment);
        });

        // Edit the comment
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .within(() => {
                    cy.contains("Edit").click().should("not.exist");
                });

            cy.get('textarea[placeholder="Add a comment..."]')
                .should("have.value", initialComment)
                .clear()
                .type(editedComment);

            cy.contains("button", "Save").click().should("not.exist");

            cy.get('[data-testid="issue-comment"]')
                .should("contain", "Edit")
                .and("contain", editedComment);
        });

        // Delete the comment
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .first()
            .within(() => {
                cy.contains("Delete").click();
            });

        cy.get('[data-testid="modal:confirm"]')
            .contains("button", "Delete comment")
            .click();
        cy.contains(editedComment).should("not.exist");
    });
});



const siteUrl = "https://jira.ivorreic.com/";
const issueSelector = '[data-testid="list-issue"]';
const timeInputField = '[placeholder="Number"]';
const timeDisplayClass = ".sc-rBLzX.irwmBe";

describe("Time Estimation Tests", () => {
    // Run before each test
    beforeEach(() => {
        // Visit the specified URL
        cy.visit(siteUrl);
        // Click on the first issue in the list
        cy.get(issueSelector).eq(0).click();
    });

    it("Add, Update, and Remove Time Estimation", () => {
        cy.get(timeInputField)
            .clear()
            .type("4")
            .should("have.value", "4");
        cy.get(timeDisplayClass).should("contain.text", "4");
        cy.get(timeInputField)
            .clear()
            .type("3")
            .should("have.value", "3");
        cy.get(timeDisplayClass).should("contain.text", "3");
        cy.get(timeInputField)
            .clear()
            .should("have.value", "");
        cy.get(timeDisplayClass).should("not.contain.text", "3");
        cy.wait(60000)
    });
});

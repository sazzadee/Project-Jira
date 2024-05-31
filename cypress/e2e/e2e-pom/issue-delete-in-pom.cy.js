import IssueModal from "../../pages/IssueModal";

describe("Issue delete", () => {
  const issueTitle = "This is an issue of type: Task.";

  const openIssueDetailModal = (title) => {
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`);
    cy.contains(title).click();
  };

  beforeEach(() => {
    openIssueDetailModal(issueTitle);
  });
  //Assignment Steps: 1
  it("Should delete issue successfully", () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });
  //Assignment Steps: 2
  it("Should cancel deletion process successfully", () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});

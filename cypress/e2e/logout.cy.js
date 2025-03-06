describe("Logout", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  // TODO: this doesn't work we don't want the tests if user is already logged out
  // beforeEach(() => {
  //   cy.url().then((currentUrl) => {
  //     if (!currentUrl.includes("/auth/login")) {
  //       cy.onlyOn(true);
  //     } else {
  //       cy.onlyOn(false);
  //     }
  //   });
  // });

  it("Handle logout if user is logged In", () => {
    cy.get("[data-cy='user-nav-button']").should("exist");
    cy.get("[data-cy='user-nav-button']").click();

    cy.contains("Log out").should("exist");
    cy.contains("Log out").click();

    cy.url().should("include", "/auth/login");
  });
});

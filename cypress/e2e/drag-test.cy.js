describe("Task Drag and drop functionality", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it("Redirection to project screen", () => {
    // click the first project
    cy.get('[data-cy="project-card"]').first().click();

    // TODO: need to check fo poject/[some-id] need regex for that may be something like /\/project\/[\w-]+/
    // ensuring url has updated
    cy.url().should("include", "/project");
  });

  it("should move the first task from one list to another", () => {
    // select the first task
    cy.get("[data-cy='single-task']").first().as("task");

    // select the second list
    cy.get("[data-cy='single-list']").eq(1).as("targetList");

    // drag the task to the target list
    cy.get("@task").drag("@targetList");

    // verify
    cy.get("@targetList").contains("Task").should("exist");
  });
});

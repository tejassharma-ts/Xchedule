describe("Task Popup", () => {
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

  it("Show form for adding list", () => {
    cy.get("[data-cy='add-new-list-button']").as("newListButton").should("exist");

    cy.get("@newListButton").click();
  });

  it("Validates required list name field", () => {
    cy.get("button[type='submit']").click();

    cy.contains("List name is required").should("exist");
  });

  it("Successfully adds a list", () => {
    cy.get("input[placeholder='Enter list name...']").type("My Task List");
    cy.get("button[type='submit']").click();

    cy.contains("My Task List").should("exist");
  });
});

describe("Add Task", () => {
  it("Add Task to list", () => {
    cy.contains("Add Task").click();

    cy.get("[data-cy='task-input']").type("TODO");
    cy.get("[data-cy='task-submit']").click();

    cy.contains("TODO").should("exist");
  });
});

describe("Task Popup", () => {
  it("show task popup", () => {
    cy.contains("TODO").should("exist");
    cy.contains("TODO").click();
  });

  it("Validate task form schema", () => {
    cy.contains("Save Task").click();

    cy.get("[data-cy='task-title-input']").clear().type("Updating the task");
    cy.get("[data-cy='task-desc']").clear().type("Updating the description");
    cy.get("[data-cy='task-submit-btn']").click();
  });
});

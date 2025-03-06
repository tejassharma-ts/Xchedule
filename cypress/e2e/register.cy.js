describe("Registration Flow", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.visit(`${Cypress.config("baseUrl")}auth/register`);
  });

  beforeEach(() => {
    cy.get('[data-cy="name-input"]').as("nameInput").should("be.visible");
    cy.get('[data-cy="email-input"]').as("emailInput").should("be.visible");
    cy.get('[data-cy="password-input"]').as("passwordInput").should("be.visible");
    cy.get('[data-cy="signup-button"]').as("signUpButton");
  });

  const messages = {
    invalidEmail: "Invalid email address",
    shortPassword: "Password must be at least 6 characters",
    shortName: "Should be more than 2 characters",
    invalidCredentials: "Invalid credentials!",
    registrationSuccess: "Registration successful!",
  };

  it("Validates registration fields", () => {
    cy.get("@nameInput").type("h");
    cy.get("@emailInput").type("invalid-email");
    cy.get("@passwordInput").type("cos");
    cy.get("@signUpButton").click();

    cy.contains(messages.shortName).should("be.visible");
    cy.contains(messages.invalidEmail).should("be.visible");
    cy.contains(messages.shortPassword).should("be.visible");
    cy.get("@signUpButton").click();
  });

  it("Registers a user successfully", () => {
    cy.get("@nameInput").clear().type("verissimus");
    cy.get("@emailInput").clear().type("verissimus@gmail.com");
    cy.get("@passwordInput").clear().type("cosmonaut");

    cy.get("@signUpButton").click();
    cy.contains(messages.registrationSuccess).should("be.visible");

    cy.url().should("equal", Cypress.config("baseUrl"));
  });
});

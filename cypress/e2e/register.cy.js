describe("Registration Flow", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.visit(`${Cypress.config("baseUrl")}auth/register`);
  });

  beforeEach(() => {
    cy.get('[data-cy="name-input"]').as("nameInput").should("exist");
    cy.get('[data-cy="email-input"]').as("emailInput").should("exist");
    cy.get('[data-cy="password-input"]').as("passwordInput").should("exist");
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

    cy.contains(messages.shortName).should("exist");
    cy.contains(messages.invalidEmail).should("exist");
    cy.contains(messages.shortPassword).should("exist");
    cy.get("@signUpButton").click();
  });

  it("Registers a user successfully", () => {
    cy.get("@nameInput").clear().type("verissimus");
    cy.get("@emailInput").clear().type("verissimus@gmail.com");
    cy.get("@passwordInput").clear().type("cosmonaut");

    cy.get("@signUpButton").click();
    cy.contains(messages.registrationSuccess).should("exist");

    cy.url().should("equal", Cypress.config("baseUrl"));
  });
});

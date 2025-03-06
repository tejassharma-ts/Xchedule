import "cypress-localstorage-commands";

describe("Authentication", () => {
  before(() => {
    cy.visit(`${Cypress.config("baseUrl")}auth/login`);
  });

  const messages = {
    invalidEmail: "Invalid email address",
    shortPassword: "Password must be at least 6 characters",
    shortName: "Should be more than 2 characters",
    invalidCredentials: "Invalid credentials!",
    registrationSuccess: "Registration successful!",
  };

  describe("Sign In", () => {
    beforeEach(() => {
      cy.get('[data-cy="email-input"]').as("emailInput").should("exist");
      cy.get('[data-cy="password-input"]').as("passwordInput").should("exist");
      cy.get('[data-cy="login-button"]').as("loginButton");
    });

    it("Validates email and password input fields", () => {
      // Invalid values
      cy.get("@emailInput").type("invalid-email");
      cy.get("@passwordInput").type("cos");
      cy.get("@loginButton").click();

      cy.contains(messages.invalidEmail).should("exist");
      cy.contains(messages.shortPassword).should("exist");
    });

    it("Rejects login with invalid credentials", () => {
      cy.get("@emailInput").clear().type("user@example.com");
      cy.get("@passwordInput").clear().type("cosmonaut");
      cy.get("@loginButton").click();

      cy.contains(messages.invalidCredentials).should("exist");
    });

    it("Success with regsited user", () => {
      cy.get("@emailInput").clear().type("verissimus@gmail.com");
      cy.get("@passwordInput").clear().type("cosmonaut");
      cy.get("@loginButton").click();

      cy.contains(messages.invalidCredentials).should("exist");
    });
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});

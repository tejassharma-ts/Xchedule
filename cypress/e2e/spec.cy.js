describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/auth/login");
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
      cy.get('[data-cy="email-input"]').as("emailInput").should("be.visible");
      cy.get('[data-cy="password-input"]').as("passwordInput").should("be.visible");
      cy.get('[data-cy="login-button"]').as("loginButton");
    });
    it("Validates email and password input fields", () => {
      // Invalid values
      cy.get("@emailInput").type("invalid-email");
      cy.get("@passwordInput").type("cos");
      cy.get("@loginButton").click();

      cy.contains(messages.invalidEmail).should("be.visible");
      cy.contains(messages.shortPassword).should("be.visible");
    });

    it("Rejects login with invalid credentials", () => {
      cy.get("@emailInput").clear().type("user@example.com");
      cy.get("@passwordInput").clear().type("cosmonaut");
      cy.get("@loginButton").click();

      cy.contains(messages.invalidCredentials).should("be.visible");
    });
  });

  describe("Registration", () => {
    beforeEach(() => {
      cy.get('[data-cy="register-button"]').as("registerButton").click();
      cy.url().should("include", "/auth/register");

      cy.get('[data-cy="name-input"]').as("nameInput").should("be.visible");
      cy.get('[data-cy="email-input"]').as("emailInput").should("be.visible");
      cy.get('[data-cy="password-input"]').as("passwordInput").should("be.visible");
      cy.get('[data-cy="signup-button"]').as("signUpButton");
    });

    it("Validates registration fields", () => {
      cy.get("@nameInput").type("h");
      cy.get("@emailInput").type("invalid-email");
      cy.get("@passwordInput").type("cos");
      cy.get("@signUpButton").click();

      cy.contains(messages.shortName).should("be.visible");
      cy.contains(messages.invalidEmail).should("be.visible");
      cy.contains(messages.shortPassword).should("be.visible");
    });

    it("Registers a user successfully", () => {
      cy.get("@nameInput").clear().type("Verissimus");
      cy.get("@emailInput").clear().type("user@example.com");
      cy.get("@passwordInput").clear().type("cosmonaut");

      cy.get("@signUpButton").click();
      cy.contains(messages.registrationSuccess).should("be.visible");

      cy.url().should("include", "/");
    });
  });
});

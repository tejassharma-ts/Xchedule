describe("Project creation", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  describe("Project", () => {
    it("Add project button should be present and modal should get open", () => {
      cy.get('[data-cy="project-add-button"]').as("projectCreationButton").should("be.visible");

      cy.wait(200);
      cy.get("@projectCreationButton").first().click();
    });

    it("Shows validation errors for empty fields", () => {
      cy.get("button[type='submit']").click();

      cy.contains("Title must be at least 3 characters").should("be.visible");
      cy.contains("Description must be at least 5 characters").should("be.visible");
      cy.contains("Enter a valid image URL").should("be.visible");
    });

    it("Validates title length", () => {
      cy.get("input[name='title']").type("ab");
      cy.get("button[type='submit']").click();
      cy.contains("Title must be at least 3 characters").should("be.visible");
    });

    it("Validates description length", () => {
      cy.get("textarea[name='desc']").type("1234");
      cy.get("button[type='submit']").click();
      cy.contains("Description must be at least 5 characters").should("be.visible");
    });

    it("Validates invalid image URL", () => {
      cy.get("input[name='coverImage']").type("invalid-url");
      cy.get("button[type='submit']").click();
      cy.contains("Enter a valid image URL").should("be.visible");
    });

    it("Submits successfully with valid data", () => {
      cy.get("input[name='title']").clear().type("AI-Powered Chatbot");
      cy.get("textarea[name='desc']")
        .clear()
        .type(
          "An AI-driven chatbot that helps users with customer support queries in real-time using NLP and machine learning.",
        );

      cy.get("input[name='coverImage']")
        .clear()
        .type("https://w.wallhaven.cc/full/md/wallhaven-md8p11.jpg");

      cy.wait(1000);

      cy.get("button[type='submit']").click();

      cy.contains("Project created successfully!").should("be.visible");
    });
  });
});

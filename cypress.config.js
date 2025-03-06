import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    // specPattern: ["./cypress/e2e/register.cy.js", "./cypress/e2e/project-creation.cy.js"],
    // thanks to https://stackoverflow.com/a/74762655/29909289
    testIsolation: false,
  },
});

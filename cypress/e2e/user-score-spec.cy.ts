// @ts-nocheck
describe("user-score stub", () => {
  beforeEach(() => {
    cy.intercept("https://random-data-api.com/api/users/random_user?size=3", {
      fixture: "random_user.json",
    }).as("getUsers");

    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4173/");
  });

  it("Users' list render", () => {
    cy.log("Pass main page");
    cy.wait("@getUsers");
    cy.wait(1000);
    cy.get('[data-cy*="username-4912"]').should('have.text', "mauro.legros");
    cy.get('[data-cy*="username-2761"]').should('have.text', "tyson.waters");
    cy.get('[data-cy*="username-7608"]').should('have.text', "fermin.teller");

  });
});

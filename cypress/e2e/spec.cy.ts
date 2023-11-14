describe("Search Flow normal", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.visit("http://localhost:5173/");
  });
  it("Should able to show initial deliver form", () => {
    cy.contains("h1", "BUSINESS TALE");
  });

  it("Should able to fill finish order", () => {
    // FILL FORM DELIVERY
    cy.get('input[placeholder*="Search Location"]').type("new york");

    cy.contains("button", "Search").click();

    cy.get(".card").should("have.length.be.gt", 0);
  });
});

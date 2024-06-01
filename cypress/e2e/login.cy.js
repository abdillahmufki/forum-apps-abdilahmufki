/**
 * -  spec
 *   - should display  page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signin"); // Pastikan URL login diakses sebelum setiap tes
  });

  it("should display login page correctly", () => {
    // Pastikan halaman login ditampilkan dengan benar
    cy.contains("Email").should("be.visible");
    cy.contains("Password").should("be.visible");
    cy.get("button[type='submit']")
      .should("be.visible")
      .and("contain", "Sign In");
  });

  it("should display alert when username is empty", () => {
    // Pastikan peringatan muncul saat email kosong
    cy.get("input[name='password']").type("somepassword");
    cy.get("button[type='submit']").click();
    cy.contains("Please enter your email").should("be.visible");
  });

  it("should display alert when password is empty", () => {
    // Pastikan peringatan muncul saat password kosong
    cy.get("input[name='email']").type("someemail@example.com");
    cy.get("button[type='submit']").click();
    cy.contains("Please enter your password").should("be.visible");
  });

  it("should display alert when username and password are wrong", () => {
    // Pastikan peringatan muncul saat email dan password salah
    cy.get("input[name='email']").type("wrongemail@example.com");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid email or password").should("be.visible");
  });

  it("should display homepage when username and password are correct", () => {
    // Pastikan halaman beranda ditampilkan saat email dan password benar
    cy.get("input[name='email']").type("asepsss@gmail.com");
    cy.get("input[name='password']").type("hangcdx123");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/");
  });
});

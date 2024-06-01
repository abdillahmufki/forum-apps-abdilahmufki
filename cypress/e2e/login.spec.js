describe("Login Page", () => {
  it("should display login form", () => {
    cy.visit("/login"); // Buka halaman login
    cy.contains("Login Form"); // Pastikan form login ditampilkan
  });

  it("should login with valid credentials", () => {
    cy.visit("/login"); // Buka halaman login
    cy.get('input[name="username"]').type("user123"); // Isi input username
    cy.get('input[name="password"]').type("password123"); // Isi input password
    cy.get('button[type="submit"]').click(); // Klik tombol submit
    cy.url().should("include", "/dashboard"); // Pastikan pengguna diarahkan ke halaman dashboard setelah login
  });

  it("should show error message for invalid credentials", () => {
    cy.visit("http://localhost:5173/signin"); // Buka halaman login
    cy.get('input[name="username"]').type("invaliduser"); // Isi input username dengan kredensial yang tidak valid
    cy.get('input[name="password"]').type("invalidpassword"); // Isi input password dengan kredensial yang tidak valid
    cy.get('button[type="submit"]').click(); // Klik tombol submit
    cy.contains("Invalid username or password"); // Pastikan pesan kesalahan ditampilkan
    cy.url().should("include", "/login"); // Pastikan pengguna tetap berada di halaman login
  });
});

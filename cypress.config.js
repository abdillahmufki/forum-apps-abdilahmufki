import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "gzn289",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
  },
});

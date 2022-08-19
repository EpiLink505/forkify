const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'moqpf3',
  trashAssetsBeforeRuns: true,
  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});

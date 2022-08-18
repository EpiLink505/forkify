describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://ppham-forkify.netlify.app/');
    cy.get('.search__field').type('Cake');
    cy.contains('Search').click();
    cy.contains('Jello Dream Cake').click();
    cy.get('.recipe__title').should('contain', 'Jello Dream Cake (Poke Cake)');
  });
});

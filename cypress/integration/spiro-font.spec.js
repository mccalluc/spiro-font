describe('spirografont', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4000/spirografont/')
  })

  it('works', () => {
    cy.contains('Like a spirograph, for fonts')
    cy.contains('Seven Segment').click()
    cy.contains('can be found in patents as early as 1903')
    
    // <details> visibility not handled.
    // https://github.com/cypress-io/cypress/issues/20706
    cy.contains('Getting started').closest('details').should('not.have.attr', 'open')
    cy.contains('Getting started').click()
    cy.contains('Getting started').closest('details').should('have.attr', 'open')
    cy.contains('Getting started').click()

    cy.contains('0123456789')

    cy.get('#shrink').type('{backspace}{backspace}0')
    cy.get('#grow').type('{backspace}{backspace}0')
    cy.get('#bevel').type('{backspace}{backspace}0')

    cy.get('select').select('A')
  })
})

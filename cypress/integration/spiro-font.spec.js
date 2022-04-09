describe('spiro-font', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4000/spiro-font/')
  })

  it('works', () => {
    cy.contains('Like a spirograph, for fonts')
    cy.contains('Seven Segment').click()
    cy.contains('can be found in patents as early as 1903')
    
    // <details> visibility not handled.
    // https://github.com/cypress-io/cypress/issues/20706
    cy.contains('Get started').closest('details').should('not.have.attr', 'open')
    cy.contains('Get started').click()
    cy.contains('Get started').closest('details').should('have.attr', 'open')
    cy.contains('Get started').click()

    cy.contains('0123456789')

    cy.get('#input-shrink').type('{backspace}{backspace}0')
    cy.get('#input-grow').type('{backspace}{backspace}0')
    cy.get('#input-bevel').type('{backspace}{backspace}0')

    cy.get('select').select('A')
  })
})

describe('spiro-font', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4000/spiro-font/')
  })

  it('works', () => {
    /* Home page */

    cy.contains('Like a spirograph, for fonts')

    cy.get('tr').should('have.length', 6) // Includes header

    // Checkmark logic in Jekyll template:
    cy.contains('Sharp EL-8')
      .closest('tr').find('td:contains("✓")').should('have.length', 1)
    cy.contains('Sixteen Segment')
      .closest('tr').find('td:contains("✓")').should('have.length', 4)

    cy.contains('Seven Segment').click()

    /* Font page */

    cy.contains('can be found in patents as early as 1903')
    
    cy.get('#input-shrink').should('have.value', 8)
    cy.get('#input-grow').should('have.value', 11)
    cy.url().should('not.contain', 'grow=11')

    cy.contains('rectangles').click()

    /* Alternate version of font */

    // Input values should have changed from above:
    cy.get('#input-shrink').should('have.value', 0)
    cy.get('#input-grow').should('have.value', 0) 
    cy.url().should('contain', 'grow=0') 

    // <details> visibility not handled.
    // https://github.com/cypress-io/cypress/issues/20706
    cy.contains('Get started').closest('details').should('not.have.attr', 'open')
    cy.contains('Get started').click()
    cy.contains('Get started').closest('details').should('have.attr', 'open')
    cy.contains('Get started').click()

    // Sample text
    cy.contains('0123456789')

    cy.get('#input-grow').type('{backspace}1')
    cy.url().should('contain', 'grow=1')

    cy.get('select').select('A')

    // TODO: Test the stencil
  })
})

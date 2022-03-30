describe('spiro-font', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4000/spiro-font/')
  })

  it('works', () => {
    cy.contains('Like a spirograph, for fonts')
    cy.contains('Seven Segment').click()
    cy.contains('can be found in patents as early as 1903')
    
    
  })
})

describe('template spec', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'localhost:3003/api/users',{
      "username": "username",
      "name": "name",
      "password": "hello"
    })
    cy.request('POST', 'localhost:3003/api/users',{
      "username": "username2",
      "name": "name",
      "password": "hello"
    })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials login, post, like, and delete', function () {

      cy.get('#username').type('username')
      cy.get('#password').type('hello')
      cy.get('#login').click()
      cy.contains('username is logged in')
      cy.contains('create new').click()
      cy.get('#inputText').type('text')
      cy.get('#inputAuthor').type('author')
      cy.get('#inputUrl').type('url')
      cy.get('#inputSubmit').click()
      cy.contains('Added New Post')
      cy.reload()
      cy.contains('Show').click()
      cy.get('#like').click()
      cy.get('#remove').click()
      cy.on('window:confirm', () => {return true;});
      cy.reload()
      cy.contains('Show').should('not.exist');
    })

    it('succeeds with correct credentials and sort by like', function () {

      cy.get('#username').type('username')
      cy.get('#password').type('hello')
      cy.get('#login').click()
      cy.contains('username is logged in')
      cy.contains('create new').click()
      cy.get('#inputText').type('text')
      cy.get('#inputAuthor').type('author')
      cy.get('#inputUrl').type('url')
      cy.get('#inputSubmit').click()
      // cy.contains('Added New Post')
      // cy.reload()
      cy.get('#inputText').type('textTop')
      cy.get('#inputAuthor').type('authorTop')
      cy.get('#inputUrl').type('urlTop')
      cy.get('#inputSubmit').click()
      cy.contains('Added New Post')
      cy.reload()
      cy.get('button:contains("Show")').eq(0).click()
      cy.get('button:contains("Show")').eq(1).click()

      cy.get('button[id="like"]').eq(0).click();
      cy.get('button[id="like"]').eq(1).click();
      cy.get('button[id="like"]').eq(1).click();

      cy.reload()
      cy.get('button:contains("Show")').eq(0).click()
      cy.get('button:contains("Show")').eq(1).click()
      cy.get('.blogList').eq(0).should('contain', 'urlurlTop')
    })

    it('succeeds with correct credentials and checks for other user blog', function () {

      cy.get('#username').type('username')
      cy.get('#password').type('hello')
      cy.get('#login').click()
      cy.contains('username is logged in')
      cy.contains('create new').click()
      cy.get('#inputText').type('text')
      cy.get('#inputAuthor').type('author')
      cy.get('#inputUrl').type('url')
      cy.get('#inputSubmit').click()
      cy.contains('Added New Post')
      cy.reload()
      cy.contains('Show').click()
      cy.contains('log out').click()
      cy.get('#username').type('username2')
      cy.get('#password').type('hello')
      cy.contains('Show').should('not.exist');
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('username2')
      cy.get('#password').type('hello2')
      cy.get('#login').click()
      cy.contains('Wrong Username and Password')
    })

  })
})

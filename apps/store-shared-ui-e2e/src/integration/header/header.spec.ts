describe('store-shared-ui: Header component', () => {
  // feature of storybook, that allows to serve a single component
  // title - is passed as a query param
  beforeEach(() => cy.visit('/iframe.html?id=header--primary&args=title=Game Store;'));

    it('should render the component', () => {
      cy.get('.MuiTypography-root').should('contain', 'Game Store');
    });
});

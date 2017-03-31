import { AngularCliBootstrapPage } from './app.po';

describe('angular-cli-bootstrap App', () => {
  let page: AngularCliBootstrapPage;

  beforeEach(() => {
    page = new AngularCliBootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

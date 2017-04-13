import { TheatherBookPage } from './app.po';

describe('theather-book App', () => {
  let page: TheatherBookPage;

  beforeEach(() => {
    page = new TheatherBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

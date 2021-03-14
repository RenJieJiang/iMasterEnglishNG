import { iMasterEnglishNGTemplatePage } from './app.po';

describe('iMasterEnglishNG App', function() {
  let page: iMasterEnglishNGTemplatePage;

  beforeEach(() => {
    page = new iMasterEnglishNGTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { CsvImporterAngularPage } from './app.po';

describe('csv-importer-angular App', () => {
  let page: CsvImporterAngularPage;

  beforeEach(() => {
    page = new CsvImporterAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { TimeTablePage } from './app.po';

describe('time-table App', function() {
  let page: TimeTablePage;

  beforeEach(() => {
    page = new TimeTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tt works!');
  });
});

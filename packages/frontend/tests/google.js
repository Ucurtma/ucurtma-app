import { Selector } from 'testcafe';

fixture`Test fixture`.page`${process.env.BASE_URL}`;

test('Take a screenshot google.com', async t => {
  await t.takeScreenshot('test-google.png');
});

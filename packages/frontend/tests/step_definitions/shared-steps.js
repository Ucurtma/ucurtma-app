const { Given, When, Then } = require('cucumber');
const { getLocation } = require('../pages/helpers');

Given('an anonymous student', async () => {});

When(/^I visit "(.+)"$/, async (t, [page]) => {
  await t.navigateTo(`${process.env.BASE_URL}${page}`);
});

Then(/^I should be redirected to "(.+)"$/, async (t, [redirectedPage]) => {
  await t.expect(getLocation()).contains(redirectedPage);
});

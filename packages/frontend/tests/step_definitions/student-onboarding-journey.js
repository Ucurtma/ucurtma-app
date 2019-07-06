const { When, Then } = require('cucumber');
const { homepage } = require('../pages/homepage');
const { createJourneyPage } = require('../pages/create-journey');

Then('I should see the Create Journey button', async t => {
  const createJourneyButton = homepage.getCreateJourneyButton(t);
  await t.expect(createJourneyButton.visible).ok();
});

When('I click Create Journey button', async t => {
  const createJourneyButton = homepage.getCreateJourneyButton(t);
  await t.click(createJourneyButton);
});

Then('I should see the continue button', async t => {
  const continueButton = createJourneyPage.getIntroductionStepContinueButton(t);
  await t.expect(continueButton.visible).ok();
});

When('I click the continue button', async t => {
  const continueButton = createJourneyPage.getIntroductionStepContinueButton(t);
  await t.click(continueButton);
});

Then(/^I should see the "(.+)" journey step$/, async (t, [title]) => {
  const stepTitle = createJourneyPage.getJourneyStepTitle(t);
  await t.expect(stepTitle.textContent).contains(title);
});

When('I fill the form correctly', async t => {
  await createJourneyPage.fillNameField('Macaulay Culkin', t);
  await createJourneyPage.fillEmailField('macaulay@homealone.com', t);
  await createJourneyPage.fillPasswordField('keepthehomesafe', t);
  await createJourneyPage.fillConfirmPasswordField('keepthehomesafe', t);
});

When('I click Signup button', async t => {
  await createJourneyPage.clickSignUpButton(t);
});

When('I upload a file to second dropbox', async t => {
  const fileUploadField = createJourneyPage.getFileUploadField(t);
  await t.setFilesToUpload(fileUploadField, '../stubs/dummy.png');
});

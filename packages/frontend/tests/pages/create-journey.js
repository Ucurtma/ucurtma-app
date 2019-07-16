const { Selector } = require('../pages/helpers');

class CreateJourneyPage {
  constructor() {
    this.selector = Selector;
  }

  getIntroductionStepContinueButton(t) {
    return this.selector('.uc-onboarding-step1-continue-btn', t);
  }

  getJourneyStepTitle(t) {
    return this.selector('.uc-onboarding-journey-step-title', t);
  }

  getFileUploadField(t) {
    return this.selector('.drop-box', t).find('input');
  }

  async fillNameField(text, t) {
    const nameField = this.selector('[name="name"]', t);
    await t.typeText(nameField, text);
  }

  async fillSurnameField(text, t) {
    const surnameField = this.selector('[name="surname"]', t);
    await t.typeText(surnameField, text);
  }

  async fillEmailField(text, t) {
    const emailField = this.selector('[name="email"]', t);
    await t.typeText(emailField, text);
  }

  async fillPasswordField(text, t) {
    const passwordField = this.selector('[name="password"]', t);
    await t.typeText(passwordField, text);
  }

  async fillConfirmPasswordField(text, t) {
    const passwordConfirmationField = this.selector(
      '[name="passwordConfirmation"]',
      t
    );
    await t.typeText(passwordConfirmationField, text);
  }

  async clickSignUpButton(t) {
    const signupButton = this.selector('.uc-onboarding-signup-button', t);
    await t.click(signupButton);
  }
}

module.exports = {
  createJourneyPage: new CreateJourneyPage(),
};

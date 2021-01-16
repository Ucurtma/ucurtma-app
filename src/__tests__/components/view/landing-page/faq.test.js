/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '../../../../utils/test-utils';
import langEN from '../../../../intl/en-US.json';
import Faq from '../../../../components/view/landing-page/faq';
import questions from '../../../../components/view/landing-page/faq.json';

describe('FAQ tests', () => {
  test('User should see question and answer when click question', () => {
    const { getByText } = render(<Faq />);
    const supporterLabel = getByText(langEN.faq['I am supporter']);
    const studentQuestion = getByText(
      langEN.faq.questions[questions.studentQuestions[0]].question
    );
    const studentAnswer = getByText(
      langEN.faq.questions[questions.studentQuestions[0]].answer
    );

    expect(studentQuestion).toBeInTheDocument();
    expect(studentAnswer.getAttribute('aria-expanded')).toBeFalsy();

    fireEvent.click(supporterLabel);
    const supporterQuestion = getByText(
      langEN.faq.questions[questions.donatorQuestions[1]].question
    );
    expect(supporterQuestion).toBeInTheDocument();
  });
});

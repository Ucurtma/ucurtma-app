/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '../../../../utils/test-utils';
import langEN from '../../../../intl/en-US.json';
import Faq from '../../../../components/view/landing-page/faq';
import questions from '../../../../components/view/landing-page/faq.json';

describe('FAQ tests', () => {
  test('FAQ should be rendered', () => {
    const { container } = render(<Faq />);
    const wrapperEl = container.querySelector('#faq');
    expect(wrapperEl).toBeInTheDocument();
  });

  test('"Student" should be activated faqType by default and user can change it', () => {
    const { getByText } = render(<Faq />); // render faq
    const supporterLabel = getByText(langEN.faq['I am supporter']);
    const studentLabel = getByText(langEN.faq['I am student']);
    expect(studentLabel.getAttribute('aria-checked')).toBeTruthy();
    expect(supporterLabel.getAttribute('aria-checked')).toEqual('false');

    fireEvent.click(supporterLabel);
    expect(supporterLabel.getAttribute('aria-checked')).toBeTruthy();
    expect(studentLabel.getAttribute('aria-checked')).toEqual('false');
  });

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
    expect(studentAnswer.getAttribute('aria-hidden')).toBeTruthy();

    fireEvent.click(studentQuestion);
    expect(studentAnswer.getAttribute('aria-hidden')).toEqual('false');

    fireEvent.click(supporterLabel);
    const supporterQuestion = getByText(
      langEN.faq.questions[questions.donatorQuestions[1]].question
    );
    const supporterAnswer = getByText(
      langEN.faq.questions[questions.donatorQuestions[1]].answer
    );
    expect(supporterQuestion).toBeInTheDocument();

    fireEvent.click(supporterQuestion);
    expect(supporterAnswer.getAttribute('aria-hidden')).toEqual('false');
  });
});

/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '../../../../utils/test-utils';
import langTR from '../../../../intl/tr-TR.json';
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
    const supporterLabel = getByText(langTR.faq['I am supporter']);
    const studentLabel = getByText(langTR.faq['I am student']);
    expect(studentLabel.getAttribute('aria-checked')).toBeTruthy();
    expect(supporterLabel.getAttribute('aria-checked')).toEqual('false');

    fireEvent.click(supporterLabel);
    expect(supporterLabel.getAttribute('aria-checked')).toBeTruthy();
    expect(studentLabel.getAttribute('aria-checked')).toEqual('false');
  });

  test('User should see question and answer when click question', () => {
    const { getByText } = render(<Faq />);
    const supporterLabel = getByText(langTR.faq['I am supporter']);
    const studentQuestion = getByText(questions.studentQuestions[0].question);
    const studentAnswer = getByText(questions.studentQuestions[0].answer);

    expect(studentQuestion).toBeInTheDocument();
    expect(studentAnswer.getAttribute('aria-hidden')).toBeTruthy();

    fireEvent.click(studentQuestion);
    expect(studentAnswer.getAttribute('aria-hidden')).toEqual('false');

    fireEvent.click(supporterLabel);
    const supporterQuestion = getByText(questions.donatorQuestions[1].question);
    const supporterAnswer = getByText(questions.donatorQuestions[1].answer);
    expect(supporterQuestion).toBeInTheDocument();

    fireEvent.click(supporterQuestion);
    expect(supporterAnswer.getAttribute('aria-hidden')).toEqual('false');
  });
});

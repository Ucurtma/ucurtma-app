import i18n from '../i18n';

describe('i18n tests', () => {
  test('lowercase interpolation should works correct', () => {
    const stringWithUppercase = 'I AM A TEST STRING';
    const providedResource = i18n.t('{{value, lowercase}}', {
      value: stringWithUppercase,
    });

    expect(providedResource).toEqual(stringWithUppercase.toLowerCase());
  });
});

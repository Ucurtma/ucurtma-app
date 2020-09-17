import i18n from '../i18n';
import tr from '../intl/tr-TR.json';
import en from '../intl/en-US.json';

function objectDeepKeys(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key]).map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj));
}

describe('i18n tests', () => {
  test('lowercase interpolation should works correct', () => {
    const stringWithUppercase = 'I AM A TEST STRING';
    const providedResource = i18n.t('{{value, lowercase}}', {
      value: stringWithUppercase,
    });

    expect(providedResource).toEqual(stringWithUppercase.toLowerCase());
  });

  test('TR resource keys should be equal to EN resource', () => {
    expect(objectDeepKeys(tr)).toEqual(objectDeepKeys(en));
  });
});

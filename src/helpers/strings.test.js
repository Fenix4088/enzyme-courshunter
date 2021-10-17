import stringModule from './strings';

const { getStringByLanguage } = stringModule;

describe('getStringByLanguage', () => {

  const strings = {
    en: { submit: 'submit' },
    emoji: { submit: '🚀' },
    mermish: {},
  };
  const SUBMIT = 'submit';

  it('should returns correct submit for english', () => {
    const string = getStringByLanguage('en', SUBMIT, strings);

    expect(string).toBe('submit');
  });
  it('should returns correct submit for emoji', () => {
    const string = getStringByLanguage('emoji', SUBMIT, strings);

    expect(string).toBe('🚀');
  });
  it('should returns english submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', SUBMIT, strings);

    expect(string).toBe('submit');
  });
  it('should returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', SUBMIT, strings);

    expect(string).toBe('submit');
  });
});
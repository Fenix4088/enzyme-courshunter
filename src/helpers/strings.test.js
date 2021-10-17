import stringModule from './strings';

const { getStringByLanguage } = stringModule;

describe('getStringByLanguage', () => {
  const mockWarn = jest.fn();
  let originalWarn;

  const strings = {
    en: { submit: 'submit' },
    emoji: { submit: '🚀' },
    mermish: {},
  };
  const SUBMIT = 'submit';

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  })

  it('should returns correct submit for english', () => {
    const string = getStringByLanguage('en', SUBMIT, strings);

    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });
  it('should returns correct submit for emoji', () => {
    const string = getStringByLanguage('emoji', SUBMIT, strings);

    expect(string).toBe('🚀');
    expect(mockWarn).not.toHaveBeenCalled();
  });
  it('should returns english submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', SUBMIT, strings);

    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledTimes(1);
  });
  it('should returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', SUBMIT, strings);

    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledTimes(1);
  });
});

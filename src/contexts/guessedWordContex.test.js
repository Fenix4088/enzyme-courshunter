import React from 'react';
import { GuessedWordsProvider, useGuessedWords } from './guessedWordContex';
import { mount, shallow } from 'enzyme';


export const Component = () => {
    useGuessedWords()
    return (
        <div/>
    )
}

describe(('guessedWordContext'), () => {

  it('should throw error if context not inside the GuessedWordsProvider', () => {
    expect(() => shallow(<Component/>)).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
  });

  it('should NOT throw error if context inside the GuessedWordsProvider', () => {
    expect(() => mount(<GuessedWordsProvider><Component/></GuessedWordsProvider>)).not.toThrow('useGuessedWords must be used within a GuessedWordsProvider');
  });

});
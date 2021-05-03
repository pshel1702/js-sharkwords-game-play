const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = $("#word-container");
  for (const letter of word) {
    wordContainer.append(`<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterButtonContainer = $("#letter-buttons");
  for (const letter of alphabet) {
    letterButtonContainer.append(`<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  $(buttonEl).attr('disabled', true)
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  return $(`div.${letter}`).length > 0
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {

  const letterDiv = $(`div.${letter.innerText}`);
  letterDiv.html(`${letter.innerText}`);
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  if(numWrong === 5){
    $('button').attr('disabled',true);
    $('#play-again').show();
  }else{
    numWrong++;
    $('img').attr('src',`/static/images/guess${numWrong}.png`);
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

const endOfGame = (word) => {

  for (const letter of word){
    const firstLetterDiv = $(`div.${letter}`)[0];
    if (firstLetterDiv.innerHTML !== letter){
      return false;
    }
  }
  return true;
}

const handleWin = () => {
  $('img').attr('src',`/static/images/guess0.png`);
  $('button').attr('disabled',true);
  $('#play-again').html("🎉Yay! You won! Click here to play again!");
  $('#play-again').css('color','green');
  $('#play-again').show();

}

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();
  
  $('button').on('click', (evt)=>{
    const letterGuessed = evt.target;
    disableLetterButton(letterGuessed);
    if(isLetterInWord(letterGuessed.innerText)){
      handleCorrectGuess(letterGuessed);
    }else{
      handleWrongGuess();
    }
    if(endOfGame(word)){
      handleWin();
    }
  });

  $('#play-again').on('click',resetGame);

  // add an event handler to handle clicking on the Play Again button
  // YOUR CODE HERE

})();

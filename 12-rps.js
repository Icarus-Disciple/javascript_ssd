let score = JSON.parse(localStorage.getItem('score')) || {
        Wins: 0,
        Losses: 0,
        Ties: 0
      };

updateScoreElement();

let isAutoPlaying = false;
let intervalId = ``;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(
      () => {playGame(pickComputerMove());},
      2000
    );
    isAutoPlaying = true;
  } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('rock')});
document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('paper')});
document.querySelector('.js-scissors-button').addEventListener('click', () => {playGame('scissors')});

document.querySelector('.js-reset-button').addEventListener('click', () => {
    score.Wins=0;
    score.Losses=0;
    score.Ties=0;
    localStorage.removeItem('score');
    updateScoreElement()
  });

document.querySelector('.js-auto-play-button').addEventListener('click', () => {autoPlay()});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'p') {
    playGame('paper')
  }
});
  
function playGame(choice) {
  const computerMove = pickComputerMove();
  const result = getResult(choice,computerMove,score);

  localStorage.setItem('score',JSON.stringify(score));
  /*alert(`You picked ${choice}. Computer picked ${computerMove}. ${result}\n Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`);*/
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML =  `You: <img src="/images-rps/${choice}-emoji.png" alt="" class="move-icon"> <img src="/images-rps/${computerMove}-emoji.png" alt="" class="move-icon">: Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =  `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber>=0 && randomNumber<(1/3)) {
    return 'rock'
  } else if (randomNumber>=(1/3) && randomNumber<(2/3)) {
    return 'paper'
  } else {return 'scissors'}
  }

function getResult(choice,computerMove,score) {
  if (computerMove === choice) {
    score.Ties++;
    return 'Tie.';
  } else if (choice === 'paper' && computerMove === 'scissors') {
    score.Losses++;
    return 'You lose.';
  } else if (choice === 'paper' && computerMove === 'rock') {
    score.Wins++;
    return 'You win.';
  
  } else if (choice === 'rock' && computerMove === 'paper') {
    score.Losses++;
    return 'You lose.';
    
  } else if (choice === 'rock' && computerMove === 'scissors') {
    score.Wins++;
    return 'You win.';
    
  } else if (choice === 'scissors' && computerMove === 'rock') {
    score.Losses++;
    return 'You lose.';
    
  } else if (choice === 'scissors' && computerMove === 'paper') {
    score.Wins++;
    return 'You win.';
    
  }
}
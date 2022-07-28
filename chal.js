// Variables generale et valeurs premieres 




var roundScore, scores, activePlayer, current, score, gamePlaying, lastdice, but;

init();






// FUNCTION POUR LES CLICS 




function btnR(){
  if(gamePlaying){
    // 1. Random number  

    var dice = [Math.floor(Math.random() * 6) + 1,Math.floor(Math.random() * 6) + 1];
    console.log(dice);
    // 2.display result 

    var dice1DOM = document.querySelector('.dice-1');
    var dice2DOM = document.querySelector('.dice-2');
    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';
    dice1DOM.src = 'img/dice-' + dice[0] + '.png';
    dice2DOM.src = 'img/dice-' + dice[1] + '.png';

    // 3.update the round score IF the rolled number was not a 1

    if (dice[0] === 1 || dice[1] === 1){
      scores[activePlayer] = 0;
      document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    }else if(dice[0] > 1 && dice[1] > 1){

      // add score

      roundScore += dice[0]+dice[1];
      document.querySelector('#current--' + activePlayer).textContent = roundScore;

    }else {
      nextPlayer();
      dice1DOM.style.display = 'none';
      dice2DOM.style.display = 'none';
    }
    
    // lastdice = dice;
  }
}

function btnH(){
  if(gamePlaying){
      
    // add Current score to global score 

    scores[activePlayer] += roundScore;
    
    // update the UI affichage

    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    
    var butfinal = document.querySelector('#but').value;
    
    // En cas ou le Input est vide 
    
    if(butfinal){
      but = butfinal;
    }else{
      but = 100;
    }

    // Check if player win 

    if(scores[activePlayer] >= but){
      gamePlaying = false;
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document.querySelector('.player--' + activePlayer).classList.add('player--winner');
      document.querySelector('.player--' + activePlayer).classList.remove('player--active');
    }else{
      nextPlayer();
    }
  }
}

function btnN(){

  // Reset scores 
  init ();
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

function init (){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  current = document.getElementById('current--' + activePlayer);
  score = document.getElementById('score--' + activePlayer);

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

function nextPlayer (){

  // next player

  if (activePlayer === 0){
    activePlayer = 1;
  }else{
    activePlayer = 0;
  }
  // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
    
}

document.querySelector('.btn--roll').addEventListener('click', btnR);
document.querySelector('.btn--hold').addEventListener('click', btnH);
document.querySelector('.btn--new').addEventListener('click', btnN);
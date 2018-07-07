/*
* App JavaScript file
*/

const explosion = 'images/explosion.png';

let playerImg = 'images/char-horn-girl.png';
let life = [];

//   - .modal-title
let modalTitle = document.getElementById('modalTitle');

//   - .modal-body
let modalMessage = document.getElementById('modalMessage');
let mBody = '';

// Main entity class both Player and Enemy will share
class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  update(dt) {
    this.isOutX = this.x > 5;
    this.isOutY = this.y < 1;
  }

  // Draw the enemies and player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 82);
  }

  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
        return true;
      }
    } else {
      return false;
    }
  }
}

// Our player
class Player extends Entity {
  constructor() {
    super();
    this.sprite = playerImg;
    this.moving = false;
    this.won = false;
  }

  // This class requires an update(), render() and
  // a handleInput() method.
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    super.update();
    if (this.isOutY && !this.moving && !this.won) {
      showModalWindow('won');
      this.won = true;
    }
  }

  render() {
    super.render();
    this.moving = false;
  }

  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'down':
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
    }

    this.moving = true;
  }

  pReset() {
    if (player.won) {
      this.x = 2;
      this.y = 5;
      this.won = false;
    }
  }
}

// Enemies our player must avoid
class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x + Math.floor(Math.random() * (0 - 4 + 1) + 4);
    this.y = y;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    super.update();

    let speed = Math.floor(Math.random() * 15 + 1);
    speed = speed * dt * 0.25;

    if (this.isOutX) {
      this.x = -1;
    } else {
      this.x += speed;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [...Array(3)].map((_, i) => new Enemy(0, i + 1));
// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Select Char image
function selectChar(pick) {
  switch (pick) {
    case 'boy':
      playerImg = 'images/char-boy.png';
      break;
    case 'cat':
      playerImg = 'images/char-cat-girl.png';
      break;
    case 'horn':
      playerImg = 'images/char-horn-girl.png';
      break;
    case 'pink':
      playerImg = 'images/char-pink-girl.png';
      break;
    case 'princess':
      playerImg = 'images/char-princess-girl.png';
      break;
    default:
      break;
  }
}

document.getElementById('changeChar').addEventListener('click', function(e) {
  showModalWindow('change');
});

// Setup Modal and display
function showModalWindow(header) {
  const letsPlay = document.getElementById('letsPlay');
  const charList = document.getElementById('char-list');

  if (header === 'change') {
    modalTitle.innerHTML = 'Change your Character';
    modalMessage.innerHTML = 'Select a Character to Play';
  } 
  else if (header === 'won') {
    modalTitle.innerHTML = 'WooHoo!!';
    modalMessage.innerHTML = 'You Won! Play Again?';
  }
  else {
    modalTitle.innerHTML = 'Welcome to BABs Bug Out Game!';
    modalMessage.innerHTML = 'Select a Character to Play';
  }

  charList.addEventListener('click', function(e) {
    var sel = e.target.parentElement.id;
    selectChar(sel);

    // highlight char selected - TODO unhighlight when a different one is chosen
    //e.target.classList.add('selected');
  });

  letsPlay.addEventListener('click', function() {
    player.sprite = playerImg;
    player.pReset();
  });

  $('#showModal').modal();
}

//  TODO:  at a later update
// Create Counters
//    - total number of moves / tries
//let totalMoves = 0;

// Reset stars
/* function resetLife() {
  // reset char life array to 3
  life = [playerImg, playerImg, playerImg];
}

// Reset counters
function resetCounters() {
  // totalMoves
  totalMoves = 0;
  // movesSpan
  movesSpan[0].innerHTML = totalMoves.toString();
  // pairs
  pairs = 0;
} */

/* // Track number of moves
function moves() {
  totalMoves++;
  movesSpan[0].innerHTML = totalMoves.toString();
  // start timer on first move
  if (totalMoves == 1) {
    resetTimer();
    startTimer();
  }

  checkStars();
}
 */
// Track stars based on number of moves
/* function checkStars() {
  // Number of stars
  // Starts with all 3 stars - up to 8 moves
  if (totalMoves > 8 && totalMoves <= 16) {
    //   - 9-10 moves = 2 stars
    star[2].classList.remove('fa-star');
    star[2].classList.add('fa-star-o');
    modalTitle.innerHTML = 'WooHoo! Memory Managed!';
  } else if (totalMoves === 17 && totalMoves <= 30) {
    //   - 11-12 moves = 1 star
    star[1].classList.remove('fa-star');
    star[1].classList.add('fa-star-o');
    modalTitle.innerHTML = 'Cool! Memory is Good!';
  } else if (totalMoves > 30) {
    //   - >12 moves = all empty stars
    star[0].classList.remove('fa-star');
    star[0].classList.add('fa-star-o');
    modalTitle.innerHTML = 'Good, but you could do better!';
  }
} */

const explosion = 'images/explosion.png';
const playerImg = 'images/char-horn-girl.png';

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
      alert('You Won!');
      this.win = true;
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
}

// Enemies our player must avoid
class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    super.update();

    if (this.isOutX) {
      this.x = -1;
    } else {
      this.x += dt;
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

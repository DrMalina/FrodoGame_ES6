import Frodo from "./Frodo";
import Ring from "./Ring";
import { ui } from "./UI";

class Game {
  constructor() {
    this.frodo = new Frodo();
    this.ring = new Ring();
    this.score = 0;
    this.finished = false;
  }

  //board is shown as 10x10 grid array [0,99] going from left to right
  positionToIndex(x, y) {
    return x + y * 10; // x, y position is calculated as an index of board array
    // for example x: 2 y: 1 will result in position [12]
  }

  showFrodo() {
    ui.hideVisibleFrodo(); //hide previous frodo
    ui.showFrodo(this.positionToIndex(this.frodo.x, this.frodo.y));
  }

  showRing() {
    ui.showRing(this.positionToIndex(this.ring.x, this.ring.y));
  }

  moveFrodo() {
    switch (this.frodo.direction) {
      case "right":
        this.frodo.x = this.frodo.x + 1;
        break;
      case "left":
        this.frodo.x = this.frodo.x - 1;
        break;
      case "up":
        this.frodo.y = this.frodo.y - 1;
        break;
      case "down":
        this.frodo.y = this.frodo.y + 1;
        break;
    }

    this.gameOver();

    if (!this.finished) {
      // will stop Frodo from showing even after gameOver()
      this.showFrodo();
      this.checkRingCollision();
    }
  }

  turnFrodo(key) {
    switch (key) {
      case 37:
        this.frodo.direction = "left";
        break;

      case 38:
        this.frodo.direction = "up";
        break;

      case 39:
        this.frodo.direction = "right";
        break;

      case 40:
        this.frodo.direction = "down";
        break;
    }
  }

  checkRingCollision() {
    if (this.frodo.x === this.ring.x && this.frodo.y === this.ring.y) {
      this.score++;
      ui.updateScore(this.score);
      ui.hideVisibleRing();
      this.ring = new Ring();
      this.showRing();
    }
  }

  startGame() {
    this.idSetInterval = setInterval(() => {
      this.moveFrodo();
    }, 250);
  }

  gameOver() {
    if (
      this.frodo.x < 0 ||
      this.frodo.x > 9 ||
      this.frodo.y < 0 ||
      this.frodo.y > 9
    ) {
      this.finished = true;
      clearInterval(this.idSetInterval);
      ui.hideVisibleFrodo();
      ui.gameOver(this.score);
    }
  }

  init() {
    this.showFrodo();
    this.showRing();
    this.startGame();
  }
}

const game = new Game();
game.init();

document.addEventListener("keydown", e => {
  game.turnFrodo(e.keyCode);
});

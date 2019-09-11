class UI {
  constructor() {
    this.board = document.getElementById("board").querySelectorAll("div");
    this.score = document.getElementById("score").querySelector("strong");
  }

  showFrodo(positionOfFrodo) {
    this.board[positionOfFrodo].classList.add("frodo");
  }

  showRing(positionOfRing) {
    this.board[positionOfRing].classList.add("ring");
  }

  hideVisibleFrodo() {
    const frodo = document.querySelector(".frodo");
    //remove only if frodo exists
    if (frodo) {
      frodo.classList.remove("frodo");
    }
  }

  hideVisibleRing() {
    document.querySelector(".ring").classList.remove("ring");
  }

  updateScore(score) {
    this.score.textContent = score;
  }

  gameOver(score) {
    document.querySelector(".game").remove();

    const markup = `<div class="popup">
    <h2>Game Over</h2>
    <p>Your score: <span>${score}</span></p>
</div>`;

    document.querySelector("body").insertAdjacentHTML("beforebegin", markup);
  }
}

export const ui = new UI();

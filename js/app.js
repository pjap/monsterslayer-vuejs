new Vue({
  el : '#app',
  data : {
    playerHealth : 100,
    monsterHealth : 100,
    gameIsRunning : false
  },
  methods : {
    startGame() {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    endGame() {
      this.gameIsRunning = false
    },
    attack() {
      this.monsterHealth = this.monsterHealth - this.calculateDamage(3,10)

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack()
    },
    specialAttack() {
      this.monsterHealth = this.monsterHealth - this.calculateDamage(10,20)

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack()
    },
    monsterAttack() {
      return this.playerHealth = this.playerHealth - this.calculateDamage(5,12)
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth = this.playerHealth + 10
      } else {
        this.playerHealth = 100
      }
      this.monsterAttack()
    },
    calculateDamage(min, max) {
      return Math.max(Math.round(Math.random() * max), min)
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won! New Game ?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! New Game ?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true;
      }
      return false;
    }
  }
})

new Vue({
  el : '#app',
  data : {
    playerHealth : 100,
    monsterHealth : 100,
    gameIsRunning : false,
    turns : []
  },
  methods : {
    startGame() {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    endGame() {
      if (confirm('Are You Sure Want To Give Up ?')) {
        this.gameIsRunning = false
      } else {
        this.gameIsRunning = true
      }
    },
    attack() {
      let damage = this.calculateDamage(3, 10)
      this.monsterHealth = this.monsterHealth - damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player Hits Monster For ' + damage
      })
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack()
    },
    specialAttack() {
      let damage = this.calculateDamage(10,12)
      this.monsterHealth = this.monsterHealth - damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player Hits Monster With Special Attack For' + damage
      })
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack()
    },
    heal() {
      if (this.playerHealth >= 90) {
        this.playerHealth = 100
        this.monsterAttack()
      } else {
        this.playerHealth = this.playerHealth + 10
        this.monsterAttack()
      }
    },
    monsterAttack() {
      var damage = this.calculateDamage(5, 12)
      this.playerHealth = this.playerHealth - damage
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster Hits Player For ' + damage
      })
      this.checkWin()
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won! New Game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! New Game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      }
      return false
    }
  }
})

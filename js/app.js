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
      this.turns = []
    },
    endGame() {
      this.gameIsRunning = false
    },
    attack() {
      var damage = this.calculateDamage(3,10)
      this.monsterHealth = this.monsterHealth - damage
      this.turns.unshift({
        isPlayer : true,
        message : 'Player Hits Monster For ' + damage + ' Damaged'
      })
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack()
    },
    specialAttack() {
      var damage = this.calculateDamage(10,20)
      this.monsterHealth = this.monsterHealth - damage
      this.turns.unshift({
        isPlayer : true,
        message : 'Player Hits Monster Hard For ' + damage + ' Damaged'
      })
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack()
    },
    monsterAttack() {
      var damage = this.calculateDamage(5,12)
      this.playerHealth = this.playerHealth - damage
      this.turns.unshift({
        isPlayer : false,
        message : 'Monster Hits Player For ' + damage + ' Damaged'
      })
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth = this.playerHealth + 10
      } else {
        this.playerHealth = 100
      }
      this.turns.unshift({
        isPlayer : true,
        message : 'Player Healing For 10'
      })
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

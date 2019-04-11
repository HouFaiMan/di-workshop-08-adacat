class AdaCat {
  // sets the properties upon initialisation
  constructor(name, owner) {
    this.name = name
    this.owner = owner
    this.hunger = 5
    this.isSleeping = false
    this.size = 30
    this.tiredness = 0
    this.message = null;
    this.warning = null;
  }

  setWarning(warning) {
    this.warning = warning;
  }

  setMessage(message) {
    this.message = message;
  }

  setTiredness(tiredness) {
    if (tiredness < 0) {
      tiredness = 0;
    }

    if (tiredness > 15) {
      tiredness = 15;
    }
    this.tiredness = tiredness;
  }

  // calculates and set the hunger level - if the level is below 0 or higher than 10 then just use the default values
  setHunger(newHunger) {
    if (newHunger < 0) {
      newHunger = 0
    }
    if (newHunger > 10) {
      newHunger = 10
    }

    this.hunger = newHunger
  }

  // gets a description of how the cat is doing at the moment.
  getDescription() {
    var sleepLine
    if (this.isSleeping) {
      sleepLine = 'Shh! ' + this.name + ' is sleeping.'
    } else {
      sleepLine = this.name + ' is awake.'
    }
    var lines = [
      this.name + ' is a cat. they belong to ' + this.owner + '.',
      'their hunger level is ' + this.hunger + '/10.',

      'they weigh ' + this.size + ' tonnes.',
      'their health is ' + this.getHealth() + '/30.',
      'their tiredness is ' + this.tiredness + '/15',
      this.message,
      this.warning,
      sleepLine
    ]

    return lines.join('\n')
  }

  // calculations for feeding the cat - if the cat's hunger level is less than 3, the cat's weight will increase.
  feed() {
    if(this.isSleeping) {
      return this.setMessage("The cat is sleeping! You can't feed the cat!");
    }
    var hunger = this.hunger - 1
    var tiredness = this.tiredness + 1
    if (hunger < 3) {
      this.size = this.size + 1
    }

    this.setMessage("The cat is eating");
    this.setTiredness(tiredness);
    this.setHunger(hunger)
  }

  // setter
  nap() {
    this.setMessage("The cat is sleeping");
    this.setTiredness(0);
    this.isSleeping = true
  }

  // setter
  wakeUp() {
    this.setMessage("The cat is waking up");
    this.isSleeping = false
  }

  // calculations for playing with the cat
  // cat will become hungrier and if the cat's hungry level is above 7, they will lose
  play() {
    var hunger = this.hunger + 3
    var tiredness = this.tiredness + 3
    if (hunger > 7) {
      this.size = this.size - 1
    }
    this.setMessage("The cat is playing");
    this.setTiredness(tiredness);
    this.setHunger(hunger)
  }

  getHealth() {
    // the ideal weight for cats is 30
    // this futher they are from this, the less
    // healthy they are
    var sizeDifferenceFromIdeal = Math.abs(this.size - 30)

    // sizeScore starts at thirty, and gets
    // smaller as the cat's size gets further
    // from the ideal weight
    var sizeScore = 30 - sizeDifferenceFromIdeal

    // health score gets lower as the cat gets
    // more hungry
    var healthScore = sizeScore - this.hunger

    // max returns the biggest value, so health
    // will never go below 0
    if (healthScore < 5) {
      this.setWarning("The cat is dying, take your cat to the vet")
    } else {
      this.setWarning("The cat is fine.");
    }
    
    if (healthScore < 0) {
      healthScore = 0
    }

    return healthScore
  }
}

module.exports = AdaCat

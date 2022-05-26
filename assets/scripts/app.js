const MONSTER_ATTACK_VALUE = 14;
const PLAYER_ATTACK_VALUE = 10;
const STRONG_PLAYER_ATTACK_VALUE = 17;
const HEAL_VALUE = 15;
const assingnedMaxLife = prompt(
  'Maximum Life for the Player and the Monster',
  'Enter Value > 17'
);
const LOG_PLAYER_ATTACK = 'ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_HEAL = 'HEAL';
const LOG_BONUS_LIFE = 'BONUS_LIFE';
const LOG_GAME_OVER = 'GAME_OVER';

let chosenMaxLife = parseInt(assingnedMaxLife);
if (chosenMaxLife <= 0 || isNaN(chosenMaxLife)) {
  chosenMaxLife = 300;
}

adjustHealthBars(chosenMaxLife);

let hasBonusLife = true;
let logData = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function dataMakeShort(logMode, value, playerHealth, monsterHealth) {
  let data;
  data = {
    type: logMode,
    value: value,
    playerHealth: playerHealth,
    monsterHealth: monsterHealth,
  };
  logData.push(data);
}

//for this type of conditional statement (===) we can also use "Swich-case" Statement
function logDataMaker(logMode, value, playerHealth, monsterHealth) {
  if (logMode === LOG_PLAYER_ATTACK) {
    dataMakeShort(logMode, value, playerHealth, monsterHealth);
  } else if (logMode === LOG_PLAYER_STRONG_ATTACK) {
    dataMakeShort(logMode, value, playerHealth, monsterHealth);
  } else if (logMode === LOG_MONSTER_ATTACK) {
    dataMakeShort(logMode, value, playerHealth, monsterHealth);
  } else if (logMode === LOG_HEAL) {
    dataMakeShort(logMode, value, playerHealth, monsterHealth);
  } else if (logMode === LOG_BONUS_LIFE) {
    dataMakeShort(logMode, value, playerHealth, monsterHealth);
  } else if (logMode === LOG_GAME_OVER) {
    dataMakeShort(logMode, value, playerHealth, monsterHealth);
  }
}

function reset() {
  adjustHealthBars(chosenMaxLife);
}

function monsterAttack() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  logDataMaker(
    LOG_MONSTER_ATTACK,
    playerDamage,
    currentPlayerHealth,
    currentMonsterHealth
  );
}

function attack(mode) {
  const leftPlayerHealth = currentPlayerHealth;
  const monsterDamage = dealMonsterDamage(mode);
  currentMonsterHealth -= monsterDamage;
  if (mode === PLAYER_ATTACK_VALUE) {
    logDataMaker(
      LOG_PLAYER_ATTACK,
      monsterDamage,
      currentPlayerHealth,
      currentMonsterHealth
    );
  } else if (mode === STRONG_PLAYER_ATTACK_VALUE) {
    logDataMaker(
      LOG_PLAYER_STRONG_ATTACK,
      monsterDamage,
      currentPlayerHealth,
      currentMonsterHealth
    );
  }
  monsterAttack();

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    let healPower = leftPlayerHealth + 10;
    currentPlayerHealth += healPower;
    setPlayerHealth(currentPlayerHealth);
    logDataMaker(
      LOG_BONUS_LIFE,
      healPower,
      currentPlayerHealth,
      currentMonsterHealth
    );
    alert('You are saved by the Bonus Life!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    logDataMaker(
      LOG_GAME_OVER,
      'PLAYER WON',
      currentPlayerHealth,
      currentMonsterHealth
    );
    alert('You won!');
  } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
    logDataMaker(
      LOG_GAME_OVER,
      'MONSTER WON',
      currentPlayerHealth,
      currentMonsterHealth
    );
    alert('Monster won!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    logDataMaker(
      LOG_GAME_OVER,
      'DRAW',
      currentPlayerHealth,
      currentMonsterHealth
    );
    alert("It's a draw!");
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth + HEAL_VALUE >= chosenMaxLife) {
    alert('You can not heal more than maximum.');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  logDataMaker(LOG_HEAL, healValue, currentPlayerHealth, currentMonsterHealth);
  monsterAttack();
}

function attackHandler() {
  attack(PLAYER_ATTACK_VALUE);
}

function strongAttackHandler() {
  attack(STRONG_PLAYER_ATTACK_VALUE);
}

function printLogHandler() {
  for (const key in logData) {
    i = 0;
    console.log(logData[key]);
    i++;
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLogHandler);

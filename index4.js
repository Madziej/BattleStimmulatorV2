
//StartButton
const startButton = document.getElementById('startBattleButton');


startButton.addEventListener('click', function() {
    startButton.classList.add('pressed');  
    startButton.disabled = true;
});



let player;
let opponent;

let playerMaxHp;
let playerCurrentHp;

let enemyMaxHp;
let enemyCurrentHp;


function loadCharacterData() {
    const characterData = localStorage.getItem('character');

    if (!characterData) {
        console.log('No character data found');
        alert('No saved character data found!');
        return;
    }

    const character = JSON.parse(characterData);

    player = new Fighter(
        character.name,
        character.race.name,
        character.profession.name,
        character.hp,
        character.ap,
        character.hc,
        character.ini,
        character.armor,
        character.dmgAbsorb,
        character.weapon,
        character.dmgBonus,
        character.amulet.name
    );

    console.log(`Character loaded: ${player.name}`);
    console.log(player);

    alert(`Character ${player.name} has been loaded!`);

    /*
    displayCharacterCard();
    updatePlayerAvatar();    */
    
    loadEnemyData();
    displayFightersData();
    setPlayerAvatar();
    setOpponentAvatar();
    renderPlayerHealthBar();
    updatePlayerHealthBar();
    renderEnemyHealthBar();
    updateEnemyHealthBar();
    injectItemsImages();
    
}


function loadEnemyData(){

   const enemyData =  localStorage.getItem('opponent');

   if (!enemyData) {
    console.log('No enemy data found');
    alert('No saved enemy data found!');
    return;
}

const enemy = JSON.parse(enemyData);

opponent = new Fighter(
    enemy.opponentName,
    null, 
    null,
    enemy.opponentHP,
    enemy.opponentAP,
    enemy.opponentHC,
    enemy.opponentINI
    // Pozostałe statystyki można pominąć, ponieważ są domyślnie ustawione na null
);

console.log(`Enemy ${enemy.opponentName} has been loaded!`);
console.log(opponent);
alert(`Enemy ${enemy.opponentName} has been loaded!`);

}





class Fighter {

constructor(name,race = null,profession = null,hitPoints,attackPower,hitChance,initiative,armor = null,damageAbsorb = null,weapon = null,damageBonus = null,amulet = null){

    this.name = name;
    this.race = race;
    this.profession = profession;
    this.hitPoints = hitPoints;
    this.attackPower = attackPower;
    this.hitChance = hitChance;
    this.initiative = initiative;
    this.armor = armor;
    this.damageAbsorb = damageAbsorb;
    this.weapon = weapon;
    this.damageBonus = damageBonus;
    this.amulet = amulet;
}


OpponentToHTML() {

    enemyCurrentHp = this.hitPoints;
    enemyMaxHp = this.hitPoints

    return `
    <div>
        <p>${this.name}</p>
        <p>HP:${enemyCurrentHp} / ${this.hitPoints}</p>
        <p>AP: ${this.attackPower}</p>
        <p>HC: ${this.hitChance}</p>
        <p>INI: ${this.initiative}</p>
    </div>`;
}


OpponentToHTMLUpdateHealth() {
    return `
    <div>
        <p>${this.name}</p>
        <p>HP:${enemyCurrentHp} / ${this.hitPoints}</p>
        <p>AP: ${this.attackPower}</p>
        <p>HC: ${this.hitChance}</p>
        <p>INI: ${this.initiative}</p>
    </div>`;
}




PlayerToHTML() {

    playerCurrentHp = this.hitPoints;
    playerMaxHp = this.hitPoints
    
    return `
    <div>
        <p>Name: ${this.name}</p>
        <p>Race: ${this.race}</p>
        <p>Class: ${this.profession}</p>
        <p>HP: ${playerCurrentHp} / ${this.hitPoints} AP: ${this.attackPower} HC: ${this.hitChance} INI: ${this.initiative}</p>
        <p>Weapon: ${this.weapon}</p>
        <p>DMG Bonus: ${this.damageBonus}</p>
        <p>Armor: ${this.armor}</p>
        <p>DMG Absorb: ${this.damageAbsorb}</p>
        <p>${this.amulet}</p>
    
        </div>`;
}


PlayerToHTMLupdateHealth() {
    
    return `
    <div>
        <p>Name: ${this.name}</p>
        <p>Race: ${this.race}</p>
        <p>Class: ${this.profession}</p>
        <p>HP: ${playerCurrentHp} / ${this.hitPoints} AP: ${this.attackPower} HC: ${this.hitChance} INI: ${this.initiative}</p>
        <p>Weapon: ${this.weapon}</p>
        <p>DMG Bonus: ${this.damageBonus}</p>
        <p>Armor: ${this.armor}</p>
        <p>DMG Absorb: ${this.damageAbsorb}</p>
        <p>${this.amulet}</p>
    
        </div>`;
}


//Player Attack Function
Attack(anotherFighter){

    symbolDisplayPLayer('🗡️');
    symbolDisplayEnemy('💢');

//a) hit test
let hitResult;
hitResult = getRandomInt(1,100);
console.log(`Hit Test: ${hitResult} while ${this.name}'s HC is ${this.hitChance}`);

if (hitResult <= this.hitChance){

    let damage;
    damage = (getRandomInt(1,this.attackPower))+this.damageBonus;
    console.log(`${this.name} deals ${damage} damage to ${anotherFighter.name}`);
    
    logFightMultiColor({text:`${this.name}`, color: `blue`},
                        {text:` deals ${damage} damage to`, color:`white`},
                        {text:`${anotherFighter.name}`, color:`red`}, {text:"        ►",color:"blue"},{text:`♦`,color:`red`});
    //logFightBlue(`${this.name}`);  logFight(` deals ${damage} damage to`); logFightRed(`${anotherFighter.name}`);
    symbolDisplayPLayer(`🗡️ ${damage}`);
    enemyCurrentHp -= damage;
    if(damage>(this.attackPower)*0.8){
        enemyDialogueRandom(enemyQuotesGetsHighDamage);
        playerDialogueRandom(playerQuotesDealsHighDamage);
    }

    renderEnemyHealthBar();
    updateEnemyHealthBar();
    document.getElementById(`enemyStatisticsCard`).innerHTML = anotherFighter.OpponentToHTMLUpdateHealth();
   
    

} else {
    console.log(`${this.name} missed the target!`);
    symbolDisplayPLayer('🗡️💫');
    //logFightBlue(`${this.name}`); logFight(`missed the target!`);
    logFightMultiColor({text:`${this.name}`, color:`blue`}, {text:`missed the target!`, color:`white`},{text:`💫`,color:`white`});
}

}


// Opponent's attack
OpponentAttack(anotherFighter){
    symbolDisplayPLayer('💢');
    symbolDisplayEnemy('🪓');
//hit test
let hitResult;
hitResult = getRandomInt(1,100);
console.log(`Hit Test: ${hitResult} while ${this.name}'s HC is ${this.hitChance}`);



if (hitResult <= this.hitChance){

    let damage;
    let currentDmgAbsorb;
    let finalDamage;

    damage = (getRandomInt(1,this.attackPower))+this.damageBonus;
    currentDmgAbsorb = getRandomInt(1,anotherFighter.damageAbsorb);
    console.log(`${this.name} deals ${damage} damage to ${anotherFighter.name}`);
    
    logFightMultiColor({text:`${this.name}`, color:`red`}, {text:`deals ${damage} damage to`, color:`white`},{text:`${anotherFighter.name}`, color:`blue`},{text:`       ♦`,color:`blue`},{text:`◄`,color:`red`});
    logFightMultiColor({text:`⛊  `,color:`green`}, {text:`${anotherFighter.name}`, color:`blue`},{text:`'s ${anotherFighter.armor} absorbs ${currentDmgAbsorb} damage`, color:`white`},{text:`⛊`,color:`green`});
    symbolDisplayEnemy(`🪓 ${damage}`);
    symbolDisplayPLayer(`⛊ ${currentDmgAbsorb}`);
    //logFightRed(`${this.name}`);  logFight(` deals ${damage} damage to`); logFightBlue(`${anotherFighter.name}`);
    //logFight(`${anotherFighter.name}'s ${anotherFighter.armor} absorbs ${currentDmgAbsorb} damage`);
    finalDamage = damage - currentDmgAbsorb;
    if (finalDamage < 0){
        finalDamage = 0;
    }
    playerCurrentHp -= finalDamage;
    if (finalDamage > Math.floor((this.attackPower)*0.6)){
        console.log(enemyQuotesDealsHighDamage);
        enemyDialogueRandom(enemyQuotesDealsHighDamage); 
        playerDialogueRandom(playerQuotesGetsHighDamage);
     }
    updatePlayerHealthBar();
    document.getElementById(`playerStatisticsCard`).innerHTML = anotherFighter.PlayerToHTMLupdateHealth();
   
    

   





} else {
    console.log(`${this.name} missed the target!`);
    symbolDisplayEnemy('🪓💫');
    logFightMultiColor({text:`${this.name}`, color:`red`},{text:`missed the target!`, color:`white`}, {text:`💫`,color:`white`});
    //logFightRed(`${this.name}`); logFight(`missed the target!`);
}







}

}  



function displayFightersData(){

displayCharacterData();
displayEnemyData();


}

function displayCharacterData(){

document.getElementById(`playerStatisticsCard`).innerHTML = player.PlayerToHTML();


}

function displayEnemyData(){

    document.getElementById(`enemyStatisticsCard`).innerHTML = opponent.OpponentToHTML();

}


function setPlayerAvatar(){

    let playerAvatar;

    if(player.race==="Human"){
        playerAvatar = "HumanAvatar.jpg";
    }
    if(player.race==="Elf"){
        playerAvatar = "elf.jpg";
    }
    if(player.race==="Dwarf"){
        playerAvatar = "dwarf.jpg";
    }

    document.getElementById('playerAvatarSocket').innerHTML =`<img src="${playerAvatar}" class="scaled-avatar">`;
    }


 function setOpponentAvatar(){

    let enemyAvatar;

switch(opponent.name){

case "Goblin":
    enemyAvatar = "goblin.jpg";
    break;

    
case "Orc":
    enemyAvatar = "orc.jpg";
    break;


case "Troll":
    enemyAvatar = "troll.jpg";
    break;


case "Troll Berserker":
    enemyAvatar = "trollBerserker.jpg";
    break;


case "Ogre":
    enemyAvatar = "ogre.jpg";
    break;    


case "Ogre Berserker":
    enemyAvatar = "ogreBerserker.jpg";
    break;


case "Dragon":
    enemyAvatar = "dragon.jpg";
    break;
}

document.getElementById('enemyAvatarSocket').innerHTML =`<img src="${enemyAvatar}" class="scaled-avatar">`;


 }   





 function renderPlayerHealthBar (playerCurrentHp,playerMaxHp){

    let healthBarArray = [];
    const lineLength = 20;
    for (let i = 0; i< playerCurrentHp; i++){
        if (i > 0 && i % lineLength === 0) {
            healthBarArray.push(`\n`);
        }
        healthBarArray.push(`◼`);
    }

    for (let i = playerCurrentHp; i< playerMaxHp; i++){
        if (i > 0 && i % lineLength === 0) {
            healthBarArray.push(`\n`);
        }
        healthBarArray.push(`◻`);
    }

    return healthBarArray.join(``);


 }


 function updatePlayerHealthBar () {

    console.log(`updating Player's health bar...`)
    const healthBarElement = document.getElementById(`playerHealthBar`);
    healthBarElement.textContent = renderPlayerHealthBar(playerCurrentHp, playerMaxHp);


 }





 
 function renderEnemyHealthBar (enemyCurrentHp,enemyMaxHp){

    let healthBarArray = [];
    const lineLength = 20;
    const lineLength2 = 20;
    for (let i = 0; i< enemyCurrentHp; i++){
        if (i > 0 && i % lineLength === 0) {
            healthBarArray.push(`\n`);
        }
        healthBarArray.push(`◼`);
    }

    for (let i = enemyCurrentHp; i< enemyMaxHp; i++){

        healthBarArray.push(`◻`);
        if (i > 0 && i % lineLength2 === 0) {
            healthBarArray.push(`\n`);
        }
    }




    return healthBarArray.join(``);


 }


 function updateEnemyHealthBar () {

    console.log(`updating Enemy's health bar...`)
    const healthBarElement = document.getElementById(`enemyHealthBar`);

    
    healthBarElement.textContent = renderEnemyHealthBar(enemyCurrentHp, enemyMaxHp);


 }







 function injectItemsImages(){

let armorImage;
let weaponImage;
let amuletImage;

if (player.armor ==="leather armor"){
    armorImage = "Leather Armor.png";
}
else if (player.armor === "chainmail"){
    armorImage = `Chainmail.png`;
}
else if (player.armor === "plate armor"){

    armorImage = `Plate Armour.png`;
}



if(armorImage){
document.getElementById(`itemArmor`).innerHTML = `<img src= "${armorImage}" class="scaledEquipment">`;
}
else{
    console.log(`armorImage does not have any value!`);
}




if (player.weapon ==="wooden club"){
    weaponImage = "Wooden Club.png";
}
else if (player.weapon === "axe"){
    weaponImage = `Axe.png`;
}
else if (player.weapon === "two handed sword"){

    weaponImage = `Two handed Sword.png`;
}



if(weaponImage){
document.getElementById(`itemWeapon`).innerHTML = `<img src= "${weaponImage}" class="scaledEquipment">`;
}
else{
    console.log(`weaponImage does not have any value!`);
}







if (player.amulet ==="Amulet of Life"){
    amuletImage = "Amulet of Life.png";
}
else if (player.amulet === "Amulet of Initiative"){
    amuletImage = `Amulet of Initiative.png`;
}
else if (player.amulet === "Amulet of Luck"){

    amuletImage = `Amulet of Luck.png`;
}

else if (player.amulet === "Amulet of Strength"){

    amuletImage = `Amulet of Strength.png`;
}



if(amuletImage){
document.getElementById(`itemAmulet`).innerHTML = `<img src= "${amuletImage}" class="scaledEquipment">`;
}
else{
    console.log(`amuletImage does not have any value!`);
}

 }







// Wait function
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generating text info on the screen

function logFight(text) {
    const logDiv = document.getElementById('battleLog');
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    
    logDiv.insertBefore(nowyLog, logDiv.firstChild); 
}

// Generating text info in color red
function logFightRed(text) {
    const logDiv = document.getElementById('battleLog');
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    nowyLog.style.color = 'red';
    
    logDiv.insertBefore(nowyLog, logDiv.firstChild);
}

// Generating text info in color blue
function logFightBlue(text) {
    const logDiv = document.getElementById('battleLog');
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    nowyLog.style.color = 'blue';
    logDiv.insertBefore(nowyLog, logDiv.firstChild);
}

// Generating text info in multicolor
function logFightMultiColor(...coloredTexts) {
    const logDiv = document.getElementById('battleLog');
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    
    coloredTexts.forEach(coloredText => {
        const span = document.createElement('span');
        span.textContent = coloredText.text;
        span.style.color = coloredText.color;
        nowyLog.appendChild(span);
    });

    logDiv.insertBefore(nowyLog, logDiv.firstChild);
}


function logFightMultiColorBig(...coloredTexts) {
    const logDiv = document.getElementById('battleLog');
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    
    coloredTexts.forEach(coloredText => {
        const span = document.createElement('span');
        span.textContent = coloredText.text;
        span.style.color = coloredText.color;
        span.style.fontSize = '20px'; 
        nowyLog.appendChild(span);
    });

    logDiv.insertBefore(nowyLog, logDiv.firstChild);
}




// Dice
function getRandomInt(min,max){

    return Math.floor(Math.random() * (max - min + 1)) + min;

}



// Character dialog functions

function playerDialogue (text){
    const logDiv = document.getElementById('playerCharacterLog');
    logDiv.innerHTML = '';
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    logDiv.insertBefore(nowyLog, logDiv.firstChild);
}


function enemyDialogue (text){
    const logDiv = document.getElementById('enemyLog');
    logDiv.innerHTML = '';
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    logDiv.insertBefore(nowyLog, logDiv.firstChild);
}


function playerDialogueRandom (textArray){

let index = getRandomInt(0,textArray.length - 1);
let text = textArray[index];
console.log(`${player.name}: ${text}`);
playerDialogue(text);

}

function enemyDialogueRandom (textArray){
    let index = getRandomInt(0,textArray.length - 1);
    let text = textArray[index];
    console.log(`${opponent.name}: ${text}`);
    enemyDialogue(text);
}


function symbolDisplayPLayer(text){

    const logDiv = document.getElementById('bannerContainer1');
    logDiv.innerHTML = '';
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    logDiv.insertBefore(nowyLog, logDiv.firstChild);
    
}

function symbolDisplayEnemy(text){

    const logDiv = document.getElementById('bannerContainer2');
    logDiv.innerHTML = '';
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    logDiv.insertBefore(nowyLog, logDiv.firstChild);
    
}







// Initiative test

function initiativeTest (){

console.log(`Initiative test running...`);
symbolDisplayPLayer(` `);
symbolDisplayEnemy(` `);
console.log(`${player.name}'s initiative is: ${player.initiative}`);
console.log(`${opponent.name}'s initiative is: ${opponent.initiative}`);



let playerTest;
playerTest = getRandomInt(1,player.initiative);

symbolDisplayPLayer(playerTest);

let enemyTest;
enemyTest = getRandomInt(1,opponent.initiative);
symbolDisplayEnemy(enemyTest);

console.log(`${player.name}: ${playerTest}`);
console.log(`${opponent.name}: ${enemyTest}`);

let iniResult;

logFightMultiColor({text:`Initiative test! `, color: `white`},
    {text:`${player.name} `, color: `blue`},
    {text:`${playerTest} `, color: `white`},
    {text:`${opponent.name} `, color: `red`},
    {text:`${enemyTest}` , color:`white`});

if(playerTest >= enemyTest){

    console.log(`${player.name} attacks first!`);
    logFightMultiColor({text:`${player.name}`,color:`blue`}, {text:`attacks first!`,color:`white`});  
    iniResult = true;

} else if (playerTest < enemyTest){
    console.log(`${opponent.name} attacks first!`);
    logFightMultiColor({text:`${opponent.name}`,color:`red`}, {text:`attacks first!`,color:`white`});
    iniResult =  false;
}




  
/*
logFight(`Initiative test.`);
logFightBlue(`${player.name}`);
logFight(`${playerTest}`);
logFightRed(`${opponent.name}`);
logFight(`${enemyTest}`);
*/

return iniResult;

}







 async function startBattle(){

  /*

console.log(`Battle has been started! Prepare to fight!`);

//playerDialogue(`${opponent.name}! Ty kurwo jebana!`);
//enemyDialogue(`GRRKHHHHHHH`);
logFightMultiColor({text:`⚔️ Battle starts between`, color:`white` }, {text:`${player.name}`,color:`blue`}, {text: ` and `,color:`white`},{text:`${opponent.name}`, color:`red`},{text:`⚔️`,color:`white`});

playerDialogueRandom(playerQuotesStart);
enemyDialogueRandom(enemyQuotesStart);

initiativeTest();

await wait(3000);

player.Attack(opponent);
opponent.OpponentAttack(player);

*/



// Battle Sequence



let turnNumber = 1;

console.log(`Battle has been started! Prepare to fight!`);
logFightMultiColor({text:`⚔️ Battle starts between`, color:`white` }, {text:`${player.name}`,color:`blue`}, {text: ` and `,color:`white`},{text:`${opponent.name}`, color:`red`},{text:`⚔️`,color:`white`});

await wait(2500);

playerDialogueRandom(playerQuotesStart);
enemyDialogueRandom(enemyQuotesStart);

logFightMultiColor({text: `Let the better warrior win!`, color:"green"});
await wait(1000);
logFightMultiColorBig({text:`---------------------`, color:`white`}, {text:`3`,color:`green`},{text:`---------------------` , color:`white`});
await wait(1000);
logFightMultiColorBig({text:`---------------------`, color:`white`}, {text:`2`,color:`green`},{text:`---------------------` , color:`white`});
await wait(1000);
logFightMultiColorBig({text:`---------------------`, color:`white`}, {text:`1`,color:`green`},{text:`---------------------` , color:`white`});


while(playerCurrentHp > 0 && enemyCurrentHp > 0){

console.log(`---------------Turn ${turnNumber}----------------`);
logFightMultiColorBig({text:`---------------------TURN ${turnNumber}------------------`});  

await wait(2000);


if(playerCurrentHp <= 10){

playerDialogueRandom(playerQuotesLowHP); 
enemyDialogueRandom(enemyQuotesDealsHighDamage);   

} 
else if (enemyCurrentHp <= 10){
enemyDialogueRandom(enemyQuotesGetsHighDamage);
playerDialogueRandom(playerQuotes);
}

else if ( playerCurrentHp <= 10 && enemyCurrentHp <= 10){
    playerDialogueRandom(playerQuotesLowHP);
    enemyDialogueRandom(enemyQuotesGetsHighDamage);
}
else {
playerDialogueRandom(playerQuotes);
enemyDialogueRandom(enemyQuotes);
}

await wait(3000);


//initiativeTest();
const iniResult = initiativeTest(); 
await wait(3000);

if( iniResult ) {
player.Attack(opponent);
await wait(4000);

if(enemyCurrentHp <= 0){
    break;
}

opponent.OpponentAttack(player);
await wait(4000);

if(playerCurrentHp <= 0){
    break;
}

}
else {
opponent.OpponentAttack(player);
await wait(4000);
if(playerCurrentHp <= 0){
    break;
}
player.Attack(opponent);
await wait(4000);
if(enemyCurrentHp <= 0){
    break;
}
}



turnNumber ++;

}

if (playerCurrentHp <= 0){
logFightMultiColorBig({text:`The fight is over!`, color:`pink`});
logFightMultiColorBig({text:`The winner is: ${opponent.name}`, color:`white`});
enemyDialogueRandom(enemyQuotesWin);
playerDialogue(`...`);
}
else if (enemyCurrentHp <= 0){
logFightMultiColorBig({text:`The fight is over!` ,color:`pink`});
logFightMultiColorBig({text:`The winner is: ${player.name}`,color:`white`});
playerDialogueRandom(playerQuotesWin);
enemyDialogue(`<dying noises>`);
}

logFight(`If You want to play again, just click F5 on Your keyboard to refresh the page :)`);

}









 // Dialogue Part



 // PLAYER QUOTES

const playerQuotesStart = [
    "I won't let You live!",
    "Gods! Stand on my side!",
    "The price is high, for standing on my way...",
    "Your soul is mine!",
    "Get out of my way, monster!",
    "I am the personification of justice!",
    "I come to cleanse this land.",
    "My powers are ready.",
    "Justice will be served!",
    "The light is with me.",
    "I shall not fear.",
    "Come and get it!",
    "I shall be your executioner.",
    "None may challenge me!"
];

const playerQuotes = [
    "Begone, spawn of darkness!",
    "Get on with it.",
    "My fury is unleashed!",
    "This had better be worth it!",
    "For glory!",
    "I stand for the Light.",
    "For honor.",
    "Let's dance!",
    "It's hammer time!",
    "Inhuman beast!",
    "My strength is the Holy Light.",
    "I'll do my best.",
    "I've no time for games.",
    "You dare threaten me?",
    "Nowhere to hide!",
    "I'll give it a shot.",
    "Standing guard.",
    "I am sworn to avenge.",
    "Taste my blade!",
    "Let justice be served!",
    "Die, monster!",
    "I can wait no longer!"
];

const playerQuotesLowHP = [
    "I'm not gonna make it, am I?",
    "You think you can destroy me?",
    "I cannot die!",
    "My brothers and sisters will avenge me!",
    "Gods! I need a miracle!",
    "It is a good day to die... Is it?"
];

const playerQuotesDealsHighDamage = [
    "Wake up! Time to die!",
    "If it bleeds, I can kill it.",
    "Knock-knock.",
    "Bleed, bastard.",
    "Eat this!",
    "I'm vengeance!",
    "Take the pain with silence.",
    "It Is Your Destiny...",
    "Suffer!",
    "For honor, for freedom!",
    "Now feel my wrath!",
    "Accept the pain!",
    "Take it!",
    "For my people!",
    "Take this, you bastard!",
    "You asked for it!",
    "Vengeance!",
    "For my brothers!",
    "I am the law!",
    "Justice has come!"
];

const playerQuotesGetsHighDamage = [
    "You broke my arm!",
    "I ain't got time to bleed.",
    "My god.",
    "Oh, I feel dead.",
    "Do flowers grow around here?",
    "Is that the best you can do?",
    "I'm awake... I'm awake."
];

const playerQuotesWin = [
    "Terminated.",
    "I need a vacation.",
    "Must be my lucky day.",
    "Why do we fall? So that we can learn to pick ourselves up.",
    "The world only makes sense if you force it to.",
    "War... War never changes.",
    "I don't believe it! I can't believe it!",
    "This Will Be A Day Long Remembered...",
    "All I Am Surrounded By Is Fear... And Dead Men.",
    "Veni, vidi, vici...",
    "For the king!",
    "This battle is over!"
];



// ENEMY QUOTES

const enemyQuotesStart = [
"Let da wardrum play!",
"Smashing time! Hahaha!",
"To live is to kill!",
"<Ununderstandable noise>",
"Grrrrrkh!",
"AAAAAAAAAAAAA!"
];

const enemyQuotes = [
"Your bones. Give it to me!",
"Grhaka Maka Rrrrrua!",
"I will spit on Your dead flesh!",
"...",
"Waka Waka!",
"Your skull will be my trophy!",
"I need new leather for my war drum!",
"Your meat will enrich the flavor of my soup.",
"Eating people is my passion!",
"How long is Your spine? I hope it's enough for my chair."
];

const enemyQuotesDealsHighDamage = [
"Eating time gets closer!",
"This is what I do best!",
"Don't bleed too much! I won't drink it from the ground!",
"Please, don't run! I enjoy it so much!"
];

const enemyQuotesGetsHighDamage = [
"...",
"I don't wanna die!",
"If I die, I will kill You!",
"I am hungry.",
"I am motivated by pain!",
"Red water comes out!",
"You only pissed me!"
];

const enemyQuotesWin = [
"Eating time!",
"I cannot wait for another fight!",
"Smashing hoomans, dwarfs and elves gives me always pleasure!",
"I don't even know, what is more valuable, Your gold, or Your lungs!",
"Hahahahaha! Ratatatata!",
];




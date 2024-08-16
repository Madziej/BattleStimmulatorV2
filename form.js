let characterName = "";


const forbiddenNames = ["","Adolf Hitler","AdolfHitler","adolf hitler","Kurwa","kurwa","Chuj","Joseph Stalin","Dziwka","Slut","Penis","Pizda","Gowno","Twoja Stara","Szmata","Boobs","Kutas","Kootas","Dupa","Szambo","Arschloch","huj","sraka","Jebaka","Che Guevara","Wladimir Putin", "Osama Binladen","Stepan Bandera","Charles Manson"];

function setCharacterName(characterName){
event.preventDefault();
characterName = document.getElementById(`name`).value;

if(forbiddenNames.includes(characterName)){

console.log(`This name is forbidden. Please enter name again.`);  
document.getElementById(`errorName`).innerHTML = "This name is forbidden. Please enter name, that is appropriate." ;

}
else { 
    console.log(`Character name is ${characterName}`);
    document.getElementById(`errorName`).innerHTML = "This name is valid :)" ;

}

}











let pickedProfessionByPlayer = '';
let pickedRaceByPlayer = '';
let pickedAmuletByPlayer = null;

let playerArmor = "";
let ObjArmor = "";
let playerWeapon = "";
let ObjWeapon = "";

let dmgAbsorb = 0;
let dmgBonus = 0;


/*Roll Values*/

let rollHP = 0;
let rollAP = 0;
let rollHC = 0;
let rollINI = 0;


/*Bonuses*/ 

let apBonus = 0;
let iniBonus = 0;
let hpBonus = 0;
let hcBonus = 0;

/* Final Values */
let HP = 0;
let AP = 0;
let HC = 0;
let INI = 0;

function resetModifiers() {
    apBonus = 0;
    iniBonus = 0;
    hpBonus = 0;
    hcBonus = 0;
}

function setModifiersByRace(race) {
    if (race) { 
        apBonus += race.attackPowerModifier;
        iniBonus += race.initiativeModifier;
        hpBonus += race.hitPointModifier;
        hcBonus += race.hitChanceModifier;
    }
}

function setModifiersByClass(profession) {
    if (profession) { 
        apBonus += profession.attackPowerModifier;
        iniBonus += profession.initiativeModifier;
        hpBonus += profession.hitPointModifier;
        hcBonus += profession.hitChanceModifier;
    }
}

function setModifiersByAmulet(amulet) {
    if (amulet) {
        apBonus += amulet.attackPowerModifier;
        iniBonus += amulet.initiativeModifier;
        hpBonus += amulet.hitPointModifier;
        hcBonus += amulet.hitChanceModifier;
    }
}

function injectModifiers() {
    document.getElementById('hpModifier').innerHTML = hpBonus; 
    document.getElementById('apModifier').innerHTML = apBonus; 
    document.getElementById('hcModifier').innerHTML = hcBonus; 
    document.getElementById('iniModifier').innerHTML = iniBonus; 
    
    console.log("HP Bonus:", hpBonus);
    console.log("AP Bonus:", apBonus);
    console.log("HC Bonus:", hcBonus);
    console.log("INI Bonus:", iniBonus);
}

class Race { 
    constructor(name, hitPointModifier, attackPowerModifier, initiativeModifier, hitChanceModifier) {
        this.name = name;
        this.attackPowerModifier = attackPowerModifier;
        this.initiativeModifier = initiativeModifier;
        this.hitPointModifier = hitPointModifier;
        this.hitChanceModifier = hitChanceModifier;
    }
}

const Human = new Race('Human', 0, 0, 0, 10);
const Elf = new Race('Elf', 0, 0, 4, 0);
const Dwarf = new Race('Dwarf', 15, 0, 0, 0);

class Profession { 
    constructor(name, hitPointModifier, attackPowerModifier, initiativeModifier, hitChanceModifier) {
        this.name = name;
        this.attackPowerModifier = attackPowerModifier;
        this.initiativeModifier = initiativeModifier;
        this.hitPointModifier = hitPointModifier;
        this.hitChanceModifier = hitChanceModifier;
    }
}

const Warrior = new Profession('Warrior', 0, 0, 0, 10);
const Rogue = new Profession('Rogue', 0, 0, 4, 0);
const Barbarian = new Profession('Barbarian', 7, 0, 0, 0);

class Amulet { 
    constructor(name, hitPointModifier, attackPowerModifier, initiativeModifier, hitChanceModifier) {
        this.name = name;
        this.attackPowerModifier = attackPowerModifier;
        this.initiativeModifier = initiativeModifier;
        this.hitPointModifier = hitPointModifier;
        this.hitChanceModifier = hitChanceModifier;
    }
}

const AmuletOfLife = new Amulet('Amulet of Life', 10, 0, 0, 0);
const AmuletOfInitiative = new Amulet('Amulet of Initiative', 0, 0, 5, 0);
const AmuletOfStrength = new Amulet('Amulet of Strength', 0, 5, 0, 0);
const AmuletOfLuck = new Amulet('Amulet of Luck', 0, 0, 0, 5);



class Armor{
constructor(name,armorModifier){

    this.name = name;
    this.armorModifier = armorModifier;
}
}

const LeatherArmor = new Armor(`Leather Armor`,3);
const Chainmail = new Armor(`Chainmail`,6);
const PlateArmor = new Armor(`Plate Armor`,9);

function setDmgAbsorbByArmor(Armor){

if(Armor){
    dmgAbsorb += Armor.armorModifier;
}

}


class Weapon{
constructor(name,weaponModifier){
this.name = name;
this.weaponModifier = weaponModifier;
}
}
const WoodenClub = new Weapon(`Wooden Club`,3);
const Axe = new Weapon(`Axe`,6);
const TwoHandedSword = new Weapon(`Two Handed Sword`,10);

function setDmgBonusByWeapon (Weapon){

    if(Weapon){

        dmgBonus += Weapon.weaponModifier;

    }
}







function setDefaultRaceAndClass() {
    pickedRaceByPlayer = Human; 
    pickedProfessionByPlayer = Warrior; 
    pickedAmuletByPlayer = null;
    resetModifiers();
    setModifiersByRace(Human);
    setModifiersByClass(Warrior);
    document.getElementById('race').value = pickedRaceByPlayer.name;
    document.getElementById('class').value = pickedProfessionByPlayer.name;

    console.log(`Default race: ${pickedRaceByPlayer.name}`);
    console.log(`Default profession: ${pickedProfessionByPlayer.name}`);
}

function selectRace() {
    const raceSelect = document.getElementById('race').value;
    if (raceSelect === 'Human') {
        pickedRaceByPlayer = Human;
    } else if (raceSelect === 'Elf') {
        pickedRaceByPlayer = Elf;
    } else if (raceSelect === 'Dwarf') {
        pickedRaceByPlayer = Dwarf;
    }
    resetModifiers(); 
    setModifiersByRace(pickedRaceByPlayer);
    setModifiersByClass(pickedProfessionByPlayer);
    setModifiersByAmulet(pickedAmuletByPlayer);
    injectModifiers();
    generateAllFinalStats();
    console.log(`Race has been changed to: ${pickedRaceByPlayer.name}`);
}

function selectProfession() {
    const professionSelect = document.getElementById('class').value;
    if (professionSelect === 'Warrior') {
        pickedProfessionByPlayer = Warrior;
    } else if (professionSelect === 'Rogue') {
        pickedProfessionByPlayer = Rogue;
    } else if (professionSelect === 'Barbarian') {
        pickedProfessionByPlayer = Barbarian;
    }
    resetModifiers(); 
    setModifiersByRace(pickedRaceByPlayer);
    setModifiersByClass(pickedProfessionByPlayer);
    setModifiersByAmulet(pickedAmuletByPlayer);
    injectModifiers();
    generateAllFinalStats();
    console.log(`Class has been changed to: ${pickedProfessionByPlayer.name}`);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const armors = ["leather armor", "chainmail", "plate armor"];
const weapons = ["wooden club", "axe", "two handed sword"];
const amulets = ["Amulet of Life", "Amulet of Initiative", "Amulet of Strength", "Amulet of Luck"];

function getRandomEquipment(array) {
    let i = getRandomInt(0, array.length - 1);
    console.log(`Roll has decided:  ${array[i]}`);
    return array[i];
}

function generateArmor() {
   playerArmor = document.getElementById('armorResult').innerText = getRandomEquipment(armors);

    const button = document.getElementById('armorButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';


    if (playerArmor == "leather armor"){

        ObjArmor = LeatherArmor;
       /* setDmgAbsorbByArmor(LeatherArmor);*/
    }
    else if (playerArmor == "chainmail"){
        ObjArmor = Chainmail;
        /*setDmgAbsorbByArmor(Chainmail);*/
    }
    else if (playerArmor == "plate armor"){
        ObjArmor = PlateArmor;
        /*setDmgAbsorbByArmor(PlateArmor);*/
    }
    setDmgAbsorbByArmor(ObjArmor);
    document.getElementById(`damageAbsorb`).innerHTML = dmgAbsorb;
}

function generateWeapon() {
   playerWeapon = document.getElementById('weaponResult').innerText = getRandomEquipment(weapons);

    const button = document.getElementById('weaponButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';


    if(playerWeapon == "wooden club"){
        ObjWeapon = WoodenClub;
    }
    else if(playerWeapon == "axe"){
        ObjWeapon = Axe;
    }
    else if(playerWeapon == "two handed sword"){
        ObjWeapon = TwoHandedSword;
    }

    setDmgBonusByWeapon(ObjWeapon);
    document.getElementById(`damageBonus`).innerHTML = dmgBonus;

}

function generateAmulet() {
    let amuletName = getRandomEquipment(amulets);
    document.getElementById('amuletResult').innerText = amuletName;

    if (amuletName === 'Amulet of Life') {
        pickedAmuletByPlayer = AmuletOfLife;
    } else if (amuletName === 'Amulet of Initiative') {
        pickedAmuletByPlayer = AmuletOfInitiative;
    } else if (amuletName === 'Amulet of Strength') {
        pickedAmuletByPlayer = AmuletOfStrength;
    } else if (amuletName === 'Amulet of Luck') {
        pickedAmuletByPlayer = AmuletOfLuck;
    }

    resetModifiers();
    setModifiersByRace(pickedRaceByPlayer);
    setModifiersByClass(pickedProfessionByPlayer);
    setModifiersByAmulet(pickedAmuletByPlayer);
    injectModifiers();
    console.log(`Generated Amulet: ${pickedAmuletByPlayer.name}`);

    const button = document.getElementById('amuletButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    amuletModifierDisplay();
    generateAllFinalStats();

}

function selectAmulet() {
    const amuletSelect = document.getElementById('amulet').value;
    if (amuletSelect === 'Amulet of Life') {
        pickedAmuletByPlayer = AmuletOfLife;
    } else if (amuletSelect === 'Amulet of Initiative') {
        pickedAmuletByPlayer = AmuletOfInitiative;
    } else if (amuletSelect === 'Amulet of Strength') {
        pickedAmuletByPlayer = AmuletOfStrength;
    } else if (amuletSelect === 'Amulet of Luck') {
        pickedAmuletByPlayer = AmuletOfLuck;
    }
    resetModifiers();
    setModifiersByRace(pickedRaceByPlayer);
    setModifiersByClass(pickedProfessionByPlayer);
    setModifiersByAmulet(pickedAmuletByPlayer);  
    injectModifiers();
    console.log(`Amulet has been changed to: ${pickedAmuletByPlayer.name}`);
    amuletModifierDisplay();
    generateAllFinalStats();
}

function amuletModifierDisplay() {
    if (pickedAmuletByPlayer == AmuletOfLife) {
        document.getElementById('amuletModifier').innerHTML = "Gains additional Hit Points";
    } else if (pickedAmuletByPlayer == AmuletOfStrength) {
        document.getElementById('amuletModifier').innerHTML = "Gains additional Attack Power";
    } else if (pickedAmuletByPlayer == AmuletOfLuck) {
        document.getElementById('amuletModifier').innerHTML = "Gains additional Hit Chance";
    } else if (pickedAmuletByPlayer == AmuletOfInitiative) {
        document.getElementById('amuletModifier').innerHTML = "Gains additional Initiative Points";
    }
}



function generateHitPoints(){
    console.log(`Hit Points:`);
    rollHP =  getRandomInt(25,50);
    document.getElementById(`hpResult`).innerText = rollHP;
    console.log(rollHP);
    generateFinalHP();

    const button = document.getElementById('hpButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
}



function generateAttackPower() {
    console.log(`Attack Power:`);
    rollAP = getRandomInt(10, 20); 
    document.getElementById('apResult').innerText = rollAP; 
    console.log(rollAP); 
    generateFinalAP();

    const button = document.getElementById('apButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
}

function generateHitChance() {
    console.log(`Hit Chance:`);
    rollHC = getRandomInt(40, 70); 
    document.getElementById('hcResult').innerText = rollHC; 
    console.log(rollHC); 
    generateFinalHC();

    const button = document.getElementById('hcButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
}

function generateInitiative() {
    console.log(`Initiative:`);
    rollINI = getRandomInt(1, 10); 
    document.getElementById('iniResult').innerText = rollINI; 
    console.log(rollINI); 
    generateFinalIni();

    const button = document.getElementById('iniButton');
    button.disabled = true;
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
}



/*Defining final Values :) */

function generateFinalHP(){

HP = rollHP + hpBonus;
document.getElementById(`finalHpResult`).innerHTML = HP;
console.log(`Final HP: ${HP}`);

}


function generateFinalAP(){

AP = rollAP + apBonus;
document.getElementById(`finalApResult`).innerHTML = AP;
console.log(`Final AP: ${AP}`);

}


function generateFinalHC(){

HC = rollHC + hcBonus;
document.getElementById(`finalHcResult`).innerHTML = HC;
console.log(`Final HC: ${HC}`);

}

function generateFinalIni(){

INI = rollINI + iniBonus;
document.getElementById(`finalIniResult`).innerHTML = INI;
console.log(`Final Ini: ${INI}`);
}

function generateAllFinalStats(){

generateFinalAP();
generateFinalHC();
generateFinalHP();
generateFinalIni();

}


setDefaultRaceAndClass();
injectModifiers();







/*  SAVE/END BUTTON    */

function saveCharacter() {

    const character = {

        name: characterName,
        race: pickedRaceByPlayer,
        profession: pickedProfessionByPlayer,
        hp: HP,
        ap: AP,
        hc: HC,
        ini: INI,
        armor: playerArmor,
        dmgAbsorb: dmgAbsorb,
        weapon: playerWeapon,
        dmgBonus: dmgBonus,
        amulet: pickedAmuletByPlayer
    }

    localStorage.setItem(`character`,JSON.stringify(character));
    console.log(`Character saved: ${characterName}`);
    console.log(characterName);
    alert(`Character ${characterName} has been saved!`);
}



function verifyName(){

    characterName = document.getElementById('name').value;

    if(forbiddenNames.includes(characterName)){

        /*Komunikaty */
        console.log(`ERROR 666 - This name is forbidden. Please enter name again.`);  
        document.getElementById(`errorName`).innerHTML = "This name is forbidden. Please enter name, that is appropriate." ;
        document.getElementById(`errorWindow`).innerHTML = " ERROR 666! Please correct name of the character. Actual one is unacceptable.";
        
        /*Scrollowanie */
        document.getElementById('name').scrollIntoView({ behavior: 'smooth' });


      


        return false;

        }
        else { 


        console.log(`Character name is ${characterName}`);
        document.getElementById(`errorName`).innerHTML = "This name is valid :)" ;

     
        return true; 

        
        }



}



function verifyStatistics(){
   
    if (rollHP == 0 || rollAP == 0 || rollHC == 0 || rollINI == 0 || ObjArmor == "" || ObjWeapon == ""|| pickedAmuletByPlayer == null) {

        console.log(`Please finish rolling all statistics! Your Character is not complete!`);
        document.getElementById(`errorWindow`).innerHTML = "ERROR 777 !!!!  Please set all statictics. Without it, Your character is incomplete!";
        document.getElementById('name').scrollIntoView({ behavior: 'smooth' });
        return false;
    }

    else{
        return true;
    }


}





function endButtonHandler(){

verifyName();
if (!verifyName()) {
    return; 
}

verifyStatistics();
if (!verifyStatistics()) {
    return; 
}


saveCharacter();
gateway();
}


function gateway(){

    window.location.href = `index3.html`;
}




/* szemrana funkcja blokujaca odswiezanie */
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});
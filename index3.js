function loadCharacterData() {
    const characterData = localStorage.getItem('character');

    if (!characterData) {
        console.log('No character data found');
        alert('No saved character data found!');
        return;
    }

    const character = JSON.parse(characterData);

    characterName = character.name;
    pickedRaceByPlayer = character.race.name;
    pickedProfessionByPlayer = character.profession.name;
    HP = character.hp;
    AP = character.ap;
    HC = character.hc;
    INI = character.ini;
    playerArmor = character.armor;
    dmgAbsorb = character.dmgAbsorb;
    playerWeapon = character.weapon;
    dmgBonus = character.dmgBonus;
    pickedAmuletByPlayer = character.amulet.name;

    console.log(`Character loaded: ${characterName}`);
    console.log(character);

    alert(`Character ${characterName} has been loaded!`);

    playerScheme = new playerCard(
        characterName, 
        pickedRaceByPlayer, 
        pickedProfessionByPlayer, 
        HP, 
        AP, 
        HC, 
        INI, 
        playerArmor, 
        dmgAbsorb, 
        playerWeapon, 
        dmgBonus, 
        pickedAmuletByPlayer
    );
    displayCharacterCard();
    updatePlayerAvatar();
}


class playerCard {
    constructor(characterName, pickedRaceByPlayer, pickedProfessionByPlayer, HP, AP, HC, INI, playerArmor, dmgAbsorb, playerWeapon, dmgBonus, pickedAmuletByPlayer) {
        this.characterName = characterName;
        this.pickedRaceByPlayer = pickedRaceByPlayer;
        this.pickedProfessionByPlayer = pickedProfessionByPlayer;
        this.HP = HP;
        this.AP = AP;
        this.HC = HC;
        this.INI = INI;
        this.playerArmor = playerArmor;
        this.dmgAbsorb = dmgAbsorb;
        this.playerWeapon = playerWeapon;
        this.dmgBonus = dmgBonus;
        this.pickedAmuletByPlayer = pickedAmuletByPlayer;
    }

    toHTML() {
        return `
            <p>Name: ${this.characterName}</p>
            <p>Race: ${this.pickedRaceByPlayer}</p>
            <p>Profession: ${this.pickedProfessionByPlayer}</p>
            <p>HP: ${this.HP}</p>
            <p>AP: ${this.AP}</p>
            <p>HC: ${this.HC}</p>
            <p>INI: ${this.INI}</p>
            <p>Armor: ${this.playerArmor}</p>
            <p>Dmg Absorb: ${this.dmgAbsorb}</p>
            <p>Weapon: ${this.playerWeapon}</p>
            <p>Dmg Bonus: ${this.dmgBonus}</p>
            <p>Amulet: ${this.pickedAmuletByPlayer}</p>
        `;
    }
}

let playerScheme;

function displayCharacterCard() {
    if (playerScheme) {
        document.getElementById('playerCardText').innerHTML = playerScheme.toHTML();
    } else {
        document.getElementById('playerCardText').innerHTML = 'No character data to display';
    }
}

loadCharacterData();



function updatePlayerAvatar() {

    let avatarSocket = document.getElementById(`playerAvatarSocket`);
    avatarSocket.innerHTML = ``;



    let avatarImage = document.createElement(`img`);
    if (pickedRaceByPlayer === "Human") {
        avatarImage.src = `HumanAvatar.jpg`;
    } else if (pickedRaceByPlayer === "Elf"){
        avatarImage.src = `elf.jpg`;
    } else if (pickedRaceByPlayer === "Dwarf"){
        avatarImage.src = `dwarf.jpg`;
    }


    avatarImage.style.width = '100px';
    avatarImage.style.height = '100px';

    avatarSocket.appendChild(avatarImage);


}










class opponent {
    constructor(opponentName, opponentHP, opponentAP, opponentHC, opponentINI,avatar) {
        this.opponentName = opponentName;
        this.opponentHP = opponentHP;
        this.opponentAP = opponentAP;
        this.opponentHC = opponentHC;
        this.opponentINI = opponentINI;
        this.avatar = avatar; 
    }

    opponentToHTML() {
        return `
            <div>
                <img src="${this.avatar}" alt="${this.opponentName}" style="width: 100px; height: 100px;">
                <p>${this.opponentName}</p>
                <p>HP: ${this.opponentHP} AP: ${this.opponentAP} HC: ${this.opponentHC} INI: ${this.opponentINI}</p>
            </div>
        `;
    }



    

}

const goblin = new opponent("Goblin", 35, 10, 35, 7, 'goblin.jpg');
const orc = new opponent("Orc", 45, 14, 35, 8, 'orc.jpg');
const troll = new opponent("Troll", 50, 16, 40, 9, 'troll.jpg');
const trollBerserker = new opponent("Troll Berserker", 60, 18, 40, 15, 'trollBerserker.jpg');
const ogre = new opponent("Ogre", 70, 22, 37, 6, 'ogre.jpg');
const ogreBerserker = new opponent("Ogre Berserker", 75, 25, 40, 12, 'ogreBerserker.jpg');
const dragon = new opponent("Dragon", 100, 45, 30, 7, 'dragon.jpg');


const opponentMap = {
    "Goblin": goblin,
    "Orc": orc,
    "Troll": troll,
    "Troll Berserker": trollBerserker,
    "Ogre": ogre,
    "Ogre Berserker": ogreBerserker,
    "Dragon": dragon
};




function displayOpponents() {
    document.getElementById('opponent1').innerHTML = goblin.opponentToHTML();
    document.getElementById('opponent2').innerHTML = orc.opponentToHTML();
    document.getElementById('opponent3').innerHTML = troll.opponentToHTML();
    document.getElementById('opponent4').innerHTML = trollBerserker.opponentToHTML();
    document.getElementById('opponent5').innerHTML = ogre.opponentToHTML();
    document.getElementById('opponent6').innerHTML = ogreBerserker.opponentToHTML();
    document.getElementById('opponent7').innerHTML = dragon.opponentToHTML();
    }

    
    displayOpponents();












let opponents = ["opponent1","opponent2","opponent3","opponent4","opponent5","opponent6","opponent7"];


let opponentChoiceByPlayer = "";


function opponentChoiceByUser() {

let choiceModulo;
choiceModulo = document.querySelector('input[name="opponent"]:checked').value;

if (choiceModulo == "opponent1") {
    opponentChoiceByPlayer = goblin.opponentName;
} else if (choiceModulo == "opponent2") {
    opponentChoiceByPlayer = orc.opponentName;
} else if (choiceModulo == "opponent3") {
    opponentChoiceByPlayer = troll.opponentName;
} else if (choiceModulo == "opponent4") {
    opponentChoiceByPlayer = trollBerserker.opponentName;
} else if (choiceModulo == "opponent5") {
    opponentChoiceByPlayer = ogre.opponentName;
} else if (choiceModulo == "opponent6") {
    opponentChoiceByPlayer = ogreBerserker.opponentName;
} else if (choiceModulo == "opponent7") {
    opponentChoiceByPlayer = dragon.opponentName;
}
console.log(`Player has chosen ${opponentChoiceByPlayer}`);
document.getElementById('errorLog2').innerHTML = `Player has chosen ${opponentChoiceByPlayer}`;

}




function randomizeEnemy() {
    let i = Math.floor(Math.random() * opponents.length);
    let randomizedOpponent = opponents[i];
    console.log(`Opponent randomized: ${randomizedOpponent}`);
          
    if (randomizedOpponent == "opponent1") {
        opponentChoiceByPlayer = goblin.opponentName;
    } else if (randomizedOpponent == "opponent2") {
        opponentChoiceByPlayer = orc.opponentName;
    } else if (randomizedOpponent == "opponent3") {
        opponentChoiceByPlayer = troll.opponentName;
    } else if (randomizedOpponent == "opponent4") {
        opponentChoiceByPlayer = trollBerserker.opponentName;
    } else if (randomizedOpponent == "opponent5") {
        opponentChoiceByPlayer = ogre.opponentName;
    } else if (randomizedOpponent == "opponent6") {
        opponentChoiceByPlayer = ogreBerserker.opponentName;
    } else if (randomizedOpponent == "opponent7") {
        opponentChoiceByPlayer = dragon.opponentName;
    }

    console.log(`Character chosen by Random Button is ${opponentChoiceByPlayer}`);
    document.getElementById('errorLog2').innerHTML = `Character chosen by Random Button is ${opponentChoiceByPlayer}`;
}

          



function verifyChoice(){


/* Test - czy przeciwnik zostal wybrany */

if (opponentChoiceByPlayer == ""){

console.log(`You have to choose opponent to proceed further.`);
document.getElementById('errorLog1').innerHTML = `You have to choose opponent to proceed further.`;
return false;
}
else {
return true;
}
}


function saveCharacterData() {
    const character = {
        name: characterName,
        race: { name: pickedRaceByPlayer },
        profession: { name: pickedProfessionByPlayer },
        hp: HP,
        ap: AP,
        hc: HC,
        ini: INI,
        armor: playerArmor,
        dmgAbsorb: dmgAbsorb,
        weapon: playerWeapon,
        dmgBonus: dmgBonus,
        amulet: { name: pickedAmuletByPlayer }
    };

    localStorage.setItem('character', JSON.stringify(character));
    console.log(`Character ${character.name} has been saved!`);
    alert(`Character ${character.name} has been saved!`);
}



function saveOpponentData(){

    const finalOpponent = opponentMap[opponentChoiceByPlayer];

    localStorage.setItem('opponent', JSON.stringify(finalOpponent));
    console.log(`Opponent ${finalOpponent.opponentName} has been saved!`);
    alert(`Opponent ${finalOpponent.opponentName} has been saved!`);

}


function gatewayToTheBattle(){

    window.location.href = `index4.html`;

}



function startButton(){


    verifyChoice();

    if (!verifyChoice()) {
        return; 
    }

    saveCharacterData();
    saveOpponentData();
    gatewayToTheBattle();
}

/* szemrana funkcja blokujaca odswiezanie */
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});
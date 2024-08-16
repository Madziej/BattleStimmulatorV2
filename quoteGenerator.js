const quotes = [
    { text: "It is better to conquer yourself than to win a thousand battles. Then the victory is yours. It cannot be taken from you, not by angels or by demons, heaven or hell.", author: "Buddha" },
    { text: "Some of the greatest battles will be fought within the silent chambers of your own soul.", author: "Ezra Taft Benson" },
    { text: "Never interrupt your enemy when he is making a mistake.", author: "Napoleon Bonaparte" },
    { text: "If you wish to be a success in the world, promise everything, deliver nothing.", author: "Napoleon Bonaparte" },
    { text: "Impossible is a word to be found only in the dictionary of fools.", author: "Napoleon Bonaparte" },
    { text: "Victory belongs to the most persevering.", author: "Napoleon Bonaparte" },
    { text: "The battlefield is a scene of constant chaos. The winner will be the one who controls that chaos, both his own and the enemies.", author: "Napoleon Bonaparte" },


    { text: "In the face of pain there are no heroes.", author: "George Orwell" },
    { text: "Great heroes need great sorrows and burdens, or half their greatness goes unnoticed. It is all part of the fairy tale.", author: "Peter S. Beagle" },
    { text: "Men have to have heroes, but no man can ever be as big as the need, and so a legend grows around a grain of truth, like a pearl.", author: "Peter S. Beagle" },
    { text: "Only a small part is played in great deeds by any hero.", author: "J.R.R. Tolkien" },
    { text: "Part of ... being a hero is knowing when you don’t need to be one anymore.", author: "Alan Moore" },
    { text: "ALL I AM SURROUNDED BY IS FEAR, AND DEAD MEN.", author: "Lord Vader" },
    { text: "Be careful not to choke on your aspirations.", author: "Lord Vader" },
    { text: "We will find a way or we shall make one.", author: "Hannibal" },
    { text: "Killing must feel good to God too. He does it all the time. Did God feel good about that? He felt powerful.", author: "Hannibal" },
    { text: "All good things to those, who wait.", author: "Hannibal" },
    { text: "Someone once said that politics is little more than the systematic organization of hostilities.", author: "Tarkin" },
    { text: "Never try to live decently, boy—not unless you’re willing to open your life to tragedy and sadness. Live like a beast, and no event, no matter how harrowing, will ever be able to move you.", author: "Tarkin" },
    { text: "You see how easy it is to go from having everything to having nothing?", author: "Tarkin" },
    { text: "A man must accept his fate or be destroyed by it", author: "Spartacus" },
    { text: "When a free man dies, he loses the pleasure of life. A slave loses his pain. Death is the only freedom a slave knows. That's why he's not afraid of it. That's why we'll win.", author: "Spartacus" },

    { text: "Whatever happens, it happens because we choose for it. We decide our fates.", author: "Spartacus" },
    { text: "There is but one path. We must kill them all.", author: "Spartacus" },
    { text: "Gladiators seek to best all, it is how they survive", author: "Spartacus" },
    { text: "The greatest enemy will hide in the last place you would ever look.", author: "Julius Caesar" },
    { text: "A coward dies a thousand deaths, the gallant never taste of death but once.", author: "Julius Caesar" },
    { text: "Experience is the teacher of all things.", author: "Julius Caesar" },
    { text: "If I fail it is only because I have too much pride and ambition.", author: "Julius Caesar" },
    { text: "It is better to suffer once than to be in perpetual apprehension.", author: "Julius Caesar" },
    { text: "Pick battles big enough to matter, small enough to win.", author: "Jonathan Kozol" },
    { text: "To fight and conquer in all our battles is not supreme excellence; supreme excellence consists in breaking the enemy's resistance without fighting.", author: "Sun Tzu" },
    { text: "If your opponent is of choleric temper, irritate him.", author: "Sun Tzu" },
    { text: "He who knows when he can fight and when he cannot, will be victorious.", author: "Sun Tzu" },
    { text: "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.", author: "Sun Tzu" },
    { text: "Invincibility lies in the defence; the possibility of victory in the attack.", author: "Sun Tzu" },
    { text: "Mastering others is strength. Mastering yourself is true power.", author: "Lao Tzu" },
    
    
    { text: "I am the punishment of God...If you had not committed great sins, God would not have sent a punishment like me upon you.", author: "Genghis Khan" },
    { text: "Cry 'Havoc!', and let slip the dogs of war.", author: "William Shakespeare, Julius Caesar" },
    { text: "It is better to die on your feet than to live on your knees.", author: "Emiliano Zapata" },
    { text: "In war, truth is the first casualty.", author: "Aeschylus" },
    { text: "To the last, I grapple with thee; From hell's heart, I stab at thee; For hate's sake, I spit my last breath at thee.", author: "Herman Melville, Moby-Dick" },
    { text: "The art of war is simple enough. Find out where your enemy is. Get at him as soon as you can. Strike him as hard as you can, and keep moving on.", author: "Ulysses S. Grant" },
    { text: "It is fatal to enter any war without the will to win it.", author: "Douglas MacArthur" },
    { text: "There is no avoiding war; it can only be postponed to the advantage of others.", author: "Niccolò Machiavelli" },
    { text: "War does not determine who is right - only who is left.", author: "Bertrand Russell" },
    { text: "The strong did what they could and the weak suffered what they must.", author: "Thucydides" },
    { text: "The supreme art of war is to subdue the enemy without fighting.", author: "Sun Tzu" },
    { text: "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.", author: "Sun Tzu" },
    { text: "In the midst of chaos, there is also opportunity.", author: "Sun Tzu" },
    { text: "The greatest victory is that which requires no battle.", author: "Sun Tzu" },
    { text: "Bravery is being the only one who knows you’re afraid.", author: "Franklin P. Jones" },
    { text: "War is peace. Freedom is slavery. Ignorance is strength.", author: "George Orwell, 1984" },
    { text: "All war is a symptom of man's failure as a thinking animal.", author: "John Steinbeck" },
    { text: "Appear weak when you are strong, and strong when you are weak.", author: "Sun Tzu" },
    { text: "If you know the enemy and know yourself, you need not fear the result of a hundred battles.", author: "Sun Tzu" },
    { text: "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.", author: "Sun Tzu" },
    { text: "To secure peace is to prepare for war.", author: "Carl von Clausewitz" },
    { text: "War is what happens when language fails.", author: "Margaret Atwood" },
    { text: "War is a series of catastrophes that results in a victory.", author: "Georges Clemenceau" },
    { text: "You can't say civilization don't advance... in every war they kill you in a new way.", author: "Will Rogers" },
    { text: "A sword wields no strength unless the hand that holds it has courage.", author: "Hero's Shade, The Legend of Zelda: Twilight Princess" },
    { text: "A man can be destroyed but not defeated.", author: "Ernest Hemingway, The Old Man and the Sea" },
    { text: "The only easy day was yesterday.", author: "Navy SEALs" },
    { text: "Cowards die many times before their deaths; the valiant never taste of death but once.", author: "William Shakespeare, Julius Caesar" },
    { text: "Never interrupt your enemy when he is making a mistake.", author: "Napoleon Bonaparte" },
    { text: "Fortune favors the brave.", author: "Virgil" },
    { text: "Men are moved by two levers only: fear and self-interest.", author: "Napoleon Bonaparte" },
    { text: "Ten soldiers wisely led will beat a hundred without a head.", author: "Euripides" },
    { text: "War must be, while we defend our lives against a destroyer who would devour all; but I do not love the bright sword for its sharpness, nor the arrow for its swiftness, nor the warrior for his glory. I love only that which they defend.", author: "J.R.R. Tolkien, The Two Towers" },
    { text: "I will not say: do not weep; for not all tears are an evil.", author: "J.R.R. Tolkien, The Return of the King" },
    { text: "Faithless is he that says farewell when the road darkens.", author: "J.R.R. Tolkien, The Fellowship of the Ring" },
    { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
    { text: "A good plan, violently executed now, is better than a perfect plan next week.", author: "George S. Patton" },
    { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
    { text: "It is not these well-fed long-haired men that I fear, but the pale and the hungry-looking.", author: "Julius Caesar" },
    
    { text: "Victory at all costs, victory in spite of all terror, victory however long and hard the road may be; for without victory, there is no survival.", author: "Winston Churchill" },
    { text: "Never in the field of human conflict was so much owed by so many to so few.", author: "Winston Churchill" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "No man is fit to command another that cannot command himself.", author: "William Penn" },
    { text: "The object of war is not to die for your country but to make the other bastard die for his.", author: "George S. Patton" },
    { text: "Wars may be fought with weapons, but they are won by men.", author: "George S. Patton" },
    { text: "If everybody is thinking alike, then somebody isn't thinking.", author: "George S. Patton" },
    { text: "It is foolish and wrong to mourn the men who died. Rather we should thank God that such men lived.", author: "George S. Patton" },

    
    { text: "War. War never changes.", author: "Narrator, Fallout series" },
    { text: "It's dangerous to go alone! Take this.", author: "Old Man, The Legend of Zelda" },
    { text: "You either die a hero, or you live long enough to see yourself become the villain.", author: "Harvey Dent, Batman: Arkham City" },
    { text: "We are the sword. We are the shield. We are the Grey Wardens.", author: "Narrator, Dragon Age: Origins" },
    { text: "No matter how far you push the envelope, it'll still be stationery.", author: "Joel, The Last of Us" },
    { text: "Feel the power of the dark side.", author: "Darth Vader, Star Wars: Battlefront" },
    { text: "A man chooses, a slave obeys.", author: "Andrew Ryan, BioShock" },
    { text: "What is a drop of rain, compared to the storm? What is a thought, compared to a mind?", author: "System Shock 2" },
    { text: "The right man in the wrong place can make all the difference in the world.", author: "G-Man, Half-Life 2" },
    { text: "Stand in the ashes of a trillion dead souls and ask the ghosts if honor matters. The silence is your answer.", author: "Javik, Mass Effect 3" },
    { text: "Nothing is true, everything is permitted.", author: "Ezio Auditore, Assassin's Creed II" },
    { text: "Bring us the girl, and wipe away the debt.", author: "Robert Lutece, BioShock Infinite" },
    { text: "My hatred is unending.", author: "Kerrigan, StarCraft II" },
    { text: "The battle for the city is over. For a few of us, the war continues.", author: "Captain Price, Call of Duty: Modern Warfare" },
    { text: "I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men.", author: "Night's Watch Oath, Game of Thrones" },
    { text: "You can't hide from the Grim Reaper. Especially when he's got a gun.", author: "Grim Fandango" },
    { text: "Heroes never die!", author: "Mercy, Overwatch" },
    { text: "You are not prepared!", author: "Illidan Stormrage, World of Warcraft" },
    { text: "A hero need not speak. When he is gone, the world will speak for him.", author: "Halo 3" }


];

function getRandomInt(min,max){
    return Math.floor(Math.random() *( max - min + 1)+1);
}


function displayRandomQuote(){
const randomIndex = getRandomInt(0, quotes.length -1);
const quote = quotes[randomIndex];
document.getElementById('quote').textContent = `"${quote.text}"`;
document.getElementById('author').textContent = `"${quote.author}"`;
 }

window.onload = displayRandomQuote;
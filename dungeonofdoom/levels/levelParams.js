const prologue = {
    chapterTitle: "Prologue",
    text: [
        "You awake to the sound of screams and battle. The smell of burning in the air and the glow of fire on the night sky. You run to the window and look outside. The village is burning and horrors move in an our of the flickering shadows, butchering your friends and neighbours.",
        "A banging shakes the door of your cottage in its hinges. Dust puffs from the frame and someone (or something) tries to batter down the door. You hear a groan from outside and a barely human voice whispering in a strange hypnotic cadence.", 
        "Without thinking, you run to your daughter's room and shake her from her slumber. Her eyes look back at you in terror as you whisper to her to remain quiet and come with you. Just as you head to the back room and the back door, you hear a huge crash and the shuffling of dead things entering your house. You run to the back door and fling it open to the end of the world.",
        "As you hesitate, stunned at the brutality on display around you, you feel cold claws grip you from behind in a vice like grip, dragging you to the floor and away from your daughter as she screams and reaches for you.",
        "A sharp blow is dealt to the back of your head and the last thing you see before losing consciousness is a robed figure, flanked by undead, dragging your daughter out of the village. You hear the robed figure hiss “Leave him alive, his suffering will be delicious.”",
        "You awake in the morning, a light rain on your face that has doused the worst of the fires, leaving the ruins of the village smouldering in the thin morning light. You look around and see hopelessness on the face of the people as they come to terms with their own grief and loss.",
        "But you are not one to grieve. You are the terror of demons, the banisher of undead. You are the light in the darkness. The necromancer will pay for his transgressions.",
        "You rise, walk into the remains of your cottage and open the hidden trap door under the rug. You calmly and methodically pull out your sword, shield and armour, strap it to your body and march out of the village, following the trail of destruction left by those that took your daughter...",
        "You know where they are headed.",
        "Crandalholme Castle."
    ]
}
const epilogue = {
    chapterTitle: "Epilogue",
    text: [
        "Epilogue goes here"
    ]  
}
const levelParams = [
    {
        chapterTitle: "Chapter 1: Knock Knock",
        battleLineup: [new Skeleton, new Skeleton, new Skeleton],
        text: [
            "You arrive at the castle after three days forced march. The exterior is quiet and no light shows from the windows.",
            "You approach wearily, knowing you are being watched. Crows flock and caw overhead, indicating the presence of carrion.",
            "As you near the gate, there is a pulsing of energy, dark and sickly, it makes you want to vomit. As you recover and look up, you see three dead things approach. Guardians of the castle with rusty weapons in hand….."
        ],
        tile: "./assets/tiles/grass.png",
        audio: "./assets/sounds/crows-caw.mp3",
        endText: [
            "The last skeleton drops to the ground in a pile of unmoving bone. You turn towards the castle doorway.",
            "The door is stiff, but you force it open and head inside."
        ]
     },
    {
        chapterTitle: "Chapter 2: Hall of Horror",
        battleLineup: [new Ghoul, new Ghoul, new Ghoul],
        text: [
            "The first thing you notice as you open step through the darkened doorway and into a large greeting hall is the stench of putrid blood and the sound of chewing.",
            "As you peer into the dark corners of the hall, you begin to see three hunched shapes slowly become clearer as your eyes adjust to the gloom.",
            "Sensing your presence, the three shapes rise and with guttural snarls, pelt towards you at speed…"
        ],
        tile: "./assets/tiles/greathall.png",
        audio: "",
        endText: [
            "The head of the last ghoul flies from its shoulders and rolls across the floor of the hall.",
            "You hear a scream coming from a staircase and recognise it as your daughter's. You sprint for the staircase."
        ]
    },
    {
        chapterTitle: "Chapter 3: Pit of Evil",
        battleLineup: [new Spider, new Necromancer, new Spider],
        text: [
            "As you reach the bottom of the stairs, you feel a dark pulsing behind your eyes and hear a rhythmic ritualistic chanting building to a crescendo.",
            "The necromancer is in the middle of a ritual circle, knife raised for the killing strike, flanked by two giant spider bodyguards.",
            "Without thinking, you let out a roar and charge towards the necromancer.",
            "He will pay."
        ],
        tile: "./assets/tiles/ritualroom.jpg",
        audio: "",
        endText: [
            "As the necromancer falls, the energy that was building explodes outwards. The chamber starts to come down around you.",
            "You grab your daughter, throw her over your shoulder and run for the exit as the world comes down around you."
        ]
    }
]
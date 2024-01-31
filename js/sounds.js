const audio = {
    shovel: [
        new Audio('/sounds/shovel/pelle1.mp3'),
        new Audio('/sounds/shovel/pelle2.mp3'),
        new Audio('/sounds/shovel/pelle3.mp3'),
        new Audio('/sounds/shovel/pelle4.mp3'),
    ],
    mine: [
        new Audio('/sounds/mine/mine1.mp3'),
    ]
}

function playAudio(audioname) {
    if(!audio[audioname]) return false;

    audio[audioname][getRandomInt(audio[audioname].length)].play()

}
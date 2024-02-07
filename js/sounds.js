const audio = {
    shovel: [
        new Audio('/sounds/shovel/pelle1.mp3'),
        new Audio('/sounds/shovel/pelle2.mp3'),
        new Audio('/sounds/shovel/pelle3.mp3'),
        new Audio('/sounds/shovel/pelle4.mp3'),
    ],
    mine: [
        new Audio('/sounds/mine/mine1.mp3'),
    ],
    flag: [
        new Audio('/sounds/flag/pop-sound-effect.mp3'),
        new Audio('/sounds/flag/happy-pop-2-185287.mp3'),
        new Audio('/sounds/flag/pop-39222.mp3'),
        new Audio('/sounds/flag/pop-94319.mp3'),
    ],
}

function playAudio(audioname) {
    if(!audio[audioname]) return false;

    let rnd = getRandomInt(audio[audioname].length)

    console.log(rnd)

    audio[audioname][rnd].play()

}
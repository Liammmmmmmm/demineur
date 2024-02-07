let gridsizes = [
    {
        name: "riquiqui",
        visibleName: "VRAIMENT débutant",
        x: 8,
        y: 7,
        mines: 10
    },
    {
        name: "small",
        visibleName: "Petit",
        x: 10,
        y: 8,
        mines: 15
    },
    {
        name: "medium",
        visibleName: "Moyen",
        x: 18,
        y: 14,
        mines: 40,
        default: true
    },
    {
        name: "big",
        visibleName: "Grand",
        x: 25,
        y: 20,
        mines: 100
    },
    {
        name: "chomeur",
        visibleName: "CHOMEUR",
        x: 32,
        y: 64,
        mines: 320
    },
    
]

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let shovelcheck = document.getElementById("shovelcheck")
let shovelcookie = getCookie("shovel")
let customcursorcanva = document.getElementById("customCursor")
let stylecustomcursor = document.getElementById("cursorpointer")

if(shovelcookie == "" || shovelcookie == undefined || shovelcookie == "undefined") {
    setCookie("shovel", "true", 30)
    shovelcheck.checked = true
} else {
    if(shovelcookie == "true") {
        shovelcheck.checked = true
    } else {
        customcursorcanva.style.display = "none";
        stylecustomcursor.innerHTML = `
        body {
            cursor: default;
        }
        .custom-cursor {
            cursor: pointer;
        }
        `
    }
}

shovelcheck.addEventListener("click", (e) => {
    shovelcookie = getCookie("shovel")
    if(shovelcookie == "true") {
        setCookie("shovel", "false", 30)
        customcursorcanva.style.display = "none";
        stylecustomcursor.innerHTML = `
        body {
            cursor: default;
        }
        .custom-cursor {
            cursor: pointer;
        }
        `
    } else {
        setCookie("shovel", "true", 30)
        customcursorcanva.style.display = "block";
        stylecustomcursor.innerHTML = ``
    }
});


let firstclick = true;
let isgamestarted = true;
let flagleft;
let flagleftdom = document.querySelector(".flagsleft")
let timers = document.querySelectorAll(".timer")
let timer = 0;
let intervaleuuuuu;
let firstgame = true;
let istimerstarted = true;

let choosendiff = gridsizes.find(element => element.default === true).name

let diff = document.getElementById("diff")
function loaddiff() {
    gridsizes.forEach(element => {
        const choice = document.createElement('option');
        choice.textContent = element.visibleName
        choice.value = element.name
        if(element.default) {
            choice.selected = "true"
        }
        diff.appendChild(choice)
    })
}

diff.addEventListener("change", (event) => {
    choosendiff = event.target.value
    restart()
})

let game
function initgame() {
    game = initGrid(choosendiff)
    if(document.getElementById("game")) document.getElementById("game").remove()
    if(document.getElementById("hide")) document.getElementById("hide").remove()
    generateHTMLGridHide(game)
    document.getElementById("gridcontainer").style.height = document.getElementById("hide").offsetHeight  + "px"
}
initgame()

function restart() {
    initgame()
    firstclick = true;
    isgamestarted = true;
    document.querySelector(".gameover").style.display = "none"
    document.querySelector(".win").style.display = "none"
    timer = 0;
    timers.forEach(element => {
        element.textContent = timer
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function initGrid(gridsize) {
    let gamei = {grid: [], size: gridsize}
    let line = []

    let gridparams = gridsizes.find(element => element.name === gridsize)

    if(gridparams.name == "riquiqui") {
        document.getElementById("riquiqui").innerHTML = "#hide { opacity: .9; }"
    } else {
        document.getElementById("riquiqui").innerHTML = ""
    }

    flagleft = gridparams.mines
    flagleftdom.textContent = flagleft


    for(let i = 0 ; i < gridparams.x ; i++) {
        line.push(0)
    }

    for (let i = 0; i < gridparams.y; i++) {
        let line = Array(gridparams.x).fill(0); // Créer une nouvelle ligne
        gamei.grid.push(line);
    }

    return gamei;
}

function placemines(gamep, excludex, excludey) {
    let gridparams = gridsizes.find(element => element.name === gamep.size)

    let excludedcells = []

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = excludex + i;
            const newY = excludey + j;

            if (newX >= 0 && newX < gridparams.x && newY >= 0 && newY < gridparams.y) {
                excludedcells.push([newX, newY])
            }
        }
    }

    let randomcasex = (getRandomInt(2) == 0 ? -2 : 2) + excludex
    let randomcasey = getRandomInt(3) - 1 + excludey

    if (randomcasex >= 0 && randomcasex < gridparams.x && randomcasey >= 0 && randomcasey < gridparams.y) {
        excludedcells.push([randomcasex, randomcasey])
    }

    for(let i = 0 ; i < gridparams.mines ; i++) {

        let y = getRandomInt(gridparams.y)
        let x = getRandomInt(gridparams.x)

        if(gamep.grid[y][x] == 0 && !excludedcells.some(cell => cell[0] === x && cell[1] === y)) {
            gamep.grid[y][x] = "m";
        } else {
            while(gamep.grid[y][x] != 0 || excludedcells.some(cell => cell[0] === x && cell[1] === y)) {
                y = getRandomInt(gridparams.y)
                x = getRandomInt(gridparams.x)
            }
            gamep.grid[y][x] = "m";
        }

    }

    return gamep
}

function generateHTMLGrid(gameh) {
    const grid = gameh.grid;

    const table = document.createElement('table');
    table.id = "game"

    for (let i = 0; i < grid.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement('td');
            cell.classList.add("background-cell")
            

            if(grid[i][j] == "m") {
                cell.classList.add("mine")
                const mine = document.createElement('div');
                mine.classList.add("mine-element")
                cell.appendChild(mine)
            } else {
                switch (grid[i][j]) {
                    case 0:
                        cell.classList.add("m0");
                        break;
                    default:
                        cell.classList.add("m" + grid[i][j]);
                        cell.textContent = grid[i][j];
                        break;                                      
                }
            
                
                cell.classList.add("nomine")
                cell.id = i + "-" + j
            }
            

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    document.getElementById("gridcontainer").appendChild(table);
}

function generateHTMLGridHide(gameh) {
    const grid = gameh.grid;

    const table = document.createElement('table');
    table.id = "hide"

    for (let i = 0; i < grid.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement('td');

            
            cell.classList.add("hidecell")
            cell.classList.add("custom-cursor")
            cell.id = "h" + i + "-" + j
            cell.setAttribute("onclick", "clickcell(" + i + ", " + j + ")") 
            cell.setAttribute("oncontextmenu", "clickcellright(" + i + ", " + j + ")")
            

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    document.getElementById("gridcontainer").appendChild(table);
}

function addNumbers(gamen) {
    let gridparams = gridsizes.find(element => element.name === gamen.size);
    let grid = gamen.grid;

    for (let y = 0; y < gridparams.y; y++) {
        for (let x = 0; x < gridparams.x; x++) {

            if (grid[y][x] !== "m") {
                let minecount = 0;

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newX = x + i;
                        const newY = y + j;

                        if (newX >= 0 && newX < gridparams.x && newY >= 0 && newY < gridparams.y) {
                            if (grid[newY][newX] === "m") {
                                minecount++;
                            }
                        }
                    }
                }

                if (minecount !== 0) {
                    grid[y][x] = minecount;
                }
            }

        }
    }

    gamen.grid = grid;
    return gamen;
}


function uptimer() {
    if(isgamestarted == false) return;
    if(istimerstarted == false) return;
    timer = timer + 1;
    timers.forEach(element => {
        element.textContent = timer
    })
}

function clickcell(y, x) {
    if(isgamestarted == false) return;
    let cell = document.getElementById("h" + y + "-" + x)
    if(firstclick) {
        game = placemines(game, x, y)
        game = addNumbers(game)    
        generateHTMLGrid(game);
        firstclick = false
        istimerstarted = true
        vibration()
        playAudio("shovel")
    }
    if(firstgame) {
        setInterval(uptimer, 1000)
        firstgame = false;
    }

    if(!cell.classList.contains('mark')) {
        revealCells(y, x)
        playAudio("shovel")
    }

    wingame(game)
}

function vibration() {
    document.getElementById("gridcontainer").style.animation = "shake 0.2s";
    setTimeout(() => {
        document.getElementById("gridcontainer").style.animation = ""
    }, 300)
}
 
function revealCells(y, x) {
    let cell = document.getElementById("h" + y + "-" + x);
    let gridparams = gridsizes.find(element => element.name === game.size);

    if (game.grid[y][x] !== 0) {
        
        if(cell.classList.contains("hidecell") == false) {
            let nbflags = 0
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newX = x + i;
                    const newY = y + j;
    
                    if (newX >= 0 && newX < gridparams.x && newY >= 0 && newY < gridparams.y && document.getElementById("h" + newY + "-" + newX).classList.contains('hidecell') && document.getElementById("h" + newY + "-" + newX).classList.contains('mark')) {
                        nbflags += 1
                    }
                }
            }

            if(nbflags >= parseInt(document.getElementById(y + "-" + x).textContent)) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newX = x + i;
                        const newY = y + j;
        
                        if (newX >= 0 && newX < gridparams.x && newY >= 0 && newY < gridparams.y && document.getElementById("h" + newY + "-" + newX).classList.contains('hidecell') && !document.getElementById("h" + newY + "-" + newX).classList.contains('mark')) {
                                
                            revealCells(newY, newX);
                        }
                    }
                }
            }  
        }

        cell.classList.remove("hidecell")

        if (game.grid[y][x] === "m") {
            playAudio("mine")
            istimerstarted = false
            vibration()
            document.querySelector(".gameover").style.display = "flex";
            document.querySelector(".leftcases").textContent = document.querySelectorAll(".hidecell").length + 1
            stopgame()
            return; // Stop recursion if mine is revealed
        }
    } else {
        // If the clicked cell is empty, reveal it and continue recursively
        cell.classList.remove("hidecell");

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;

                

                if (newX >= 0 &&
                    newX < gridparams.x &&
                    newY >= 0 &&
                    newY < gridparams.y &&
                    document.getElementById("h" + newY + "-" + newX).classList.contains('hidecell')) {
                        
                    revealCells(newY, newX);
                }
            }
        }
    }
}

function clickcellright(y, x) {
    if(isgamestarted == false) return;
    let cell = document.getElementById("h" + y + "-" + x)
    if(cell.classList.contains('hidecell')) {
        playAudio("flag")
        if(cell.classList.contains('mark')) {
            flagleft += 1;
            flagleftdom.textContent = flagleft
            cell.classList.remove("mark")
        } else {
            if(flagleft != 0) {
                flagleft -= 1;
                flagleftdom.textContent = flagleft
                cell.classList.add("mark")
            }
            
        }
        
    }
    
    return false;
}

function wingame(game) {
    let caserestantes = document.querySelectorAll(".hidecell").length
    let gridparams = gridsizes.find(element => element.name === game.size)
    

    if(caserestantes == gridparams.mines) {
        document.querySelector(".win").style.display = "flex"
        stopgame()
    }
}

function stopgame() {   
    isgamestarted = false;
}

window.addEventListener("contextmenu", e => e.preventDefault());
   


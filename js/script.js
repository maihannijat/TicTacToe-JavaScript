var row1, row2, row3
var moveCount, turn, gameStatus

var playerXScore = 0
var playerOScore = 0
var tieScore = 0

function createBoard() {
    row1 = []
    row2 = []
    row3 = []
    moveCount = 0
    turn = "player-x"
    gameStatus = "start"

    var cells = document.querySelectorAll(".cell")

    cells.forEach(function (cell) {
        cell.classList.remove("add-x")
        cell.classList.remove("add-o")
        cell.addEventListener("click", function () {
            move(cell)
        }, false)
    })
}

function move(cell) {

    if (cell.classList.length !== 2 && gameStatus === "start") {
        getCellIndex(cell)

        moveCount++

        if (turn === "player-x") {
            cell.classList.add("add-x")
            addElement("x", cell)
            turn = "player-o"
        } else {
            cell.classList.add("add-o")
            addElement("o", cell)
            turn = "player-x"
        }
    }
}

function addScore() {
    var table = document.querySelectorAll(".status tr td")
    table[0].innerText = playerXScore
    table[1].innerText = tieScore
    table[2].innerText = playerOScore

    gameStatus = "finished"
}

function getCellIndex(cell) {
    var children = cell.parentElement.children

    for (var i = 0; i < children.length; i++) {
        if (children[i] === cell) {
            return i
        }
    }
}

function addElement(element, cell) {
    if (cell.parentElement.className === "row1") {
        row1[getCellIndex(cell)] = element
    } else if (cell.parentElement.className === "row2") {
        row2[getCellIndex(cell)] = element
    } else if (cell.parentElement.className === "row3") {
        row3[getCellIndex(cell)] = element
    }

    checkWin()
}

function checkWin() {

    if ((row1[0] && row1[0] === row1[1] && row1[1] === row1[2])
        ||
        (row2[0] && row2[0] === row2[1] && row2[1] === row2[2])
        ||
        (row3[0] && row3[0] === row3[1] && row3[1] === row3[2])
        ||
        (row1[0] && row1[0] === row2[0] && row2[0] === row3[0])
        ||
        (row1[1] && row1[1] === row2[1] && row2[1] === row3[1])
        ||
        (row1[2] && row1[2] === row2[2] && row2[2] === row3[2])
        ||
        (row1[0] && row1[0] === row2[1] && row2[1] === row3[2])
        ||
        (row1[2] && row1[2] === row2[1] && row2[1] === row3[0])
    ) {
        if (turn === "player-x") {
            ++playerXScore
        } else if (turn === "player-o") {
            ++playerOScore
        }
        addScore()
        return true
    } else if (moveCount === 9) {
        ++tieScore
        addScore()
        return true
    }
}

createBoard()

document.querySelector(".button").addEventListener("click", function () {
    createBoard()
}, false)
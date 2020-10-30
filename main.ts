function RandomNumberGenSpeed () {
    if (RandomSpeed < 5) {
        speed += -10
    } else if (RandomSpeed == 5) {
        speed += 50
    } else if (RandomSpeed > 5) {
        speed += 10
    }
    speed += Math.min(speed, 500)
}
input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
function NewGame () {
    Setup = 0
    Diffucluty_select = 1
    IsAlive = 1
    index = 0
    obstacles = []
    bird = game.createSprite(0, 2)
    bird.set(LedSpriteProperty.Blink, 300)
    speed = 1000
    score = 0
    basic.showString("Select Diffuclty")
    while (Diffucluty_select == 1) {
        if (input.pinIsPressed(TouchPin.P0)) {
            diffculty = 0
            Diffucluty_select = 0
            life = 1
        }
        if (input.pinIsPressed(TouchPin.P1)) {
            diffculty = 1
            Diffucluty_select = 0
            life = 2
        }
        if (input.pinIsPressed(TouchPin.P2)) {
            diffculty = 2
            Diffucluty_select = 0
            life = 3
        }
    }
    if (Diffucluty_select == 0) {
        Setup = 1
    }
}
input.onButtonPressed(Button.AB, function () {
    if (IsAlive == 1) {
        if (game.isPaused()) {
            game.resume()
        } else {
            game.pause()
        }
    } else {
        Play_again = 1
    }
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
let finalscore = 0
let emptyObsticaleY = 0
let ticks = 0
let Play_again = 0
let life = 0
let diffculty = 0
let score = 0
let obstacles: game.LedSprite[] = []
let index = 0
let IsAlive = 0
let Diffucluty_select = 0
let Setup = 0
let bird: game.LedSprite = null
let speed = 0
let RandomSpeed = 0
let HighScore = 0
let HighScore0 = 0
let HighScore1 = 0
let HighScore2 = 0
RandomSpeed = 0
NewGame()
basic.forever(function () {
    if (Setup == 1) {
        while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
            obstacles.removeAt(0).delete()
        }
        for (let obstacle of obstacles) {
            obstacle.change(LedSpriteProperty.X, -1)
        }
        if (ticks % 3 == 0) {
            emptyObsticaleY = randint(0, 4)
            for (let index = 0; index <= 4; index++) {
                if (index != emptyObsticaleY) {
                    obstacles.push(game.createSprite(4, index))
                }
            }
        }
        for (let obstacle of obstacles) {
            if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
                finalscore = score / 4
                game.setScore(finalscore)
                life += -1
                if (diffculty == 0) {
                    if (finalscore > HighScore0) {
                        HighScore = HighScore0
                        HighScore0 = finalscore
                    }
                }
                if (diffculty == 1) {
                    if (finalscore > HighScore1) {
                        HighScore = HighScore1
                        HighScore1 = finalscore
                    }
                }
                if (diffculty == 2) {
                    if (finalscore > HighScore2) {
                        HighScore = HighScore2
                        HighScore2 = finalscore
                    }
                }
                if (life == 0) {
                    if (Play_again == 1) {
                        NewGame()
                    } else {
                        basic.showString("High Score: ")
                        basic.showNumber(HighScore)
                        game.gameOver()
                    }
                }
            }
        }
        for (let obstacle of obstacles) {
            if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X)) {
                score += 1
                RandomSpeed += randint(0, 10)
                if (speed > 750) {
                    speed += -10
                }
                RandomNumberGenSpeed()
            }
        }
        ticks += 1
        basic.pause(speed)
    }
})

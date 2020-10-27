input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
let emptyObsticaleY = 0
let ticks = 0
let bird: game.LedSprite = null
let index = 0
let obstacles: game.LedSprite[] = []
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
let speed = 1000
let score = 0
basic.forever(function () {
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
            score = 0 / 0
            game.setScore(score)
            game.gameOver()
        }
    }
    for (let obstacle of obstacles) {
        if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X)) {
            score += 1
            speed += -10
        }
    }
    ticks += 1
    basic.pause(speed)
})

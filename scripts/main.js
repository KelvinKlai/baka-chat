/**
 * @param {ChatMessage} message
 */
function handleChatMessage(message) {
    if (message.isRoll) {
        let natural20 = false
        let natural1  = false
        let roll      = message.roll;
        for (let i = 0; i < roll.dice.length; i++) {
            let dice = roll.dice[i]
            if (!natural20 && !natural1 && dice.faces === 20) {
                for (let j = 0; j < dice.results.length; j++) {
                    let singleDice = dice.results[j]
                    if (singleDice.result === 20) {
                        natural20 = true
                    }
                    else if (singleDice.result === 1) {
                        natural1 = true
                    }
                }
            }
        }

        if (natural20) {
            ChatMessage.create({
                "content": "<img src='/modules/baka-test/img/nat20.jpg' alt='Omae wa mou shindeiru!'>",
                "speaker": {
                    "alias": "Kenshiro",
                }
            }).then()


        }
        if (natural1) {
            ChatMessage.create({
                "content": "<img src='/modules/baka-test/img/nat1.jpg' alt='Baka!'>",
                "speaker": {
                    "alias": "Yukihira Soma"
                }
            }).then()
        }

        console.log(`Rolled a total of ${roll.result} with the dice being a d${roll.dice[0].faces} and it rolled (hopefully) on the dice a ${roll.dice[0].total}.`)
    }
}

Hooks.on("ready", function () {
    setTimeout(function () {
        ChatMessage.create({"content": "Baka-Test loaded!"}).then()

        Hooks.on('renderChatMessage', handleChatMessage)
    }, 1000)
})

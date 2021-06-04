/**
 * @param {ChatMessage} message
 */
function handleChatMessage(message) {
    if (message.isRoll) {
        let natural20 = false
        let natural1 = false
        let dice, singleDice
        let i, j
        /** @var {Roll} roll */
        let roll = message.roll;
        for (i = 0; i < roll.dice.length; i++) {
            /** @var {DiceTerm} dice */
            dice = roll.dice[i]
            if (!natural20 && !natural1 && dice.faces === 20) {
                for (j = 0; j < dice.results.length; j++) {
                    /** @var {DiceTermResult} */
                    singleDice = dice.results[j]
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
                "content": "Omae wa mou shindeiru!<img src='/modules/baka-chat/img/nat20.png' alt='Omae wa mou shindeiru!'>",
                "speaker": {
                    "alias": "Kenshiro",
                }
            }).then()


        }
        if (natural1) {
            ChatMessage.create({
                "content": "<img src='/modules/baka-chat/img/nat1.jpg' alt='Baka!'>",
                "speaker": {
                    "alias": "The Army"
                }
            }).then()
        }
    }
}

Hooks.on("ready", function () {
    setTimeout(function () {
        ChatMessage.create({"content": "Baka-Test loaded!"}).then()
        Hooks.on('renderChatMessage', handleChatMessage)
    }, 1000)
})

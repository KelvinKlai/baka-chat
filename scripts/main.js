import {
    DEFAULT_CONFIG,
    MODULE_ID,
    NAT1_IMAGE_KEY,
    NAT1_SPEAKER,
    NAT1_TEXT,
    NAT20_IMAGE_KEY,
    NAT20_SPEAKER,
    NAT20_TEXT
} from "./config.js";

let activeSettings = {}

function registerConfig() {
    let baseConfigData = {
        scope  : "world",
        config : true,
        type   : String,
        default: ""
    }
    let mergedConfig = {}

    for (let configKey in DEFAULT_CONFIG) {
        mergedConfig = {...baseConfigData, ...DEFAULT_CONFIG[configKey]}
        mergedConfig["onChange"] = value => {
            activeSettings[configKey] = value
        }

        game.settings.register(MODULE_ID, configKey, mergedConfig)
    }
}

function loadConfig() {
    if (!game.settings.hasOwnProperty(MODULE_ID)) {
        registerConfig()
    }

    for (let configKey in DEFAULT_CONFIG) {
        activeSettings[configKey] = game.settings.get(MODULE_ID, configKey)
    }
}

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
        let roll = message.roll
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
                "content": activeSettings[NAT20_TEXT] + "<img src='" + activeSettings[NAT20_IMAGE_KEY] + "' alt='" + activeSettings[NAT20_TEXT] + "'>",
                "speaker": {
                    "alias": activeSettings[NAT20_SPEAKER],
                }
            }).then()
        }

        if (natural1) {
            ChatMessage.create({
                "content": activeSettings[NAT1_TEXT] + "<img src='" + activeSettings[NAT1_IMAGE_KEY] + "' alt='" + activeSettings[NAT1_TEXT] + "'>",
                "speaker": {
                    "alias": activeSettings[NAT1_SPEAKER]
                }
            }).then()
        }
    }
}

Hooks.on("ready", function () {
    loadConfig()
    setTimeout(function () {
        Hooks.on('renderChatMessage', handleChatMessage)
    }, 1000)
})

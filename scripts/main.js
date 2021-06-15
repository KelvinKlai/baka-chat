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
let betterRolls5ePresent

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
 * Handles the "normal" rolls, without any modules installed
 *
 * @param {ChatMessage} message
 * @returns {{nat20: boolean, nat1:boolean}}
 */
function handleNormalRolls(message) {
    let natural20 = false
    let natural1 = false
    let dice, singleDice, i, j;
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

    return {
        "nat1" : natural1,
        "nat20": natural20
    }
}

/**
 * Handles rolls made with betterdice5e
 *
 * @param {ChatMessage} message
 * @returns {{nat20: boolean, nat1:boolean}}
 */
function handleBetterDice5ERolls(message) {
    let natural20 = false
    let natural1 = false
    let betterRollData = message.data.flags.betterrolls5e.entries
    let entries, entryTerms, entryDiceTerm, entryDiceTermKey, entryDiceTermResultKey, entryDiceTermResults, rolledValue
    for (let singleRollDataKey in betterRollData) {
        if (betterRollData.hasOwnProperty(singleRollDataKey)) {
            entries = betterRollData[singleRollDataKey].entries

            for (let entriesKey in entries) {
                if (entries.hasOwnProperty(entriesKey)) {
                    entryTerms = entries[entriesKey].roll.terms
                    for (entryDiceTermKey in entryTerms) {
                        if (entryTerms.hasOwnProperty(entryDiceTermKey)) {
                            entryDiceTerm = entryTerms[entryDiceTermKey]
                            if (entryDiceTerm.class === "Die" && entryDiceTerm.faces === 20) {
                                entryDiceTermResults = entryDiceTerm.results
                                for (entryDiceTermResultKey in entryDiceTermResults) {
                                    if (entryDiceTermResults.hasOwnProperty(entryDiceTermResultKey)) {
                                        rolledValue = entryDiceTermResults[entryDiceTermResultKey].result
                                        if (rolledValue === 1) {
                                            natural1 = true
                                        }
                                        else if (rolledValue === 20) {
                                            natural20 = true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return {
        "nat1" : natural1,
        "nat20": natural20,
    }
}

/**
 * @param {ChatMessage} message
 */
function handleChatMessage(message) {
    if (message.isRoll) {
        let handledResult

        if (betterRolls5ePresent && message.roll.dice.length === 0) {
            handledResult = handleBetterDice5ERolls(message)
        }
        else {
            handledResult = handleNormalRolls(message)
        }

        if (handledResult.nat20) {
            ChatMessage.create({
                "content": activeSettings[NAT20_TEXT] + "<img src='" + activeSettings[NAT20_IMAGE_KEY] + "' alt='" + activeSettings[NAT20_TEXT] + "'>",
                "speaker": {
                    "alias": activeSettings[NAT20_SPEAKER],
                }
            }).then()
        }

        if (handledResult.nat1) {
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
    betterRolls5ePresent = game.modules.has("betterrolls5e")
    Hooks.on('createChatMessage', handleChatMessage)
})

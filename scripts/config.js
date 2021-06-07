let DEFAULT_CONFIG = {}

const MODULE_ID = "baka-chat"
const MODULE_FILE_DIR = "modules/" + MODULE_ID

const NAT1_DEFAULT_IMAGE = MODULE_FILE_DIR + "/img/nat1.png"
const NAT20_DEFAULT_IMAGE = MODULE_FILE_DIR + "/img/nat20.png"
const NAT1_DEFAULT_SPEAKER = "The Game"
const NAT20_DEFAULT_SPEAKER = "DM"
const NAT1_DEFAULT_TEXT = "Baka!"
const NAT20_DEFAULT_TEXT = "Omae wa mou shindeiru!"

const NAT1_IMAGE_KEY = "nat1image"
const NAT20_IMAGE_KEY = "nat20image"
const NAT1_SPEAKER = "nat1speaker"
const NAT20_SPEAKER = "nat20speaker"
const NAT1_TEXT = "nat1text"
const NAT20_TEXT = "nat20text"

DEFAULT_CONFIG[NAT1_IMAGE_KEY] = {
    name      : "Nat 1 Image",
    hint      : "Here you can set the image being shown on a natural 1.",
    filePicker: true,
    default   : NAT1_DEFAULT_IMAGE
}

DEFAULT_CONFIG[NAT20_IMAGE_KEY] = {
    name      : "Nat 20 Image",
    hint      : "Here you can set the image being shown on a natural 20.",
    filePicker: true,
    default   : NAT20_DEFAULT_IMAGE
}

DEFAULT_CONFIG[NAT1_SPEAKER] = {
    name   : "Nat 1 Speaker",
    hint   : "Here you can set who should laugh at you on a natural 1.",
    default: NAT1_DEFAULT_SPEAKER
}

DEFAULT_CONFIG[NAT20_SPEAKER] = {
    name   : "Nat 20 Speaker",
    hint   : "Here you can set who should congratulate you on a natural 20.",
    default: NAT20_DEFAULT_SPEAKER
}

DEFAULT_CONFIG[NAT1_TEXT] = {
    name   : "Nat 1 Text",
    hint   : "Here you can set what additional message you receive on a natural 1.",
    default: NAT1_DEFAULT_TEXT
}

DEFAULT_CONFIG[NAT20_TEXT] = {
    name   : "Nat 20 Text",
    hint   : "Here you can set what additional message you receive on a natural 20.",
    default: NAT20_DEFAULT_TEXT
}

export {
    MODULE_ID,
    DEFAULT_CONFIG,
    NAT1_IMAGE_KEY,
    NAT20_IMAGE_KEY,
    NAT1_SPEAKER,
    NAT20_SPEAKER,
    NAT1_TEXT,
    NAT20_TEXT
}
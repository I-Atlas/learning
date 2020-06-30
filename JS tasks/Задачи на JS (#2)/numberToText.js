const TRIPLET_NAMES = [
        null,
        ["тысяча", "тысячи", "тысяч"]
    ],
    ZERO_NAME = "ноль",
    ONE_THOUSANT_NAME = "одна",
    TWO_THOUSANTS_NAME = "две",
    HUNDRED_NAMES = [
        null,
        "сто",
        "двести",
        "триста",
        "четыреста",
        "пятьсот",
        "шестьсот",
        "семьсот",
        "восемьсот",
        "девятьсот",
    ],
    TEN_NAMES = [
        null,
        null,
        "двадцать",
        "тридцать",
        "сорок",
        "пятьдесят",
        "шестьдесят",
        "семьдесят",
        "восемьдесят",
        "девяносто",
    ],
    UNIT_NAMES = [
        ZERO_NAME,
        "один",
        "два",
        "три",
        "четыре",
        "пять",
        "шесть",
        "семь",
        "восемь",
        "девять",
    ],
    TEN_UNIT_NAMES = [
        "десять",
        "одиннадцать",
        "двенадцать",
        "тринадцать",
        "четырнадцать",
        "пятнадцать",
        "шестнадцать",
        "семнадцать",
        "восемнадцать",
        "девятнадцать",
    ]

function pluralEnding(number, constants) {
    const one = constants[0],
        two = constants[1],
        five = constants[2]
    number = Math.abs(number)
    number %= 100
    if (number >= 5 && number <= 20) {
        return five
    }
    number %= 10
    if (number === 1) {
        return one
    } else if (number >= 2 && number <= 4) {
        return two
    }
    return five
}

function numberToText(number) {
    let numberToText = [],
        tripletOfZerosMask = 0,
        i,
        pos,
        length,
        tripletNames,
        tripletIndex,
        digitPosition,
        prevDigitValue

    if (typeof (number) !== `string`) {
        number = number + ""
    }
    length = number.length

    for (i = 0; i < length; i += 1) {
        pos = length - 1 - i
        tripletIndex = Math.floor(pos / 3)
        digitPosition = pos % 3
        digitValue = parseInt(number[i])

        if (digitPosition === 2) {
            tripletOfZerosMask = 0
            if (digitValue === 0) {
                tripletOfZerosMask |= 0b100
            } else if (digitValue) {
                numberToText.push(HUNDRED_NAMES[digitValue])
            }
            continue
        }
        if (digitPosition === 1) {
            if (digitValue === 0) {
                tripletOfZerosMask |= 0b10
            } else if (digitValue === 1) {
                numberToText.push(TEN_UNIT_NAMES[parseInt(number[i + 1])])
            } else if (digitValue) {
                numberToText.push(TEN_NAMES[digitValue])
            }
            continue
        }
        if (digitPosition === 0) {
            prevDigitValue = i - 1 >= 0 ? parseInt(number[i - 1]) : null
            if (digitValue === 0) {
                tripletOfZerosMask |= 0b1
                if (length === 1) {
                    numberToText.push(ZERO_NAME)
                }
                } else if (prevDigitValue && prevDigitValue !== 1 || !prevDigitValue)
                {
                if (tripletIndex === 1 && digitValue == 1) {
                    numberToText.push(ONE_THOUSANT_NAME)
                } else if (tripletIndex === 1 && digitValue == 2) {
                    numberToText.push(TWO_THOUSANTS_NAME)
                } else {
                    numberToText.push(UNIT_NAMES[digitValue])
                }
            }
            tripletNames = TRIPLET_NAMES[tripletIndex]
            if (tripletNames && tripletOfZerosMask !== 0b111) {
                if (prevDigitValue === 1) {
                    numberToText.push(pluralEnding(10 + digitValue, tripletNames))
                } else {
                    numberToText.push(pluralEnding(digitValue, tripletNames))
                }
            }
            continue
        }
    }
    return numberToText.join(" ")
}

console.log(numberToText(11))
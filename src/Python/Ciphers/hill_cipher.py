import numpy as np


def encryptPassage(message, alphabet):
    encodedMessage = []

    for (first, second) in zip(message[0::2], message[1::2]):
        array = [alphabet.index(first), alphabet.index(second)]
        dotProduct = encodingMatrix.dot(np.array(array))
        modDot = dotProduct % len(alphabet)
        encodedMessage.append(alphabet[modDot[0]])
        encodedMessage.append(alphabet[modDot[1]])

    print(encodedMessage)
    return encodedMessage


def find_factors(x):
    factors = []

    for i in range(1, x + 1):
        if x % i == 0:
            factors.append(i)

    return factors


def getModuloRecip(alphabet):
    recipModuloDict = {}

    length = len(alphabet)

    for x in range(0, length):
        for y in range(0, length):
            number = x * y
            if number % length == 1:
                recipModuloDict[x] = y
            continue
        continue

    return recipModuloDict


def decryptPassage(message, encodingMatrix, alphabet):
    determinateFinal = round(np.linalg.det(encodingMatrix))
    print(determinateFinal)

    recipModuloDict = getModuloRecip(alphabet)
    print(recipModuloDict)

    repModuloValue = recipModuloDict[abs(determinateFinal)]
    print(determinateFinal ** -1 % len(alphabet))

    newMatrix = np.array([[repModuloValue * encodingMatrix[1][1],
                           -repModuloValue * encodingMatrix[0][1]],
                          [-repModuloValue * encodingMatrix[1][0],
                           repModuloValue * encodingMatrix[0][0]]])

    newMatrixMod = [[newMatrix[0][0] % len(alphabet),
                     newMatrix[0][1] % len(alphabet)],
                    [newMatrix[1][0] % len(alphabet),
                     newMatrix[1][1] % len(alphabet)]]

    decodedMessage = []

    for (first, second) in zip(message[0::2], message[1::2]):
        multiplied = np.array(newMatrixMod).dot(np.array([alphabet.index(first), alphabet.index(second)]))
        multipliedMod = multiplied % len(alphabet)
        decodedMessage.append(alphabet[multipliedMod[0]])
        decodedMessage.append(alphabet[multipliedMod[1]])

    print(decodedMessage)
    return decodedMessage


alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z', '.', '?', ' ']

encodingMatrix = np.array([[5, 5], [3, 8]])

factorsNotAllowed = find_factors(len(alphabet) + 1)

determinateEncodingMatrix = round(np.linalg.det(encodingMatrix))

if determinateEncodingMatrix in factorsNotAllowed[1:-1]:
    print("Encoding Matrix not allowed, please choose another")

choiceOfRun = ''

while choiceOfRun != "A" or "B" or "Q":

    choiceOfRun = input("Do you want to: \n A) Encrypt a passage.  \n B) Decrypt a passage. \n Q) Quit program [A/B/Q]?").upper()

    if choiceOfRun == "A":
        # Encryption
        passageInput = input("Enter passage you wish to encrypt: ")
        passageInput = passageInput.lower()

        encryptedPassage = encryptPassage(passageInput, alphabet)

        encryptedPassageString = ''.join(encryptedPassage)

        print("Your encrypted passage is: " + encryptedPassageString)

        choiceOfRun = ''

        continue

    if choiceOfRun == "B":
        # Decryption
        encryptedPassageInput = input("Enter passage you wish to decrypt: ")
        encryptedPassageInput = encryptedPassageInput.lower()

        decryptedPassage = decryptPassage(encryptedPassageInput, encodingMatrix, alphabet)

        decryptedPassageString = ''.join(decryptedPassage)

        print("Your decrypted passage is: " + decryptedPassageString)

        choiceOfRun = ''

        continue

    if choiceOfRun == "Q":
        break

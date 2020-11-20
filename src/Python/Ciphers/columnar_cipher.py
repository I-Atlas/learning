import math

key = "РУСЛ"


def encrypt(message):
    cipher = ""
    key_index = 0

    message_len = float(len(message))
    message_list = list(message)
    key_list = sorted(list(key))

    col = len(key)
    row = int(math.ceil(message_len / col))

    fill_null = int((row * col) - message_len)
    message_list.extend('_' * fill_null)

    matrix = [message_list[i: i + col]
              for i in range(0, len(message_list), col)]

    for _ in range(col):
        current_index = key.index(key_list[key_index])
        cipher += ''.join([row[current_index]
                           for row in matrix])
        key_index += 1

    return cipher


def decrypt(cipher):
    key_index = 0

    message_index = 0
    message_len = float(len(cipher))
    message_list = list(cipher)

    col = len(key)

    row = int(math.ceil(message_len / col))

    key_list = sorted(list(key))

    decrypt_cipher = []
    for _ in range(row):
        decrypt_cipher += [[None] * col]

    for _ in range(col):
        current_index = key.index(key_list[key_index])

        for j in range(row):
            decrypt_cipher[j][current_index] = message_list[message_index]
            message_index += 1
        key_index += 1

    try:
        message = ''.join(sum(decrypt_cipher, []))
    except TypeError:
        raise TypeError("Нет поддержки повторяющихся слов")

    null_count = message.count('_')

    if null_count > 0:
        return message[: -null_count]

    return message


message = input("Введите шифруемое слово: ")

cipher = encrypt(message)
print("Зашифрованное слово: {}".
      format(cipher))

print("Расшифрованное слово: {}".
      format(decrypt(cipher)))

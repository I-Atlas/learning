small_symbols = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
big_symbols = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

# russian_symbols = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя"
# english_symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


# def match_russian(text, alphabet=set('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя')):
#     return not alphabet.isdisjoint(text.lower())
#
#
# print(match_russian('тест'))  # True
#
#
# def match_english(text, alphabet=set('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')):
#     return not alphabet.isdisjoint(text.lower())
#
#
# print(match_english('test'))  # True


def shift(text, symbols, n):
    index = symbols.find(text)
    if index + n < len(symbols):
        return symbols[index + n]
    else:
        return symbols[(index + n) % len(symbols)]


def back_shift(text, symbols, n):
    index = symbols.find(text)
    if index - n >= 0:
        return symbols[index - n]
    else:
        return symbols[(index - n) % len(symbols)]


def encrypt(text, n=5, i=0, res=""):
    if len(res) == len(text): return res

    if text[i].isupper():
        res += shift(text[i], big_symbols, n)
    elif text[i].islower():
        res += shift(text[i], small_symbols, n)
    else:
        res += text[i]

    return encrypt(text, n, i + 1, res)


def decrypt(text, n=5, i=0, res=""):
    if len(res) == len(text): return res

    if text[i].isupper():
        res += back_shift(text[i], big_symbols, n)
    elif text[i].islower():
        res += back_shift(text[i], small_symbols, n)
    else:
        res += text[i]

    return decrypt(text, n, i + 1, res)


text = encrypt(input("Введите текст: "))
print(f"Зашифрованный текст: {text}")
print(f"Расшифрованный текст {decrypt(text)}")

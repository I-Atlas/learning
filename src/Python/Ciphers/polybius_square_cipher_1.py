import sys

"""
 	1 	2 	3 	4 	5 	6
1 	А 	Б 	В 	Г 	Д 	Е
2 	Ё 	Ж 	З 	И 	Й 	К
3 	Л 	М 	Н 	О 	П 	Р
4 	С 	Т 	У 	Ф 	Х 	Ц
5 	Ч 	Ш 	Щ 	Ъ 	Ы 	Ь
6 	Э 	Ю 	Я 	- 	- 	- 
"""


# Make dictonary
def make_dictionary(alphabets_used):
    signs = '1234567890!@#$%&()-=+/*<>,.\'"\\{}:;'
    eng_letters = "abcdefghijklmnopqrstuvwxyz"
    rus_letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"

    if alphabets_used == "en":
        alphabet = eng_letters + eng_letters.upper() + signs
        alphabet_len = 86
    elif alphabets_used == "ru":
        alphabet = rus_letters + rus_letters.upper() + signs
        alphabet_len = 100
    else:
        print("Sorry, part under construction - use rus or en only")
        alphabet = rus_letters + rus_letters.upper() + signs
        alphabet_len = 100

    def dict_generator(alphabet_length, alphabet):
        numbers = ["%02d" % (num) for num in range(alphabet_length)]
        letter_dict = {}
        for x in range(alphabet_length):
            letter_dict[alphabet[x]] = numbers[x]
        return letter_dict

    new_dict = dict_generator(alphabet_len, alphabet)
    return new_dict


# encrypt
def encrypt(text, dictionary):
    new_txt = ""
    list_fraze = list(text)
    for x in text:
        if x in dictionary:
            new_txt += dictionary.get(x)
        else:
            new_txt += (x + x)
    return new_txt


# decrypt
# 63  3162123162  42161263 - test text
def decrypt(text, dictionary):
    new_txt = ""
    list_fraze = []
    # str to list with letter length steep 
    step = 2
    for i in range(0, len(text), 2):
        list_fraze.append(text[i:step])
        step += 2
    # list to decrypt text
    key_dictionary_list = list(dictionary.keys())
    val_dictionary_list = list(dictionary.values())

    for x in list_fraze:
        if x in val_dictionary_list:
            i = val_dictionary_list.index(x)
            new_txt += key_dictionary_list[i]
        else:
            new_txt += x[0:1]
    return new_txt


# Main
def main():
    # Choose mode

    option = input("Введите режим [e - защифровть, d - расшифровать, en - английский, ru - русский]: ")
    if len(option) == 1:
        print("You need more option.")
        return 0
    text = input("Введите текст: ")
    lang = option[2]
    dictionary = make_dictionary(lang)
    if "e" in option:
        output_txt = encrypt(text, dictionary)
    elif "d" in option:
        output_txt = decrypt(text, dictionary)
    else:
        print("Wrong key.")
        return 1
    print(output_txt, end='')


main()

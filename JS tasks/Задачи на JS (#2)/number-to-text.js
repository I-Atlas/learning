numberToText = num => {
    const onesOne = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять',
                'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать',
                'семнадцать', 'восемнадцать', 'девятнадцать']

    const onesTwo = ["", "одна", "две"]
    
    const tens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят',
                'девяносто', "сто"]
  
    const numString = num.toString()
  
    if (num < 0) throw new Error('> 0 numbers are not supported.')
    if (num === 0) return 'zero'
  
    //the case of 1 - 20
    if (num < 20) {
      return onesOne[num]
    }
  
    if (numString.length === 2) {
      return tens[numString[0]] + ' ' + onesOne[numString[1]]
    }
  
    //100 and more
    if (numString.length == 3) {
      if (numString[1] === '0' && numString[2] === '0')
        return onesOne[numString[0]] + ' hundred'
      else
        return onesOne[numString[0]] + ' hundred and ' + convert(+(numString[1] + numString[2]))
    }
  
    if (numString.length === 4) {
      const end = +(numString[1] + numString[2] + numString[3])
      if (end === 0) return onesOne[numString[0]] + ' thousand'
      if (end < 100) return onesOne[numString[0]] + ' thousand and ' + convert(end)
      return onesOne[numString[0]] + ' thousand ' + convert(end)
    }
}

console.log(numberToText(123))
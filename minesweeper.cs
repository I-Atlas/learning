using System;
					
public class Program {	
    public static void Main() {
		{
            int width;
            int height;
            int bombsCount;
            bool done = false;

            do {
            Console.Write("Введите значения по порядку: " + "\n"  + "Ширина, высота, количество бомб" + "\n");
            try {
                width = Convert.ToInt32(Console.ReadLine());
                height  = Convert.ToInt32(Console.ReadLine());
                bombsCount = Convert.ToInt32(Console.ReadLine());
                    string minesweeperMap = GenerateMinesweeperMap(width, height, bombsCount);
                    Console.WriteLine("+------+"+ "\n" + minesweeperMap + "+------+");
                    done = true;
            } catch (FormatException) {
				Console.Write("Введите значение типа int.");
                return;
            } catch (ArithmeticException) {
				Console.Write("Введенное значение выходит за границы Int32.");
                return;    
			} if (width < 1 || width > 2147483647 || height < 1 || height > 2147483647 || bombsCount < 0 || bombsCount > width*height) {
                Console.Write("Введите корректное значение!");
                done = false;
                    }
                }
            while (done == false);
		}
	}
    static string GenerateMinesweeperMap(
        int width,
        int height,
        int bombsCount) {   
            int randomValue = 0;
            string generatedMinesweeperMap = "";
            char[,] map = new char[width+2, height+2];
            Random rnd = new Random();
            while (randomValue < bombsCount) {
                    int x = rnd.Next(1, width + 1);
                    int y = rnd.Next(1, height + 1);

                    if (map[x, y] != '*') {
                        map[x, y] = '*';
                        randomValue++;
                    }
                }
                for (int w = 1; w <= width; w++) {
                    for (int h = 1; h <= height; h++) {
                        if (map[w, h] != '*') {
                            int count = 0;

                            if (map[w, h + 1] == '*') {
                                count++;
                            }
                            if (map[w + 1, h] == '*') {
                                count++;
                            }
                            if (map[w, h - 1] == '*') {
                                count++;
                            }
                            if (map[w - 1, h] == '*') {
                                count++;
                            }
                            if (map[w - 1, h + 1] == '*') {
                                count++;
                            }
                            if (map[w + 1, h - 1] == '*') {
                                count++;
                            }
                            if (map[w + 1, h + 1] == '*') {
                                count++;
                            }
                            if (map[w - 1, h - 1] == '*') {
                                count++;
                            }
                               
                            char numberOfBombs = Convert.ToChar(count.ToString());
                            if (numberOfBombs == '0') {
                                numberOfBombs = ' ';
                            }
                            map[w, h] = numberOfBombs;
                            }
                        generatedMinesweeperMap = (generatedMinesweeperMap + map[w, h]);
                    }
                generatedMinesweeperMap = (generatedMinesweeperMap + "\n");
            }
        return generatedMinesweeperMap;
    }
}
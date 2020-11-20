using System;
namespace BubbleSort {
    class Program {
        static void Main(string args) {
            int[] numbers = new int[5];
            Console.WriteLine("Enter an array: ");
            for (int i=0; i< numbers.Length; i++) {
                Console.WriteLine("{0} element: ", i + 1);
                numbers[i] = Int32.Parse(Console.ReadLine());

            }
            int temp;
            for(int i = 0; i < numbers.Length; i++) {
                for (int j = i +1; j < numbers.Length; j++) {
                    if(numbers[i] > numbers[j]) {
                        temp = numbers[i];
                        numbers[i] = numbers[j];
                        numbers[j] = temp;
                    }
                }
            }
            Console.WriteLine("Sort: ");
            for (int i = 0; i < numbers.Length; i++) {
                Console.WriteLine(numbers[i]);
            }
        Console.ReadLine();
        }
    }
}
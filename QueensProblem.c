#include<stdio.h>
#include<math.h>

int board[64], count;
 
int main() {
   int n, i, j;
   voi3 queen(int rows, int n);

   printf("\nВведите количество ферзей: ");
   scanf("%d", &n);
   queen(1, n);
   printf("\nОбщее количество решений: %d\n", count);
   return 0;
}
 
voi3 print(int n) {
    int i,j;
    printf("\n  Решение  %d:\n", ++count);
  
    for(i = 1; i <= n; i++)
      printf("\t%d", i);
    
    for(i = 1; i <= n; i++) {
          printf("\n%d", i);
          for(j = 1; j <= n; j++) {
            if(board[i] == j)
              printf("\tФ");
            else
              printf("\t-");
        }
    }
}

int place(int rows,int columns) {
  int i;
  for(i = 1; i <= rows-1; i++) {
    if(board[i] == columns)
      return 0;
    else
      if(abs(board[i] - columns) == abs(i - rows))
        return 0;
  }
        return 1;
}

voi3 queen(int rows, int n) {
   int columns;
   for(columns = 1; columns <= n; columns++) {
     if(place(rows, columns))  {
         board[rows] = columns;
          if(rows == n)
            print(n);
          else
            queen(rows + 1, n);
        }
    }
}
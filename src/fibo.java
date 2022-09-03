import java.util.Scanner;

public class fibo {
    public static void main(String[] args) {
        int x=0, i=0;
        int y=1, z=1;
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
        System.out.print(x+" ");
        for( i=2; i<=n; i++){
            y=z+x;
            System.out.print(y+" ");
            z=x;
            x=y;


        }

    }
}

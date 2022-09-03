package com.webdev;

import java.util.Scanner;

public class LoopProblem {
    public static void main(String[] args) {
        int i=0, c=0;
        Scanner sc =new Scanner(System.in);
        int N= sc.nextInt();
        for (i=1; i<=10; i++){
            c=i*N;
            System.out.println(N+" x "+i+" = "+N*i);
        }
    }

}

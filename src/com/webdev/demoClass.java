package com.webdev;

import java.util.Scanner;

public class demoClass {
    public static void main(String[] args){
        System.out.println("Hello");

        boolean bool=true;

        if(bool){
            System.out.println("present");
        }
        else{
            System.out.println("not present");
        }
        Scanner sc= new Scanner(System.in);
        int b= sc.nextInt();
        System.out.println("input="+b);
    }
}

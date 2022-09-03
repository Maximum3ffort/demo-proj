package com.webdev;

import java.util.Scanner;

public class GradeCard {
    public static void main(String[] args) {
        int g;
        Scanner sc = new Scanner(System.in);
        g=sc.nextInt();
        GradeCard g1=new GradeCard();
        g1.getGrade(g);
    }
    public void getGrade(int G){
        if(G<40)
            System.out.println("F");
        else if(G>=40 && G<=50)
            System.out.println("E");
        else if(G>50 && G<=60)
            System.out.println("D");
        else if(G>60 && G<=70)
            System.out.println("C");
        else if(G>70 && G<=85)
            System.out.println("B");
        else if(G>85)
            System.out.println("A");
    }
}

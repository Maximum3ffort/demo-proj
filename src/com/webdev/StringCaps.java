package com.webdev;

import java.util.Scanner;

public class StringCaps {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
//        while(sc.hasNext()){
//            String word=sc.next();
//            System.out.println(word.substring(0,1).toUpperCase().concat(word.substring(1).toLowerCase()));
//
//            }

        String word= sc.next();
        StringBuffer wordSB=new StringBuffer(word);
        wordSB.reverse();
        System.out.println(wordSB);
        if(wordSB.toString().equals(word)){
            System.out.println("Palindrome");
        }
        else System.out.println("Not palindrome");

        wordSB.replace(2,4,"fuck");
        //word=wordSB.toString();
        System.out.println(word);
        wordSB.append(12);
        word.concat(Integer.toString(12,16));
        System.out.println(Integer.parseInt("12"));
        System.out.println(word);
    }

    }


    //HW
// hackerrank
// create employee class like student class
//upload to git
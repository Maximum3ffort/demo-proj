package stu;

public class Stringutils {
    public static void main(String[] args) {
        String name="    Rahul";
        String dept=new String("noCivil");


        //string operations
        name.toLowerCase();
        System.out.println(name);
        name=name.toUpperCase();
        System.out.println(name);
        System.out.println(name.concat(" Roy"));
        System.out.println(name.isEmpty());
        System.out.println(name.trim());
        System.out.println(dept.charAt(2));
        System.out.println(dept.substring(3));
        System.out.println(dept.substring(1,4));

        //equals

        String s1="abc";
        String s2=new String("abc");
        System.out.println(s1==s2);
        System.out.println(s1.equals(s2));
        System.out.println(dept.substring(0,1).toUpperCase().concat(dept.substring(1).toLowerCase()));


    }
}

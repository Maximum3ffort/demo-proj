package stu;

public class StudentApp {
    public static void main(String[] args) {


        Student s1 = new Student();
        s1.name = "Ram";
        s1.roll = 23;
//        s1.std = 11;

        Student s2=new Student();
        s2.name="Ravi";
        s2.roll=32;
        s2.std=10;
        s2.getDetails();
        s1.getDetails();

        Student s3=new Student(111, 13, "adda");
        s3.getDetails();
        System.out.println(s3.roll);
    }
}
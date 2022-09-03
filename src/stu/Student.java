package stu;

public class Student {
    int roll;
    int std;
    String name;


    public Student(int roll, int std, String name) {
        this.roll = roll;
        this.std = std;
        this.name = name;
    }

    public Student() {
        this.std=9;
    }

    public void getDetails(){

        System.out.println(name+" "+std);
    }
}

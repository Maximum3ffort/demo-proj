package stu;

public class Employee {
    int empId;
    int salary;
    String name;


    public Employee(int empId, int salary, String name) {
        this.empId = empId;
        this.salary = salary;
        this.name = name;
    }

    public Employee() {
        this.salary=9000;
    }

    public void getDetails(){

        System.out.println("Person "+name+" Id: "+empId+" gets a salary of: "+salary);
    }
}

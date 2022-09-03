package stu;

public class EmployeeApp {
    public static void main(String[] args) {

        Employee e1=new Employee();
        e1.name="Ram";
        e1.empId=332;
        e1.salary=20000;

        Employee e2=new Employee();
        e2.name="Shivam";
        e2.empId=311;
        e2.salary=29000;
        e1.getDetails();
        e2.getDetails();
        Employee e3=new Employee(111, 13000, "Arushi");
        e3.getDetails();

    }
}

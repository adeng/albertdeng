/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package practice;

/**
 *
 * @author Albert
 */
public class Others {

    /**
     * Write a Java program that prints the Fibonacci series up to 100
     */
    public static int fibonacci(int n) {
        if (n < 2) {
            System.out.println(1 + " ");
            return 1;
        } else {
            System.out.println();
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }

    /**
     * FizzBuzz!
     */
    public static void fizzBuzz() {
        for (int i = 0; i < 50; i++) {
            if (i % 3 != 0 && i % 5 != 0) {
                System.out.print(i);
            }
            if (i % 3 == 0) {
                System.out.print("Fizz");
            }
            if (i % 5 == 0) {
                System.out.print("Buzz");
            }

            System.out.print(" ");
        }
    }

    /**
     * Write a program to check whether a number is an Armstrong number
     */
    public static boolean isArmstrong(int n) {
        if (n > 999 || n < 100) {
            return false;
        }
        int hundreds = n / 100;
        int tens = (n % 100) / 10;
        int ones = n % 10;

        return Math.pow(hundreds, 3) + Math.pow(tens, 3) + Math.pow(ones, 3) == n;
    }
}

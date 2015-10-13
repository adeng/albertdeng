/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package practice;

import java.util.*;

/**
 *
 * @author Albert
 */
public class ArrayLists {

    /**
     * Given a sorted array of positive integers with an empty spot (zero) at
     * the end, insert an element in sorted order.
     */
    public static int[] insertIntegerIntoSortedArray(int[] array, int input) {
        // Option 1: In-place solution
        array[array.length - 1] = input;

        for (int i = array.length - 2; i > 0; i--) {
            if (array[i] > array[i + 1]) {
                // swap
                int temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            } else // reached the place where the input goes
            {
                break;
            }
        }
        return array;
    }

    /**
     * Reverse the order of elements in an array (without creating a new array).
     */
    public static int[] reverseArray(int[] array) {
        for (int i = 0; i < array.length / 2; i++) {
            int temp = array[i];
            array[i] = array[array.length - 1 - i];
            array[array.length - 1 - i] = temp;
        }
        return array;
    }

    /**
     * Implement an algorithm to determine if a string has all unique
     * characters. What if you cannot use additional data structures?
     */
    public static boolean isUniqueString(String s) {
        // Try 1: Brute force
//        for( int i = 0; i < s.length() - 1; i++ ) {
//            for( int j = i + 1; j < s.length(); j++ ) {
//                if( s.charAt(i) == s.charAt(j) )
//                    return false;
//            }
//        }
        
        // Try 2: Sort string
//        char[] cArray = s.toCharArray();
//        Arrays.sort(cArray);
//        for( int i = 0; i < cArray.length - 1; i++ ) {
//            if( cArray[i] == cArray[i+1] )
//                return false;
//        }
//        
        // Try 3: Using Hashmap
        HashMap<Character, Boolean> cMap = new HashMap<Character, Boolean>();
        for( int i = 0; i < s.length(); i++ ) {
            if( cMap.get(s.charAt(i)) != null )
                return false;
            else
                cMap.put(s.charAt(i), true);
        }
        
        return true;
    }
    /**
     * Given two strings, write a method to decide if one is a permutation of
     * the other.
     */
    /**
     * Write a method to replace all spaces in a string with '%20'. You may
     * assume that the string has sufficient space at the end to hold the
     * additional characters, and that you are given the "true" length of the
     * string. (Note: if implementing in Java, please use a character array so
     * that you can perform this operation in place.)
     */
    /**
     * Given a string, write a function to check if it is a permutation of a
     * palindrome. The palindrome does not need to be limited to just dictionary
     * words.
     */
    /**
     * There are three types of edits that can be performed on strings: insert a
     * character, remove a character, or replace a character. Given two strings,
     * write a function to check if they are one edit (or zero edits) away.
     */
    /**
     * Implement a method to perform basic string compression using the counts
     * of repeated characters. For example, the string aabcccccaaa would become
     * a2b1c5a3. If the "compressed" string would not become smaller than the
     * original string, your method should return the original string. You can
     * assume the string has only uppercase and lowercase letters (a-z).
     */
    /**
     * Given an image represented by an NxN matrix, where each pixel in the
     * image is 4 bytes, write a method to rotate the image by 90 degrees. Can
     * you do this in place?
     */
    /**
     * Write an algorithm such that if an element in an MxN matrix is 0, its
     * entire row and column are set to 0.
     */
    /**
     * Assume you have a method isSubstring which checks if one word is a
     * substring of another. Given two strings, s1 and s2, write code to check
     * if s2 is a rotation of s1 using only one call to isSubstring.
     */
}

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
public class MainDriver {
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int[] array = {2, 5, 8, 12, 31, 53, 0};
        
        // int[] c = Arrays.insertIntegerIntoSortedArray(array, 6);
        int[] c = ArrayLists.reverseArray(array);
        
        for( int i = 0; i < c.length; i++ )
            System.out.print(c[i] + " ");
        System.out.println();
        
        System.out.println("Is Unique: " + ArrayLists.isUniqueString("bacoero"));
        
        System.out.println("Is Armstrong: " + Others.isArmstrong(371));
    } 
}

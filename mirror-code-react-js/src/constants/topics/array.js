export const js = `
// Initializing while declaring
// Creates an array having elements 10, 20, 30, 40, 50
var house = new Array(10, 20, 30, 40, 50);
  
// Creates an array of 5 undefined elements
var house1 = new Array(5);
  
// Creates an array with element 1BHK
var home = new Array("1BHK");
console.log(house)
console.log(house1)
console.log(home)
 
`;
export const python = `
# Python code to demonstrate the working of
# array(), append(), insert()

# importing "array" for array operations
import array

# initializing array with array values
# initializes array with signed integers
arr = array.array('i', [1, 2, 3])

# printing original array
print ("The new created array is : ",end=" ")
for i in range (0, 3):
	print (arr[i], end=" ")

print("\r")

# using append() to insert new value at end
arr.append(4);

# printing appended array
print("The appended array is : ", end="")
for i in range (0, 4):
	print (arr[i], end=" ")
	
# using insert() to insert value at specific position
# inserts 5 at 2nd position
arr.insert(2, 5)

print("\r")

# printing array after insertion
print ("The array after insertion is : ", end="")
for i in range (0, 5):
	print (arr[i], end=" ")

 
`;
export const cpp = `
// C Program to demonstrate array initialization
#include <stdio.h>

int main()
{

	// array initialization using initialier list
	int arr[5] = { 10, 20, 30, 40, 50 };

	// array initialization using initializer list without
	// specifying size
	int arr1[] = { 1, 2, 3, 4, 5 };

	// array initialization using for loop
	float arr2[5];
	for (int i = 0; i < 5; i++) {
		arr2[i] = (float)i * 2.1;
	}
	return 0;
}

 
`;

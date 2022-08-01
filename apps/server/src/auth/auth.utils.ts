import * as argon2 from 'argon2';
import { customAlphabet } from 'nanoid/async';
import { nolookalikes } from 'nanoid-dictionary';

/**
 * Creates a random nanoid according to our specifications
 */
export const nanoid = customAlphabet(nolookalikes, 16);

/**
 * Takes in a plain text string and returns an argon2 hash of it
 * @param plainTextPassword The password as entered by the user
 * @returns A hash of the entered password
 */
export async function hashPassword(plainTextPassword: string): Promise<string> {
	return await argon2.hash(plainTextPassword);
}

/**
 * Compares the password entered by the user to the hash stored in the data store
 * and returns a boolean true if it matches, and a boolean false if it does not.
 * @param plainTextPassword The password as entered by the user
 * @param passwordHash The hashed password from the data store
 * @returns A boolean true if the password matches; false if it does not
 */
export async function isValidPassword(
	plainTextPassword: string,
	passwordHash: string,
): Promise<boolean> {
	return await argon2.verify(plainTextPassword, passwordHash);
}

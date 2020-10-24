import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

//  test@test.com
// 12345

const users = [
	{
		id: '80ddeaa8-b475-41d8-adae-e1c7fed02301',
		createdAt: 1602833177505,
		email: 'test@test.com',
		hash:
			'bb370ebe98d53b6bec97e09b0d51734f5522384c633bf858a2411067576b3d6e5847a5244e5c5fbd726aa0e4597fd769737441a529fb1d34b06ecbcd69639ed4',
		salt: '2cdf9e01acf71d7380edd72c165c8eb2',
	},
];

export async function createUser({ email, password, fullName, username }) {
	// Here you should create the user and save the salt and hashed password (some dbs may have
	// authentication methods that will do it for you so you don't have to worry about it):
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	const user = {
		id: uuidv4(),
		createdAt: Date.now(),
		email,
		fullName,
		username,
		hash,
		salt,
	};

	// This is an in memory store for users, there is no data persistence without a proper DB
	users.push(user);
	return user;
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
	// This is an in memory store for users, there is no data persistence without a proper DB
	return users.find((user) => user.email === email);
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
	const inputHash = crypto
		.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
		.toString('hex');
	const passwordsMatch = user.hash === inputHash;
	return passwordsMatch;
}

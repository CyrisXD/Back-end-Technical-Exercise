import { db } from "./database";

// ===================================================
// Check if user exists by comparing email addresses
// ===================================================
const checkUsers = async (EMAIL_ADDRESS: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const snapshot = await db
				.collection("USERS")
				.where("EMAIL_ADDRESS", "==", EMAIL_ADDRESS)
				.get();

			if (snapshot.size === 0) {
				resolve(false);
			} else {
				resolve(true);
			}
		} catch (error) {
			reject(error);
		}
	});
};

export { checkUsers };

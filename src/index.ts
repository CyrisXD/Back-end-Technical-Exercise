// Create an express server
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Functions
import { getUsers } from "./functions/getUsers";
import { addUser } from "./functions/addUsers";
import { checkUsers } from "./functions/checkUsers";

// Interfaces
import { UserInterface } from "./interfaces/userInterface";

// Server setup
const app = express();
app.use(express.json());
const PORT = 3000;

// ===================================================
// Default Route - Redirect
// ===================================================
app.get("/", async (req: Request, res: Response) => {
	try {
		const user = await getUsers("milo");
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send("An error occurred, please try again later.");
	}
});

// ===================================================
// GET Route - Get all users with a specific surname
// ===================================================
app.get("/users", async (req: Request, res: Response) => {
	try {
		const surnameQuery = req.body.SURNAME.toLowerCase() as string;
		const users = await getUsers(surnameQuery);
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).send("An error occurred, please try again later.");
	}
});

// ===================================================
// POST Route - Add a new user, check if exists
// ===================================================
app.post(
	"/addusers",
	body("FIRST_NAME").trim(),
	body("SURNAME").trim(),
	body("EMAIL_ADDRESS").isEmail().normalizeEmail(),
	async (req: Request, res: Response) => {
		try {
			// confirm validation
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// check if user exists
			const userExists = await checkUsers(req.body.EMAIL_ADDRESS);

			if (userExists) {
				res.status(400).send("User already exists");
				return;
			}

			// use interface to create a new user
			const newUser: UserInterface = {
				FIRST_NAME: req.body.FIRST_NAME,
				FIRST_NAME_LOWER: req.body.FIRST_NAME.toLowerCase(),
				SURNAME: req.body.SURNAME,
				SURNAME_LOWER: req.body.SURNAME.toLowerCase(),
				EMAIL_ADDRESS: req.body.EMAIL_ADDRESS,
			};

			// user doesn't exist, add user
			const userID = await addUser(newUser);
			res.status(201).json(`User successfully added with ID: ${userID}`);
		} catch (error) {
			console.log(error);
			res.status(500).send("An error occurred, please try again later.");
		}
	}
);

//===================================================
// Start the server
//===================================================
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

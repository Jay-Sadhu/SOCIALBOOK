// external dependencies
const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// internal dependencies
const userdb = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");
const { registerValidationSchema } = require("../validator/auth");

// internal variables
const keysecret = process.env.SECRET_KEY
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
})

// setting up the router
const router = new express.Router();


// for user registration
router.post("/register", async (req, res) => {

	// fetching the parameters sent by user
	const { fname, email, password } = req.body;

	const { error } = registerValidationSchema.validate(req.body);
	if (error) {
		res.status(422).send({ status: "error", details: error.details[0].message })
		return
	}

	try {

		const preuser = await userdb.findOne({ email: email });

		if (preuser) {
			res.status(422).json({ status: "error", details: "This Email Already Exists" })
		} else {

			// TODO: try sending an email, if success do below stuff, else, quit

			// TODO: here password hasing
			let hashedPassword = password

			const finalUser = new userdb({
				fname, email, password: hashedPassword
			});

			const storeData = await finalUser.save();

			// console.log(storeData);
			res.status(200).json({ status: "success", details: "User created successfully." })
		}

	} catch (error) {
		res.status(422).json(error);
		console.log("catch block error",error);
	}

});

// user Login
router.post("/login", async (req, res) => {
	console.log(req.body);

	const { email, password } = req.body;

	if (!email || !password) {
		res.status(422).json({ error: "fill all the details" })
	}

	try {
		const userValid = await userdb.findOne({ email: email });

		if (userValid) {

			const isMatch = await bcrypt.compare(password, userValid.password);

			if (!isMatch) {
				res.status(422).json({ error: "invalid details" })
			} else {

				// token generate
				const token = await userValid.generateAuthtoken();

				// cookiegenerate
				res.cookie("usercookie", token, {
					expires: new Date(Date.now() + 9000000),
					httpOnly: true
				});

				const result = {
					userValid,
					token
				}
				res.status(201).json({ status: 201, result })
			}
		} else {
			res.status(401).json({ status: 401, message: "invalid details" });
		}

	} catch (error) {
		res.status(401).json({ status: 401, error });
		console.log("catch block");
	}
});

// user valid
router.get("/validuser", authenticate, async (req, res) => {
	try {
		const ValidUserOne = await userdb.findOne({ _id: req.userId });
		res.status(201).json({ status: 201, ValidUserOne });
	} catch (error) {
		res.status(401).json({ status: 401, error });
	}
});

// user logout
router.get("/logout", authenticate, async (req, res) => {
	try {
		req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
			return curelem.token !== req.token
		});

		res.clearCookie("usercookie", { path: "/" });

		req.rootUser.save();

		res.status(201).json({ status: 201 })

	} catch (error) {
		res.status(401).json({ status: 401, error })
	}
});



// send email Link For reset Password
router.post("/sendpasswordlink", async (req, res) => {
	console.log(req.body)

	const { email } = req.body;

	if (!email) {
		res.status(401).json({ status: 401, message: "Enter Your Email" })
	}

	try {
		const userfind = await userdb.findOne({ email: email });

		// token generate for reset password
		const token = jwt.sign({ _id: userfind._id }, keysecret, {
			expiresIn: "900s"
		});

		const setusertoken = await userdb.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });


		if (setusertoken) {
			const mailOptions = {
				from: process.env.EMAIL,
				to: email,
				subject: "ASSIGNMENT - RESET PASSWORD ",
				text: `Dear User, \n\nRemember that If you don’t use this link within 15 minutes , it will expire.\n\nLink to change your password - http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken} \n\nThanks,\nAdmin`
			}

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log("error", error);
					res.status(401).json({ status: 401, message: "email not send" })
				} else {
					console.log("Email sent", info.response);
					res.status(201).json({ status: 201, message: "Email sent successfully!" })
				}
			})

		}

	} catch (error) {
		res.status(401).json({ status: 401, message: "invalid user" })
	}

});


// verify user for forgot password time
router.get("/forgotpassword/:id/:token", async (req, res) => {
	const { id, token } = req.params;

	try {
		const validuser = await userdb.findOne({ _id: id, verifytoken: token });

		const verifyToken = jwt.verify(token, keysecret);

		console.log(verifyToken)

		if (validuser && verifyToken._id) {
			res.status(201).json({ status: 201, validuser })
		} else {
			res.status(401).json({ status: 401, message: "user not exist" })
		}

	} catch (error) {
		res.status(401).json({ status: 401, error })
	}
});


// change password

router.post("/:id/:token", async (req, res) => {
	const { id, token } = req.params;

	const { password } = req.body;

	try {
		const validuser = await userdb.findOne({ _id: id, verifytoken: token });

		const verifyToken = jwt.verify(token, keysecret);

		if (validuser && verifyToken._id) {
			const newpassword = await bcrypt.hash(password, 12);

			const setnewuserpass = await userdb.findByIdAndUpdate({ _id: id }, { password: newpassword });

			setnewuserpass.save();
			res.status(201).json({ status: 201, setnewuserpass })

		} else {
			res.status(401).json({ status: 401, message: "user not exist" })
		}
	} catch (error) {
		res.status(401).json({ status: 401, error })
	}
})



module.exports = router;



// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true
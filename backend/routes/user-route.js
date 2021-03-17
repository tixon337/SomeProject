/* eslint-disable import/extensions */
import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { UserModel } from '../Database/database.js';
import e from 'express';

dotenv.config();

const saltRounds = 10;
const route = express.Router();
const mail = process.env.MAIL_NAME.toString();
const mailPass = process.env.MAIL_PASSWORD.toString();

const transporter = nodemailer.createTransport({
	host: 'smtp.yandex.com',
	port: 465,
	secure: true,
	auth: {
		user: mail,
		pass: mailPass,
	},
});

route
	.get('/all-users', async (req, res) => {
		if (req.session.user.status === 'chieftain') {
			const users = await UserModel.find();
			res.json({ users, message: 'Request succeeded' });
		} else res.json({ message: "You're not a chieftain" });
	})
	.get('/get-status', async (req, res) => {
		if (req.session.user) {
			res.json({ status: req.session.user.status });
		} else res.json({ message: 'User is not logged in' });
	})
	.post('/login', async (req, res) => {
		const user = await UserModel.findOne({ email: req.body.email });
		if (user && (await bcrypt.compare(req.body.password, user.password))) {
			req.session.user = user;
			req.session.user.password = '';
			res.json({ message: 'Successful login', user: req.session.user });
		} else {
			res.json({
				message:
					'Something went wrong. Check pleasewhether your username or password is correct.',
			});
		}
	})
	.post('/logout', (req, res) => {
		if (req.session.user) {
			req.session.destroy(() => {
				res.clearCookie('user_sid', { path: '/' });
				res.json({ message: 'Successful logout', status: '' });
			});
		} else res.json({ message: 'Something went wrong' });
	})
	// create user
	.put('/create-user', async (req, res) => {
		try {
			const { password, status, name, email } = req.body;
			const adminStatus = req.session.user.status;
			const userCheck = await UserModel.findOne({ email });
			if (
				!userCheck &&
				(adminStatus === 'creator' || 'admin') &&
				status === 'user' &&
				req.session.user
			) {
				try {
					const send = {
						from: `DataInterface admin" <${req.session.user.email}>`,
						to: `${email}`,
						subject: 'Аккаунт для dataInterface',
						text: `
          Привет, ${name}!
          Твой аккаунт от dataInterface:
          Логин: ${email}
          Пароль: ${password}`,
					};
					transporter.sendMail(send, (error, info) => {
						if (error) {
							console.log(error);
						} else {
							console.log(`email sent ${info.response}`);
						}
					});
				} catch {}
				await UserModel.create({
					name: name, // ФИО
					email: email,
					status: status,
					password: await bcrypt.hash(password, saltRounds),
				});
				res.json({ message: 'User has been created.', user });
			} else
				res.json({
					message:
						'Something went wrong. Maybe this email is already used.',
				});
		} catch {
			res.json({ message: 'Something went wrong.' });
		}
	})
	// delete user
	.delete('/', async (req, res) => {
		const { email, status, id } = req.body;
		const userToDelete = {
			email,
			status,
		};
		const adminStatus = req.session.user.status;
		if (
			adminStatus === ('admin' || 'creator') &&
			userToDelete.status === 'user'
		) {
			await UserModel.findOneAndRemove({ _id: id });
			res.json({ message: 'User has been deleted.' });
		} else res.json({ message: "Couldn't delete user." });
	});

export default route;

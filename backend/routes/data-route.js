/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import { DataModel, UserModel, getData } from '../Database/database.js';

const route = express.Router();

route.get('/get-data', async (req, res) => {
	const allData = await getData();
	res.json({ allData });
});

route.post('/clients', async (req, res) => {
	try {
		let oneNote = await DataModel.findOne({ Uid: req.body.Uid });
		if (oneNote) {
			oneNote.Uid = req.body.Uid;
			oneNote.IP = req.body.IP;
			oneNote.LocalMachineTime = req.body.LocalMachineTime;
			oneNote.OS = req.body.OS;
			oneNote.Version = req.body.Version;
			oneNote.b2b = req.body.b2b;
			oneNote.id_sales = req.body.id_sales;
			oneNote.connection_date = Date.now();
			oneNote.LIP = req.body.LIP;
			oneNote.AV = req.body.AV;
			oneNote.Country = req.body.Country;
			oneNote.City = req.body.City;
			oneNote.cl_name = req.body.cl_name;
			oneNote.cl_mail = req.body.cl_mail;
			oneNote.cl_wrole = req.body.cl_wrole;
			oneNote.cl_feedback = req.body.cl_feedback;
			await oneNote.save();
		} else {
			await DataModel.create({
				Uid: req.body.Uid,
				IP: req.body.IP,
				LocalMachineTime: req.body.LocalMachineTime,
				OS: req.body.OS,
				Version: req.body.Version,
				b2b: req.body.b2b,
				id_sales: req.body.id_sales,
				connection_date: Date.now(),
				LIP = req.body.LIP,
				AV = req.body.AV,
				Country = req.body.Country,
				City = req.body.City,
				cl_name = req.body.cl_name,
				cl_mail = req.body.cl_mail,
				cl_wrole = req.body.cl_wrole,
				cl_feedback = req.body.cl_feedback,
			});
		}
		res.json({ message: 'Data has been added' });
	} catch {
		res.json({ errorMessage: 'Something wrong with info' });
	}
});

route.delete('/delete-data', async (req, res) => {
	try {
		await DataModel.findOneAndRemove({ _id: req.body._id });
		res.json({ message: 'data has been deleted' });
	} catch (error) {
		res.json({ errorMessage: error });
	}
});

export default route;

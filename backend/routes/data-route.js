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
		const dataArray = req.body;
		for (const el of dataArray) {
			let oneNote = await DataModel.findOne({ Uid: el.Uid });
			if (oneNote) {
				oneNote = {
					Uid: el.Uid,
					IP: el.IP,
					LocalMachineTime: el.LocalMachineTime,
					OS: el.OS,
					Version: el.Version,
					b2b: el.b2b,
					id_sales: el.id_sales,
					connection_date: Date.now(),
				};
				await oneNote.save();
			} else {
				await DataModel.create({
					Uid: el.Uid,
					IP: el.IP,
					LocalMachineTime: el.LocalMachineTime,
					OS: el.OS,
					Version: el.Version,
					b2b: el.b2b,
					id_sales: el.id_sales,
					connection_date: Date.now(),
				});
			}
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

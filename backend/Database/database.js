import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri =
	'mongodb+srv://tixon:project25082000@someproject.bcp6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
try {
	mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (error) {
	console.log(error);
}

mongoose.pluralize(null);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка соединения с MongoDB'));

const User = new mongoose.Schema({
	name: {
		// ФИО
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	status: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

const Data = new mongoose.Schema({
	Uid: { type: String },
	IP: { type: String },
	LocalMachineTime: { type: String },
	OS: { type: String },
	Version: { type: String },
	b2b: { type: String },
	id_sales: { type: String },
	connection_date: { type: Date },
	status: { type: Number },
});

export const UserModel = mongoose.model('User', User);
export const DataModel = mongoose.model('Data', Data);

// async function seed() {
// 	const dataArray = [
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 		{
// 			Uid: 'C1-A6-3A-59-0A-B4-8C-CE-B8-6B-C3-E6-B7-D0-96-1D-51',
// 			IP: '198.2.227.100',
// 			LocalMachineTime: '2021-03-15T01:56:06.675966-08:00',
// 			OS: 'Microsoft Windows 8.1',
// 			Version: '1.0.0.0',
// 			b2b: 'WORKGROUP',
// 			id_sales: '000-000',
// 			connection_date: 1615802296329,
// 			status: 3,
// 		},
// 	];
// 	for (const el of dataArray) {
// 		await DataModel.create({
// 			Uid: el.Uid,
// 			IP: el.IP,
// 			LocalMachineTime: el.LocalMachineTime,
// 			OS: el.OS,
// 			Version: el.Version,
// 			b2b: el.b2b,
// 			id_sales: el.id_sales,
// 			connection_date: el.connection_date,
// 			status: el.status,
// 		});
// 	}

// 	UserModel.create({
// 		name: 'Tixon',
// 		email: 'maremshaov.t@yandex.ru',
// 		password: '12345',
// 		status: 'creator',
// 	});
// }

// seed();

export async function getData() {
	const data = await DataModel.find();
	return data;
}

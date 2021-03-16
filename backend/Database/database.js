import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = 'mongodb://localhost/SomeProject';
try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {}

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

export async function getData() {
  const data = await DataModel.find();
  return data;
}

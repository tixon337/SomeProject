import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import CancelIcon from '@material-ui/icons/Cancel';
import { Input } from 'semantic-ui-react';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const getStatus = (time) => {
	let statusTime = Date.now() - Date.parse(time);
	if (statusTime >= 24 * 60 * 60 * 1000) {
		return (
			<>
				<strong style={{ color: '#DD0939' }}>Dead</strong>
			</>
		);
	} else if (statusTime < 24 * 60 * 60 * 1000 && statusTime > 5 * 60 * 1000) {
		return (
			<>
				<strong style={{ color: '#A59715' }}>Offline</strong>
			</>
		);
	} else if (statusTime < 5 * 60 * 1000) {
		return (
			<>
				<strong style={{ color: '#71BE1E' }}>Online</strong>
			</>
		);
	}
};

const getTimeForTable = (time) => {
	let date = new Date(time);
	return <>{date.toString()}</>;
};

export default function App() {
	const [userStatus, setUserStatus] = useState('guest');
	// const [user, setUser] = useState({});

	const TableRows = () => {
		const [rows, setRows] = useState([]);
		const classes = useStyles();

		useEffect(() => {
			axios.get('/api/get-data').then(function (response) {
				// handle success
				setRows(
					response.data.allData.sort(
						(a, b) =>
							Date.parse(b.connection_date) -
							Date.parse(a.connection_date)
					)
				);
			});
			const interval = setInterval(() => {
				axios.get('/api/get-data').then(function (response) {
					// handle success
					setRows(
						response.data.allData.sort(
							(a, b) =>
								Date.parse(b.connection_date) -
								Date.parse(a.connection_date)
						)
					);
				});
			}, 5000);
			return () => clearInterval(interval);
		}, []);

		const handleBTN = () => {
			axios.get('/api/get-data').then(function (response) {
				// handle success
				setRows(
					response.data.allData.sort(
						(a, b) =>
							Date.parse(b.connection_date) -
							Date.parse(a.connection_date)
					)
				);
			});
		};

		const deleteData = (id) => {
			axios
				.delete('api/delete-data', {
					data: { _id: id },
				})
				.then(() => {
					setRows(rows.filter((el) => el._id !== id));
				});
		};

		const DeadStatistic = () => {
			let dead = 0;
			let offline = 0;
			let online = 0;
			rows.forEach((row) => {
				let statusTime = Date.now() - Date.parse(row.connection_date);
				if (statusTime >= 24 * 60 * 60 * 1000) {
					dead++;
				} else if (
					statusTime < 24 * 60 * 60 * 1000 &&
					statusTime > 5 * 60 * 1000
				) {
					offline++;
				} else if (statusTime < 5 * 60 * 1000) {
					online++;
				}
			});

			return (
				<>
					<strong>All count{' ' + rows.length + '  '}</strong>
					<strong style={{ color: '#DD0939' }}>
						Dead{' ' + dead + ' '}
					</strong>
					<strong style={{ color: '#A59715' }}>
						Offline{' ' + offline + ' '}
					</strong>
					<strong style={{ color: '#71BE1E' }}>
						Online{' ' + online + ' '}
					</strong>
				</>
			);
		};

		return (
			<>
				<Button onClick={() => handleBTN()} color={'primary'}>
					Обновить
				</Button>
				<DeadStatistic />
				<div className="table-rows">
					<TableContainer component={Paper}>
						<Table
							className={classes.table}
							size="small"
							aria-label="a dense table"
						>
							<TableHead>
								<TableRow>
									<TableCell>Uid</TableCell>
									<TableCell align="right">IP</TableCell>
									<TableCell align="right">
										LocalMachineTime
									</TableCell>
									<TableCell align="right">OS</TableCell>
									<TableCell align="right">Version</TableCell>
									<TableCell align="right">b2b</TableCell>
									<TableCell align="right">
										id_sales
									</TableCell>
									<TableCell align="right">
										connection_date
									</TableCell>
									<TableCell align="right">status</TableCell>
									{userStatus === 'admin' ||
									userStatus === 'creator' ? (
										<TableCell align="right"></TableCell>
									) : (
										<></>
									)}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows ? (
									rows?.map((row, i) => (
										<TableRow key={row._id}>
											<TableCell>{row.Uid}</TableCell>
											<TableCell align="right">
												{row.IP}
											</TableCell>
											<TableCell align="right">
												{getTimeForTable(
													row.LocalMachineTime
												)}
											</TableCell>
											<TableCell align="right">
												{row.OS}
											</TableCell>
											<TableCell align="right">
												{row.Version}
											</TableCell>
											<TableCell align="right">
												{row.b2b}
											</TableCell>
											<TableCell align="right">
												{row.id_sales}
											</TableCell>
											<TableCell align="right">
												{getTimeForTable(
													row.connection_date
												)}
											</TableCell>
											<TableCell align="right">
												{getStatus(row.connection_date)}
											</TableCell>
											{userStatus === 'admin' ||
											userStatus === 'creator' ? (
												<TableCell align="right">
													<Button
														color={'primary'}
														onClick={() =>
															deleteData(row._id)
														}
													>
														Удалить
													</Button>
												</TableCell>
											) : (
												<></>
											)}
										</TableRow>
									))
								) : (
									<></>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</>
		);
	};

	const CreateUserForm = () => {
		let [crUserOpen, setCrUserOpen] = useState(false);
		const handleClose = () => {
			setCrUserOpen(false);
		};
		const handleOpen = () => {
			setCrUserOpen(true);
		};
		const [inputName, setInputName] = useState('');
		const [inputEmail, setInputEmail] = useState('');
		const [inputPassword, setInputPassword] = useState('');
		const [selectValue, setSelectValue] = useState('user');
		const [errorMessage, setErrorMessage] = useState('');
		function createUser(event) {
			event.preventDefault();
			axios
				.put('/user/create-user', {
					name: inputName,
					email: inputEmail,
					status: selectValue,
					password: inputPassword,
				})
				.then((res) => {
					if (res.data.message === 'User has been created.') {
					}
				});
			setInputEmail('');
			setInputName('');
		}

		return (
			<>
				{userStatus === 'admin' || userStatus === 'creator' ? (
					<Button color={'primary'} onClick={() => handleOpen()}>
						Добавить Юзера
					</Button>
				) : (
					<></>
				)}

				<Dialog
					open={crUserOpen}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						Add new user
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							<div id="newUserForm">
								<form onSubmit={(event) => createUser(event)}>
									<Input
										name="name"
										type="text"
										placeholder="ФИО"
										onChange={(event) =>
											setInputName(event.target.value)
										}
										value={inputName}
									/>
									<Input
										name="email"
										type="email"
										placeholder="Email"
										onChange={(event) =>
											setInputEmail(event.target.value)
										}
										value={inputEmail}
									/>
									<Input
										name="password"
										type="password"
										placeholder="Password"
										onChange={(event) =>
											setInputPassword(event.target.value)
										}
										value={inputPassword}
									/>
									<select
										placeholder="Select user's status"
										onChange={(event) =>
											setSelectValue(event.target.value)
										}
									>
										<option value="user" defaultValue>
											User
										</option>
										<option value="admin">Admin</option>
									</select>
									<button
										type="submit"
										id="createUserButton"
										className="createUserButton"
									>
										Create user
									</button>
								</form>
								{errorMessage && errorMessage}
							</div>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	};

	const Navbar = () => {
		const [modalOpen, setModalOpen] = useState(false);
		const handleBTN = (action) => {
			if (action === 'login') {
				setModalOpen(true);
			} else if (action === 'logout') {
				axios.post('/user/logout').then((res) => {
					if (res.data.message === 'Successful logout') {
						setUserStatus('guest');
					}
				});
			}
		};

		function LoginForm() {
			const handleClose = () => {
				setModalOpen(false);
			};
			const [errorMessage, setErrorMessage] = useState('');
			const [inputEmail, setInputEmail] = useState('');
			const [inputPassword, setInputPassword] = useState('');

			function sendForm(event) {
				event.preventDefault();
				axios
					.post('/user/login', {
						email: inputEmail,
						password: inputPassword,
					})
					.then((res) => {
						if (res.data.message === 'Successful login') {
							setUserStatus(res.data.user.status);
						}
						setErrorMessage(res.data.message);
					});
				setInputEmail('');
				setInputPassword('');
			}

			if (errorMessage === 'Successful login') {
				handleClose();
			}

			return (
				<>
					<Dialog
						open={modalOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleClose}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle id="alert-dialog-slide-title">
							Please verify your identity
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<form onSubmit={(event) => sendForm(event)}>
									<Input
										name="email"
										type="email"
										placeholder="Email"
										value={inputEmail}
										onChange={(event) =>
											setInputEmail(event.target.value)
										}
									/>
									<Input
										name="password"
										type="password"
										placeholder="Password"
										value={inputPassword}
										onChange={(event) =>
											setInputPassword(event.target.value)
										}
									/>
									<Button
										type="submit"
										id="loginSubmitButton"
										className="loginButton"
									>
										Log in
									</Button>
									{errorMessage && (
										<strong>{errorMessage}</strong>
									)}
								</form>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								{/* <CancelIcon /> */}
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</>
			);
		}

		return (
			<>
				<div className="navbar">
					{userStatus === 'guest' ? (
						<Button
							onClick={() => handleBTN('login')}
							color={'primary'}
						>
							Войти
						</Button>
					) : (
						<Button
							onClick={() => handleBTN('logout')}
							color={'primary'}
						>
							Выйти
						</Button>
					)}
				</div>
				<LoginForm />
			</>
		);
	};

	useEffect(() => {
		axios.get('/user/get-status').then((res) => {
			if (res.data.status) {
				setUserStatus(res.data.status);
			}
		});
	}, []);

	return (
		<>
			<Navbar />
			<CreateUserForm />
			{userStatus !== 'guest' ? (
				<TableRows />
			) : (
				<>
					<h1>
						Для получения доступа к информации войдите в аккаунт
					</h1>
				</>
			)}
		</>
	);
}

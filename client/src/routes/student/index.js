import { h } from 'preact';
import style from './style.css';
import { useState, useEffect } from "preact/hooks";
import { route } from 'preact-router';

const Home = (props) => {
	const [formValues, setFormValues] = useState({ firstName: null, lastName: null, admissionId: null })

	useEffect(async () => {
		if (props.studentId) {
			handleStudentData()
		}

	}, []);

	async function handleStudentData() {
		var studentData = null
		let param = { id: props.studentId };
		await fetch("http://localhost:3000/controller001.getStudents/" + JSON.stringify(param), {
			method: "GET",
		}).then(function (response) {
			return response.text();
		}).then(function (data) {
			studentData = JSON.parse(data)[0]
		})
		setFormValues(studentData)
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		if (props.studentId) {
			let params = { id: props.studentId }
			fetch("http://localhost:3000/controller001.updateStudent/" + JSON.stringify(params), {
				method: "PUT",
				body: JSON.stringify(formValues),
				headers: {
					'Content-Type': 'application/json',
				}
			}).then(function (response) {
				return response.text();
			}).then(function (data) {
				route('/student-list')
			})
		}
		else {
			fetch("http://localhost:3000/controller001.saveStudent", {
				method: "POST",
				body: JSON.stringify(formValues),
				headers: {
					'Content-Type': 'application/json',
				}
			}).then(function (response) {
				return response.text();
			}).then(function (data) {
				route('/student-list')
			})
		}
	}

	return (
		<div class={style.home}>
			<h1>{props.studentId ? 'Edit' : 'Add'} Student</h1>
			<form id="formSubmit" onSubmit={handleSubmit}>
				<label for="fname">First Name</label>
				<input type="text" value={formValues.firstName} onChange={(ev) => setFormValues((prevState) => { return { ...prevState, firstName: ev.target.value }; })} placeholder="Enter First Name" />

				<label for="lname">Last Name</label>
				<input type="text" value={formValues.lastName} onChange={(ev) => setFormValues((prevState) => { return { ...prevState, lastName: ev.target.value }; })} placeholder="Enter Last Name" />

				<label for="admissionId">Admission ID</label>
				<input type="text" value={formValues.admissionId} onChange={(ev) => setFormValues((prevState) => { return { ...prevState, admissionId: ev.target.value }; })} placeholder="Enter Admission ID" />

				<input type="submit" value={props.studentId ? 'Update' : 'Save'} />
			</form>
		</div>
	)
};

export default Home;

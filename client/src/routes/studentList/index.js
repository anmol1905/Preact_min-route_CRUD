import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import style from './style.css';
import { route } from 'preact-router';

const StudentList = () => {

	const [students, setStudents] = useState([])

	useEffect(async () => {
		await fetchStudents()
	}, [students.length]);

	async function fetchStudents() {
		var studentData = null

		await fetch("http://localhost:3000/controller001.getStudents", {
			method: "GET",
		}).then(function (response) {
			return response.text();
		}).then(function (data) {
			studentData = data
		})
		setStudents(JSON.parse(studentData))
	}

	function renderStudentList() {
		if (students.length != 0) {
			return students.map((student) => {
				return (
					<tr>
						<td>{student.firstName}</td>
						<td>{student.lastName}</td>
						<td>{student.admissionId}</td>
						<td>
							<button class={style.button} onClick={() => { handleEdit(student._id) }}>edit</button>
							<button class={style.button} onClick={() => { deleteStudent(student._id) }}>delete</button>
						</td>
					</tr>
				);
			});
		}
	}

	async function handleEdit(_id) {
		route(`/${_id}`)
	}

	async function deleteStudent(_id) {
		let param = { id: _id };
		await fetch(`http://localhost:3000/controller001.deleteStudent/` + JSON.stringify(param), {
			method: "DELETE"
		}).then(function (response) {
			return response.text();
		}).then(function (data) {
			console.log(data)
		});
		const filteredStudents = students.filter((el) => el._id !== _id);
		setStudents(filteredStudents);
	}

	return (
		<div class={style.profile}>
			<h1>Students List</h1>

			<table id={style["students"]}>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Admission ID</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{renderStudentList()}</tbody>
			</table>
		</div>
	);
}

export default StudentList;

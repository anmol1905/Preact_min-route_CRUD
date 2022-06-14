import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/student';
import StudentList from '../routes/studentList';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<StudentList path="/student-list/" user="me" />
			<Home path="/:studentId"/>
		</Router>
	</div>
)

export default App;

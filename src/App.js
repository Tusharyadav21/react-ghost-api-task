import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Links from "./components/Links";
import Pages from "./components/Pages";

import styles from "./App.module.css";

function App() {
	const [active, setActive] = useState("Dashboard");
	return (
		<>
			<Router>
				<div className={styles.container}>
					<div>{`${active}`}</div>
					<div className={styles.button_container}>
						<Link
							to='/'
							onClick={() => {
								setActive("Dashboard");
							}}
						>
							<div className={`${active === "Dashboard" ? styles.active : styles.button}`}>
								Dashboard
							</div>
						</Link>
						<Link
							to='/pages'
							onClick={() => {
								setActive("Pages");
							}}
						>
							<div className={`${active === "Pages" ? styles.active : styles.button}`}>Pages</div>
						</Link>
						<Link
							to='/links'
							onClick={() => {
								setActive("Links");
							}}
						>
							<div className={`${active === "Links" ? styles.active : styles.button}`}>Links</div>
						</Link>
					</div>
				</div>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/pages' element={<Pages />} />
					<Route path='/links' element={<Links />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

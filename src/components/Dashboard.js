import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./custom.module.css";

import externalLinkImg from "./assets/icons8-external-link-24.svg";

import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
const override = css`
	display: block;
	margin: 100px auto;
	transition: all 500ms.;
`;

const Dashboard = () => {
	const [detail1, setDetail1] = useState([]);
	const [detail2, setDetail2] = useState([]);
	const [detail3, setDetail3] = useState([]);
	const [loading, setLoading] = useState(true);

	var color = "#1f8df44d";

	const keys = "8196190b08906dda0ebf6e6f5d";
	//const url = "http://ghost-blog.ipxp.in/ghost/api/v3/content/"

	useEffect(() => {
		const fetchData = async () => {
			const result1 = await axios.get(
				`https://ghost-blog.ipxp.in/ghost/api/v3/content/posts?key=${keys}`
			);
			const result2 = await axios.get(
				`https://ghost-blog.ipxp.in/ghost/api/v3/content/authors?key=${keys}`
			);
			const result3 = await axios.get(
				`https://ghost-blog.ipxp.in/ghost/api/v3/content/tags?key=${keys}`
			);
			// console.log(result1.data);
			// console.log(result2.data);
			// console.log(result3.data);
			setDetail1(result1.data);
			setDetail2(result2.data);
			setDetail3(result3.data);
			setLoading(false);
		};
		fetchData();
	}, []);

	// Alternate Method 1 to Fetch
	// const fetchDetails = useCallback(async () => {
	// 	try {
	// 		const resp1 = await axios.get(
	// 			`https://ghost-blog.ipxp.in/ghost/api/v3/content/posts?key=8196190b08906dda0ebf6e6f5d`
	// 		);
	// 		setDetail1(resp1.data === null ? [] : resp1.data);
	// 		const resp2 = await axios.get(
	// 			`https://ghost-blog.ipxp.in/ghost/api/v3/content/authors?key=8196190b08906dda0ebf6e6f5d`
	// 		);
	// 		setDetail2(resp2.data === null ? [] : resp2.data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// 	// setLoading(false);
	// }, [setDetail1, setDetail2]);

	// useEffect(() => {
	// 	fetchDetails();
	// }, [fetchDetails]);

	// Alternate Method 2 for Fetch
	// useEffect(() => {
	// 	fetch("https://ghost-blog.ipxp.in/ghost/api/v3/content/tags?key=8196190b08906dda0ebf6e6f5d")
	// 		.then((resp1) => resp1.json())
	// 		.then((data) => setDetails(data));
	// }, []);

	//  Custom Date Function
	// function custom_sort(a, b) {
	// 	return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
	// }

	// const d = new Date();
	// let text = d.toISOString();
	// console.log(text);

	let latestPost;
	if (!loading) {
		latestPost = detail1.posts.slice(0, 5);
		// console.log(latestPost);
	}

	const openInNewTab = (url) => {
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};

	return (
		<>
			<div className={styles.body}>
				{loading ? (
					<PuffLoader color={color} loading={loading} css={override} size={60} />
				) : (
					<div>
						<div className={styles.card_container}>
							<div className={styles.card}>
								<h3>Total number of Posts </h3>
								<h4>{detail1.posts.length} </h4>
							</div>
							<div className={styles.card}>
								<h3>Total number of Pages </h3>
								<h4>{detail1.meta.pagination.pages}</h4>
							</div>
							<div className={styles.card}>
								<h3>Total number of Authors </h3>
								<h4>{detail2.authors.length}</h4>
							</div>
							<div className={styles.card}>
								<h3>Total number of Tags </h3>
								<h4>{detail3.tags.length}</h4>
							</div>
						</div>
						{/* {detail1.posts.forEach((element) => {
						const date = element.created_at;
						let month = date.slice(5, 7);
						month = parseInt(month);
						const old = text - (new Date().getMonth() + 1);
						if (old < 5) {
							// console.log(element);
						}
					})} */}
						<div className={styles.card_container2}>
							<div className={`${styles.card} ${styles.card_padding}`}>
								<h3>Latest 5 Published posts List</h3>
								{latestPost.map((element) => {
									// console.log(element);
									return (
										<div
											className={styles.box_container}
											key={element.id}
											onClick={() => openInNewTab(element.url)}
										>
											<p>&bull; {element.title}</p>
											<img className={styles.redirect_svg} src={externalLinkImg} alt='Redirect' />
										</div>
									);
								})}
							</div>
							<div className={`${styles.card} ${styles.card_padding} ${styles.card_minheight}`}>
								<h3>Posts per month Chart</h3>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;

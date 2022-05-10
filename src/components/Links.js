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

const Links = () => {
	const [detail1, setDetail1] = useState([]);
	const [loading, setLoading] = useState(true);

	var color = "#1f8df44d";

	const keys = "8196190b08906dda0ebf6e6f5d";

	useEffect(() => {
		const fetchData = async () => {
			const result1 = await axios.get(
				`https://ghost-blog.ipxp.in/ghost/api/v3/content/posts?key=${keys}`
			);
			// console.log(result1.data.posts);
			setDetail1(result1.data.posts);
			setLoading(false);
		};
		fetchData();
	}, []);

	let arrMatches = [];

	const URLparser = (str) => {
		let matches = str.match(/(https?:\/\/[^"\\< ]*)/gim);
		return matches;
	};

	if (!loading) {
		detail1.forEach((element) => {
			const URLs = URLparser(element.html);
			if (URLs !== null && URLs !== []) {
				// console.log(URLs);
				URLs.forEach((e) => {
					arrMatches.push(e);
				});
			}
		});
		// console.log(arrMatches);

		const totalCount = arrMatches.reduce((prevValue, vote) => {
			if (prevValue[vote]) {
				prevValue[vote]++;
			} else {
				prevValue[vote] = 1;
			}
			return prevValue;
		}, {});

		// console.log(totalCount);

		var internalLinks = [];
		var externalLinks = [];

		// totalCount.map((element) => {
		// 	if (element.includes("https://ghost")) {
		// 		internalLinks.push(element);
		// 	} else {
		// 		externalLinks.push(element);
		// 	}
		// });
		var totalLinks = 0;
		var totalinternalLinks = 0;
		var totalexternalLinks = 0;

		Object.entries(totalCount).forEach((element) => {
			totalLinks += element[1];
			// console.log(element);
			if (element[0].includes("https://ghost")) {
				internalLinks.push(element);
				totalinternalLinks += element[1];
			} else {
				externalLinks.push(element);
				totalexternalLinks += element[1];
			}
		});

		// console.log(total);

		// console.log(`internalLinks ${internalLinks}`);
		// console.log(`externalLinks ${externalLinks}`);

		// Verification Purpose
		// internalLinks.map((element) => {
		// 	console.log(element);
		// });
	}
	var icount = 0;
	var ecount = 0;

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
					<div className={styles.links_card_container}>
						<div className={`${styles.card} ${styles.card_minheight} ${styles.card_maxheight}`}>
							<h3>Number of Total Links in All Posts</h3>
							<h4>{totalLinks}</h4>
							<h3>Number of Internal Links</h3>
							<h4>{totalinternalLinks}</h4>
							<h3>Number of External Links</h3>
							<h4>{totalexternalLinks}</h4>
						</div>
						<div className={`${styles.card} ${styles.card_minheight}`}>
							<h3>List of Broken Internal Links</h3>
							{internalLinks.map((element) => {
								icount += 1;
								return (
									<div
										key={element[0]}
										className={styles.links_box_container}
										onClick={() => openInNewTab(element[0])}
									>
										<h5>{icount}</h5>
										<div>
											<span className={styles.links_url}>{element[0]}</span>
											<hr></hr>
											<div className={styles.links_used}>
												<p>{element[1]}</p>
												<p>&nbsp;Times Used</p>
											</div>
											<img className={styles.redirect_svg} src={externalLinkImg} alt='Redirect' />
										</div>
									</div>
								);
							})}
						</div>
						<div className={styles.empty_container}></div>
						<div className={`${styles.card} ${styles.card_minheight}`}>
							<h3>List of Broken External Links</h3>
							{externalLinks.map((element) => {
								ecount += 1;
								return (
									<div
										key={element[0]}
										className={styles.links_box_container}
										onClick={() => openInNewTab(element[0])}
									>
										<h5>{ecount}</h5>
										<div>
											<span className={styles.links_url}>{element[0]}</span>
											<hr></hr>
											<div className={styles.links_used}>
												<p>{element[1]}</p>
												<p>&nbsp;Times Used</p>
											</div>

											<img className={styles.redirect_svg} src={externalLinkImg} alt='Redirect' />
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Links;

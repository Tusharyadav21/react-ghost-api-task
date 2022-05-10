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

const Pages = () => {
	const [detail1, setDetail1] = useState([]);
	const [loading, setLoading] = useState(true);

	var color = "#1f8df44d";

	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	var count4 = 0;
	var count5 = 0;
	var count6 = 0;

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

	let withoutMeta = [];
	let longMeta = [];
	let longURL = [];
	let withoutIMG = [];
	let shortPosts = [];
	let longPosts = [];

	if (!loading) {
		detail1.forEach((element) => {
			if (element.meta_description === null || element.meta_description === "") {
				withoutMeta.push(element);
			}
			if (element.meta_description !== null && element.meta_description.length > 100) {
				longMeta.push(element);
			}
			if (element.url.length > 100) {
				longURL.push(element);
			}
			if (element.feature_image === null || element.feature_image === "") {
				withoutIMG.push(element);
			}
			if (element.html.length < 250) {
				shortPosts.push(element);
			}
			if (element.html.length > 1500) {
				longPosts.push(element);
			}
		});
		// console.log(withoutMeta);
		// console.log(longMeta);
		// console.log(longURL);
		// console.log(withoutIMG);
		// console.log(shortPosts);
		// console.log(longPosts);
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
						<div className={styles.pages_card_container}>
							<div className={`${styles.card} ${styles.card_minheight}`}>
								<h3>Without Meta Description</h3>
								{withoutMeta === [] ? (
									<p className={styles.nothing}>👏 Yay, Nothing to display &#9996; </p>
								) : (
									withoutMeta.map((element) => {
										count1 += 1;
										return (
											<div
												key={element.id}
												className={styles.pages_box_container}
												onClick={() => openInNewTab(element.url)}
											>
												<h5>{count1}</h5>
												<div>
													<p className={styles.pages_title}>{element.title}</p>
													<p className={styles.pages_url}>{element.url}</p>
													<img
														className={styles.redirect_svg}
														src={externalLinkImg}
														alt='Redirect'
													/>
												</div>
											</div>
										);
									})
								)}
							</div>
							<div className={`${styles.card} ${styles.card_minheight}`}>
								<h3>List of Posts without Featured Image</h3>
								{withoutIMG.length <= 0 ? (
									<p className={styles.nothing}>👏 Yay, Nothing to display &#9996; </p>
								) : (
									withoutIMG.map((element) => {
										count2 += 1;
										return (
											<div
												key={element.id}
												className={styles.pages_box_container}
												onClick={() => openInNewTab(element.url)}
											>
												<h5>{count2}</h5>
												<div>
													<p className={styles.pages_title}>{element.title}</p>
													<p className={styles.pages_url}>{element.url}</p>
													<img
														className={styles.redirect_svg}
														src={externalLinkImg}
														alt='Redirect'
													/>
												</div>
											</div>
										);
									})
								)}
							</div>
							<div className={`${styles.card} ${styles.card_minheight}`}>
								<h3>Too long Meta Description</h3>
								{longMeta.length <= 0 ? (
									<p className={styles.nothing}>👏 Yay, Nothing to display &#9996; </p>
								) : (
									longMeta.map((element) => {
										count3 += 1;
										return (
											<div
												key={element.id}
												className={styles.pages_box_container}
												onClick={() => openInNewTab(element.url)}
											>
												<h5>{count3}</h5>
												<div>
													<p className={styles.pages_title}>{element.title}</p>
													<p className={styles.pages_url}>{element.url}</p>
													<img
														className={styles.redirect_svg}
														src={externalLinkImg}
														alt='Redirect'
													/>
												</div>
											</div>
										);
									})
								)}
							</div>{" "}
							<div className={`${styles.card} ${styles.card_minheight}`}>
								<h3>Too long URL, more than 100 chars</h3>
								{longURL.length <= 0 ? (
									<p className={styles.nothing}>👏 Yay, Nothing to display &#9996; </p>
								) : (
									longURL.map((element) => {
										count4 += 1;
										return (
											<div
												key={element.id}
												className={styles.pages_box_container}
												onClick={() => openInNewTab(element.url)}
											>
												<h5>{count4}</h5>
												<div>
													<p className={styles.pages_title}>{element.title}</p>
													<p className={styles.pages_url}>{element.url}</p>
													<img
														className={styles.redirect_svg}
														src={externalLinkImg}
														alt='Redirect'
													/>
												</div>
											</div>
										);
									})
								)}
							</div>
							<div className={`${styles.card} ${styles.card_minheight}`}>
								<h3>Too Long Posts, More than 1500 words</h3>
								{longPosts.length <= 0 ? (
									<p className={styles.nothing}>👏 Yay, Nothing to display &#9996; </p>
								) : (
									longPosts.map((element) => {
										count5 += 1;
										return (
											<div
												key={element.id}
												className={styles.pages_box_container}
												onClick={() => openInNewTab(element.url)}
											>
												<h5>{count5}</h5>
												<div>
													<p className={styles.pages_title}>{element.title}</p>
													<p className={styles.pages_url}>{element.url}</p>
													<img
														className={styles.redirect_svg}
														src={externalLinkImg}
														alt='Redirect'
													/>
												</div>
											</div>
										);
									})
								)}
							</div>
							<div className={`${styles.card} ${styles.card_minheight}`}>
								<h3>Too Short Posts, Below 250 words</h3>
								{shortPosts.length <= 0 ? (
									<p className={styles.nothing}>👏 Yay, Nothing to display &#9996; </p>
								) : (
									shortPosts.map((element) => {
										count6 += 1;
										return (
											<div
												key={element.id}
												className={styles.pages_box_container}
												onClick={() => openInNewTab(element.url)}
											>
												<h5>{count6}</h5>
												<div>
													<p className={styles.pages_title}>{element.title}</p>
													<p className={styles.pages_url}>{element.url}</p>
													<img
														className={styles.redirect_svg}
														src={externalLinkImg}
														alt='Redirect'
													/>
												</div>
											</div>
										);
									})
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Pages;

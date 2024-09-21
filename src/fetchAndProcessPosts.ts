import process from "process";
import https from "https";
import {httpsGetAsync} from "./httpGetAsync";
import {vkAnswer} from "./vkTypes";
import {sendPost} from "./telegram";
import {LastCheck} from "./lastCheck";


const {
	VK_TOKEN,
	VK_GROUP_ID,
	MAX_MESSAGE_LENGTH = 1000
} = process.env;


async function fetchAndProcessPosts(lastCheck: LastCheck) {
	try {
		const options: https.RequestOptions = {
			hostname: "api.vk.com",
			port: 443,
			path: `/method/wall.get?owner_id=${VK_GROUP_ID}&filter=owner&access_token=${VK_TOKEN}&v=5.126`,
			agent: false
		};

		const responseBody = await httpsGetAsync(options);
		const answer: vkAnswer = JSON.parse(responseBody);
		const posts = answer.response.items
			.reverse()
			.filter((post) => post.text.trim() !== "");

		for(const post of posts) {
			if(lastCheck.time >= post.date) continue;

			let {text} = post;

			if(text.length >= Number(MAX_MESSAGE_LENGTH)) {
				text = text.substring(0, Number(MAX_MESSAGE_LENGTH)).trim();
				text = text.split(".").reverse().slice(1).reverse().join(".") + "...";
			}

			await sendPost(text, post.id);
			lastCheck.time = post.date;
		}
	} catch (error) {
		console.error("Error fetching or processing posts:", error);
	}
}

export {fetchAndProcessPosts};
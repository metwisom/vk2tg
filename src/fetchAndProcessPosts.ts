import https from "node:https";
import {httpsGetAsync} from "./httpGetAsync";
import {vkAnswer} from "./vkTypes";
import {sendPost} from "./telegram";
import {LastCheck} from "./lastCheck";
import {config} from "./config";


const {
	vkToken,
	vkGroupId,
	maxMessageLen
} = config;


async function fetchAndProcessPosts() {
	const lastCheck = new LastCheck();
	const options: https.RequestOptions = {
		hostname: "api.vk.com",
		port: 443,
		path: `/method/wall.get?owner_id=${vkGroupId}&filter=owner&access_token=${vkToken}&v=5.126`,
		agent: false
	};
	await httpsGetAsync(options)
		.then(async responseBody => {
			const answer: vkAnswer = JSON.parse(responseBody);
			const posts = answer.response.items
				.reverse()
				.filter((post) => post.text.trim() !== "");
			let sendCounter = 0;
			for(const post of posts) {
				if(lastCheck.time >= post.date) continue;
				let {text} = post;
				if(text.length >= Number(maxMessageLen)) {
					text = text.substring(0, Number(maxMessageLen)).trim();
					text = text.split(".").reverse().slice(1).reverse().join(".") + "...";
				}
				await sendPost(text, post.id);
				lastCheck.time = post.date;
				sendCounter++;
			}
			if(sendCounter == 0) {
				console.info("Info: There are no new messages to send.");
			}
		});
}

export {fetchAndProcessPosts};
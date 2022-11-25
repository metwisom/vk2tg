import https from "https";
import * as dotenv from "dotenv";

dotenv.config();

import {LastTime} from "./cache";
import {VkAnswer} from "./vkTypes";
import {sendPost} from "./telegram";

let actualLastTime = LastTime.getLastTime();

const VK_TOKEN = process.env.VK_TOKEN;
const VK_GROUP_ID = process.env.VK_GROUP_ID;
const MAX_MESSAGE_LENGTH = process.env.MAX_MESSAGE_LENGTH;

https.get({
	hostname: "api.vk.com",
	port: 443,
	path: `/method/wall.get?owner_id=${VK_GROUP_ID}&filter=owner&access_token=${VK_TOKEN}&v=5.126`,
	agent: false
}, (res) => {

	let body = "";
	res.on("data", data => body += data);
	res.on("end", () => {
		const answer: VkAnswer = JSON.parse(body);
		const posts = answer.response.items.reverse().filter(e => e.text != "");

		for(let item of posts) {
			if(actualLastTime >= item.date) continue;
			let text = item.text;
			if(text.length >= MAX_MESSAGE_LENGTH) {
				text = item.text.substring(0, MAX_MESSAGE_LENGTH).trim().split(".").reverse().slice(1, MAX_MESSAGE_LENGTH).reverse().join(".") + "...";
			}
			sendPost(text, item.id);
			actualLastTime = item.date;
		}
		LastTime.save(actualLastTime);
	});
});






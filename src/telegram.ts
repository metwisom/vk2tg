import {URL} from "node:url";
import {httpsGetAsync} from "./httpGetAsync";
import {config} from "./config";

const {
	vkGroupLink,
	tgBotKey,
	tgChatId,
	vkGroupId
} = config;

async function sendTelegramMessage(apiUrl: URL): Promise<void> {
	const responseBody = await httpsGetAsync(apiUrl);
	const tgAnswer = JSON.parse(responseBody);
	if(tgAnswer.ok !== false) {
		console.log("Success: The message has been sent successfully.");
	} else {
		console.error("Error: " + tgAnswer.description);
	}
}

export async function sendPost(text: string, post_id: number) {
	try {
		const escapedText = text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
		const encodedText = `*Новый пост в группе*\n\n${escapedText}`;
		const buttons = {
			inline_keyboard: [
				[
					{
						text: "Перейти к посту во Вконтакте",
						url: `${vkGroupLink}?w=wall${vkGroupId}_${post_id}`
					}
				]
			]
		};
		const encodedButtons = JSON.stringify(buttons);

		const apiUrl = new URL(`/bot${tgBotKey}/sendMessage`, "https://api.telegram.org");
		apiUrl.searchParams.append("parse_mode", "MarkdownV2");
		apiUrl.searchParams.append("chat_id", tgChatId.toString());
		apiUrl.searchParams.append("reply_markup", encodedButtons);
		apiUrl.searchParams.append("text", encodedText);

		await sendTelegramMessage(apiUrl);

	} catch (error) {
		console.error("Error: Failed to send the message to Telegram. Please check the network connection and Telegram API settings, and try again.", error);
		console.error(error.toString());
	}
}

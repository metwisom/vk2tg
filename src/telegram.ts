import https, {RequestOptions} from "https";
import querystring from "querystring";
import {env} from "process";

interface EnvVariables {
	VK_GROUP_LINK: string;
	BOT_KEY: string;
	TG_CHAT_ID: number;
	VK_GROUP_ID: number;
}

const {VK_GROUP_LINK, BOT_KEY, TG_CHAT_ID, VK_GROUP_ID}: EnvVariables = env;

function prepareText(text: string): string {
	const escapedText = text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
	return encodeURI("*Новый пост в группе*\n\n" + escapedText);
}

function generateButtons(post_id: number): string {
	const buttons = {
		inline_keyboard: [
			[
				{
					text: "Перейти к посту во Вконтакте",
					url: `${VK_GROUP_LINK}?w=wall${VK_GROUP_ID}_${post_id}`
				}
			]
		]
	};
	return encodeURI(JSON.stringify(buttons));
}

export function sendPost(text: string, post_id: number) {
	const preparedText = prepareText(text);
	const encodeButtons = generateButtons(post_id);

	const queryParams = querystring.stringify({
		parse_mode: "MarkdownV2",
		chat_id: TG_CHAT_ID,
		reply_markup: encodeButtons,
		text: preparedText
	});

	const options: RequestOptions = {
		hostname: "api.telegram.org",
		port: 443,
		path: `/bot${BOT_KEY}/sendMessage?${queryParams}`,
		agent: false
	};

	https.get(options);
}

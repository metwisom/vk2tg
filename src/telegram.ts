import https from "https";

const VK_GROUP_LINK = process.env.VK_GROUP_LINK;
const BOT_KEY = process.env.BOT_KEY;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const VK_GROUP_ID = process.env.VK_GROUP_ID;

export function sendPost(text: string, post_id: number) {
	text = text
		.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
	text = "*Новый пост в группе*\n\n" + text;
	text = encodeURI(text);
	const buttons = {
		inline_keyboard: [
			[
				{
					text: "Перейти к посту во Вконтакте",
					"url": `${VK_GROUP_LINK}?w=wall${VK_GROUP_ID}_${post_id}`
				}
			]
		]
	};
	const encodeButtons = encodeURI(JSON.stringify(buttons));
	https.get({
		hostname: "api.telegram.org",
		port: 443,
		path: `/bot${BOT_KEY}/sendMessage?parse_mode=MarkdownV2&chat_id=${TG_CHAT_ID}&reply_markup=${encodeButtons}&text=${text}`,
		agent: false
	});
}
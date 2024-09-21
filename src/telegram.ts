import https from "https";
import { URL } from "url";

const VK_GROUP_LINK: string = process.env.VK_GROUP_LINK as string;
const BOT_KEY: string = process.env.BOT_KEY as string;
const TG_CHAT_ID: string = process.env.TG_CHAT_ID as unknown as string;
const VK_GROUP_ID: string = process.env.VK_GROUP_ID as unknown as string;

if (!VK_GROUP_LINK || !BOT_KEY || !TG_CHAT_ID || !VK_GROUP_ID) {
	throw new Error("Необходимо задать все переменные окружения.");
}

async function sendTelegramMessage(apiUrl: URL): Promise<void> {
	return new Promise((resolve, reject) => {
		const req = https.request(apiUrl.toString(), (res) => {
			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				if (res.statusCode !== 200) {
					return reject(new Error(`Ошибка отправки: ${res.statusCode}, ответ: ${data}`));
				}
				resolve();
			});
		});

		req.on("error", (err) => reject(err));

		req.end();
	});
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
						url: `${VK_GROUP_LINK}?w=wall${VK_GROUP_ID}_${post_id}`
					}
				]
			]
		};
		const encodedButtons = JSON.stringify(buttons);

		const apiUrl = new URL(`/bot${BOT_KEY}/sendMessage`, "https://api.telegram.org");
		apiUrl.searchParams.append("parse_mode", "MarkdownV2");
		apiUrl.searchParams.append("chat_id", TG_CHAT_ID);
		apiUrl.searchParams.append("reply_markup", encodedButtons);
		apiUrl.searchParams.append("text", encodedText);

		await sendTelegramMessage(apiUrl);

		console.log("Сообщение успешно отправлено.");
	} catch (error) {
		console.error("Ошибка при отправке сообщения:", error);
	}
}

const config = {
	vkToken: process.env.VK_TOKEN,
	vkGroupLink: process.env.VK_GROUP_LINK,
	tgBotKey: process.env.BOT_KEY,
	cacheName: process.env.CACHE_NAME,
	vkGroupId: Number(process.env.VK_GROUP_ID),
	tgChatId: Number(process.env.TG_CHAT_ID),
	maxMessageLen: Number(process.env.MAX_MESSAGE_LENGTH),
};

export {config};

if(!config.vkToken) {
	throw new Error("VK_TOKEN не задан");
}
if(!config.vkGroupLink) {
	throw new Error("VK_GROUP_LINK не задан");
}
if(!config.tgBotKey) {
	throw new Error("BOT_KEY не задан");
}
if(!config.cacheName) {
	throw new Error("CACHE_NAME не задан");
}
if(Number.isNaN(config.vkGroupId)) {
	throw new Error("VK_GROUP_ID должен быть числом");
}
if(Number.isNaN(config.tgChatId)) {
	throw new Error("TG_CHAT_ID должен быть числом");
}
if(Number.isNaN(config.maxMessageLen)) {
	throw new Error("MAX_MESSAGE_LENGTH должен быть числом");
}
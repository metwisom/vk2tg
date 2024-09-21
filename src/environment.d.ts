declare global {
	namespace NodeJS {
		interface ProcessEnv {
			VK_TOKEN: string,
			VK_GROUP_ID: number,
			VK_GROUP_LINK: string,
			BOT_KEY: string,
			TG_CHAT_ID: number,
			MAX_MESSAGE_LENGTH: number,
			CACHE_NAME: string
		}
	}
}

export {}
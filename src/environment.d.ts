declare global {
	namespace NodeJS {
		// noinspection JSUnusedGlobalSymbols
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

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
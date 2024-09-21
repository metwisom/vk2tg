import {promises as fs} from "fs";

class LastCheck {
	readonly fileName: string;
	private lastCheckTime: number = Math.round(new Date().getTime() / 1000);

	constructor(cacheFileName: string) {
		this.fileName = cacheFileName;
		this.loadCache().catch((error) => {
			console.error("Error loading cache:", error);
			this.saveCache().then();
		});
	}

	public get time(): number {
		return this.lastCheckTime;
	}

	public set time(value: number) {
		this.lastCheckTime = value;
		this.saveCache().catch((error) => {
			console.error("Error saving cache:", error);
		});
	}

	private loadCache(): Promise<void> {
		return new Promise(async (resolve, reject) => {

			const fileExists = await fs.stat(this.fileName).then(() => true).catch(() => false);
			if(fileExists) {
				const data = await fs.readFile(this.fileName, "utf8");
				const timestamp = parseInt(data, 10);

				if(isNaN(timestamp)) {
					reject(new Error("Cached timestamp is corrupted"));
					return;
				}

				this.lastCheckTime = timestamp;
				resolve();
			}
		});
	}

	private async saveCache(): Promise<void> {
		try {
			await fs.writeFile(this.fileName, this.lastCheckTime.toString(), {encoding: "utf8", flag: "w"});
		} catch (error) {
			console.error(`Error writing cache file ${this.fileName}:`, error);
		}
	}
}

export {LastCheck};

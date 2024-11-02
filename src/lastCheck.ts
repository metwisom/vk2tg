import {promises as fs} from "node:fs";
import {config} from "./config";

class LastCheck {
	readonly fileName: string;
	private lastCheckTime: number = Math.round(new Date().getTime() / 1000);

	constructor() {
		this.fileName = config.cacheName;
		this.loadCache()
			.catch(() => {
				console.warn("Warning: Cache file for the last post check not found or corrupted. A new cache file has been created automatically.");
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

	private async loadCache(): Promise<void> {
		return fs.stat(this.fileName)
			.then(() =>
				fs.readFile(this.fileName, "utf8")
					.then(data => {
						const timestamp = parseInt(data, 10);
						if(isNaN(timestamp)) {
							throw new Error("Cached timestamp is corrupted");
						}
						this.lastCheckTime = timestamp;
					})
			);

	}

	private async saveCache(): Promise<void> {
		try {
			await fs.writeFile(this.fileName, this.lastCheckTime.toString(), {encoding: "utf8", flag: "w"});
		} catch (error) {
			console.error(`Error: Unable to write to the cache file for the last post check. Please check file permissions and try again.`);
			console.error(error.toString());
		}
	};
}

export {LastCheck};

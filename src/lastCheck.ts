import fs from "fs";

class LastCheck {
	readonly fileName: string;
	private _lastCheckTime: number = Math.round(new Date().getTime() / 1000);

	constructor(cache_file_name: string) {
		this.fileName = cache_file_name;
		this.loadCache();

	}

	public get time() {
		return this._lastCheckTime;
	}

	public set time(value: number) {
		this._lastCheckTime = value;
		this.saveCache();
	}

	loadCache() {
		if(fs.existsSync(this.fileName)) {
			let data = parseInt(fs.readFileSync(this.fileName, "utf8"));
			if(isNaN(data)) {
				throw "cached timestamp is corrupted";
			}
			this._lastCheckTime = data;
		}
	}

	saveCache() {
		fs.writeFileSync(this.fileName, this.time.toString(), {encoding: "utf8", flag: "w"});
	}

}

export {LastCheck};

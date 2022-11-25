import fs from "fs";

const cache_file = process.env.CACHE_NAME;

const Cache = () => {
	let lastTime: number | undefined = undefined;
	const getLastTime = () => {
		if(typeof lastTime === "undefined" && typeof (lastTime = load()) === "undefined") {
			lastTime = generateDefault();
		}
		return lastTime as number;
	};
	const load = () => {
		if(!fs.existsSync(cache_file)) {
			return undefined;
		}
		const timestamp = parseInt(fs.readFileSync(cache_file, "utf8"));
		if(isNaN(timestamp)) {
			throw "cached timestamp is corrupted";
		}
		return timestamp;
	};
	const save = (time: number) => {
		lastTime = time;
		fs.writeFileSync(cache_file, time.toString(), {encoding: "utf8", flag: "w"});
	};
	const generateDefault = () => {
		const time = getCurrentTime();
		save(time);
		return time;
	};
	const getCurrentTime = () => {
		return Math.round(new Date().getTime() / 1000);
	};
	return Object.freeze({
		getLastTime,
		save
	});
};


export const LastTime = Cache();

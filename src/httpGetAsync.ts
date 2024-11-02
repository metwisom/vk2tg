import https from "node:https";

function httpsGetAsync(options: https.RequestOptions): Promise<string> {
	return new Promise((resolve, reject) => {
		https.get(options, (res) => {
			let body = "";

			res.on("data", (data) => {
				body += data;
			});

			res.on("end", () => {
				resolve(body);
			});

			res.on("error", (error) => {
				reject(error);
			});
		}).on("error", (error) => {
			reject(error);
		});
	});
}

export {httpsGetAsync};
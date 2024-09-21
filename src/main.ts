import {LastCheck} from "./lastCheck";
import * as process from "process";
import {fetchAndProcessPosts} from "./fetchAndProcessPosts";

const lastCheck = new LastCheck(process.env.CACHE_NAME);
fetchAndProcessPosts(lastCheck).then();

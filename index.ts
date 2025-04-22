import assert from "assert";
import createApp from "./src/app";

// Get the arguments from the command line
const [target_url] = process.argv.slice(2);

assert(target_url, "Please provide a target URL as the first argument.");

createApp(target_url);

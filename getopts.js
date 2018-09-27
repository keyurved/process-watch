const opts = [
    { name: "execute", alias: "x", type: String, multiple: true }
];
const commandLine = require("command-line-args");

const options = commandLine(opts);

const processName = options.execute[0];
var args = null;

if (options.execute.length > 0) {
    args = options.execute.slice(1, options.execute.length);
}



module.exports = {
    processName: processName,
    args: args
};

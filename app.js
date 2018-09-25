const express = require("express");
const app = express();
const longpoll = require('express-longpoll')(app, {DEBUG: true});

const commandLine = require('command-line-args');
const opts = [
    { name: 'program', alias: 'p', type: String, multiple: false }
]
const options = commandLine(opts);
console.log(options);

const { spawn } = require('child_process');
const sp = spawn('cmd.exe', ['/c', options['program']]);

longpoll.create("/");

const port = 3000
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

sp.stdout.on('data', (data) => {
    data = data.toString();
    console.log(data);
    longpoll.publish("/", JSON.stringify({ info: data }));
});

sp.stderr.on('data', (data) => {
    data = data.toString();
    console.log(data);
    longpoll.publish("/", JSON.stringify({ error: data }));
});
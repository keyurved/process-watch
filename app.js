const express = require("express");
const app = express();
const expressWs = require('express-ws')(app);
const commandLine = require('command-line-args');
const { spawn } = require('child_process');
const WebSocket = require('ws');

const opts = [
    { name: 'execute', alias: 'x', type: String, multiple: true }
]
const options = commandLine(opts);

const processName = options.execute.join(" ");
const program = options.execute[0]
var args = []

if (options.execute.length > 1) {
    args = options.execute.slice(1, options.execute.length);
}

const sp = spawn(program, args, { shell: true });

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send(JSON.stringify({ message: msg }));
    });
    sp.stdout.on('data', (data) => {
        data = data.toString();
        try {
            ws.send(JSON.stringify({ processName: processName, message: data, type: "info" }));
        } catch (err) {
            ;
        }
    });

    sp.stderr.on('data', (data) => {
        data = data.toString();
        console.log(data);
        try {
            ws.send(JSON.stringify({ processName: processName, message: data, type: "error" }));
        } catch (err) {
            ;
        }
    });

    sp.on('exit', (code) => {
        try {
            ws.send(JSON.stringify({ processName: processName, message: `Exited with code ${code}`, type: "exit" }));
        } catch (err) {
            ;
        }
        process.exit(0);
    })

});

const port = 3000
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on http://localhost:${port}/`);
});

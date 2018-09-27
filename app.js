const express = require("express");
const app = express();
const options = require("./getopts");
const child = require("./subprocess")(options.processName, options.args);
const server = require("http").createServer(app);
const WebSocket = require("ws");

var buffer = [];


const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {

    child.sp.stdout.on("data", (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ processName: child.processName, message: data.toString(), type: "info" }));
        }
    });

    child.sp.stderr.on("data", (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ processName: child.processName, message: data.toString(), type: "error" }));
        }
    });


    child.sp.on("exit", (code) => {
        console.log("Exiting");
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ processName: child.processName, message: `Exited with code ${code}`, type: "exit" }));
        }
        process.exit(0);
    });
});

child.sp.stdout.on("data", (data) => {
    data = data.toString();
    console.log(data);
});

child.sp.stderr.on("data", (data) => {
    data = data.toString();
    console.log(data);
});

const port = 3000;
server.listen(port, "0.0.0.0");

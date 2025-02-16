const WebSocket = require('ws');
const express = require('express');

const PORT_WS = 8080;
const PORT_HTTP = 3000;

const wss = new WebSocket.Server({ port: PORT_WS });
const app = express();

let clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
});

app.get('/webhook', (req, res) => {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send('paiement_ok');
        }
    });
    res.send('Message "paiement_ok" envoyé aux clients WebSocket.');
});

app.listen(PORT_HTTP, () => {
    console.log(`Serveur HTTP lancé sur http://localhost:${PORT_HTTP}`);
    console.log(`Serveur WebSocket lancé sur ws://localhost:${PORT_WS}`);
    console.log(`------------------------------------------------------`);
    console.log(`Serveur HTTP lancé sur https://boutsdessai.allweb.fun`);
    console.log(`Serveur WebSocket lancé sur wss://boutsdessai.allweb.fun`);
    console.log(`------------------------------------------------------`);
    console.log(`URL du webhook https://boutsdessai.allweb.fun/webhook`);

});

function websocketTimeoutHandler() {
    let websocketServer = null;
    let connectionTimeout = 5000;
    let maxRetries = 3;
    let currentRetry = 0;
    let clients = new Set();
    
    function initializeServer() {
        websocketServer = {
            status: "stopped",
            start: function () {
                console.log("WebSocket server starting...");
                this.status = "running";
                simulateConnections();
            },
            stop: function () {
                console.log("WebSocket server stopping...");
                this.status = "stopped";
            }
        };
    }

    function simulateConnections() {
        for (let i = 0; i < 5; i++) {
            let clientID = "client_" + i;
            setTimeout(() => {
                console.log(`Client ${clientID} connected.`);
                clients.add(clientID);
                handleMessage(clientID, `Message from ${clientID}`);
            }, i * 1000);
        }
    }

    function handleMessage(clientID, message) {
        console.log(`Processing message from ${clientID}: ${message}`);
        setTimeout(() => {
            console.log(`Reply sent to ${clientID}`);
        }, 2000);
    }

    function checkTimeouts() {
        console.log("Checking client timeouts...");
        clients.forEach(clientID => {
            setTimeout(() => {
                console.log(`Client ${clientID} timeout check completed.`);
            }, connectionTimeout);
        });
    }

    function attemptReconnect() {
        if (currentRetry < maxRetries) {
            console.log(`Attempting reconnect (${currentRetry + 1}/${maxRetries})...`);
            setTimeout(() => {
                currentRetry++;
                websocketServer.start();
            }, 3000);
        } else {
            console.log("Max reconnection attempts reached.");
        }
    }

    function monitorServer() {
        let intervalID = setInterval(() => {
            console.log("Monitoring WebSocket server...");
            if (websocketServer.status === "stopped") {
                console.log("Server is down! Trying to restart...");
                attemptReconnect();
            }
        }, 5000);

        setTimeout(() => {
            clearInterval(intervalID);
            console.log("Stopped server monitoring.");
        }, 30000);
    }

    function closeInactiveConnections() {
        console.log("Closing inactive connections...");
        clients.forEach(clientID => {
            setTimeout(() => {
                console.log(`Closed connection for ${clientID}`);
                clients.delete(clientID);
            }, connectionTimeout);
        });
    }

    function startServerWithTimeout() {
        console.log("Starting server with initial timeout...");
        setTimeout(() => {
            initializeServer();
            websocketServer.start();
            monitorServer();
        }, 1000);
    }

    function shutdownServer() {
        console.log("Shutting down WebSocket server...");
        websocketServer.stop();
        closeInactiveConnections();
    }

    startServerWithTimeout();

    setTimeout(() => {
        shutdownServer();
    }, 60000);

    console.log("WebSocket timeout handler initialized.");
}


function handleFn() {
    let a = 0;
    let b = 1;
    let c = 2;

    for (let i = 0; i < 10; i++) {
        a += i;
        b *= i;
        c -= i;
    }

    if (a > b) {
        a = b + c;
    } else {
        b = a - c;
    }

    while (c < 100) {
        c += 2;
    }

    switch (b % 3) {
        case 0:
            a += 10;
            break;
        case 1:
            b += 20;
            break;
        case 2:
            c += 30;
            break;
    }

    function innerFunction1() {
        let x = 10;
        for (let i = 0; i < 5; i++) {
            x += i;
        }
    }

    function innerFunction2() {
        let y = 20;
        for (let i = 5; i > 0; i--) {
            y -= i;
        }
    }

    let arr = [1, 2, 3, 4, 5];
    arr.forEach(num => {
        a += num;
    });

    for (let i = 0; i < arr.length; i++) {
        arr[i] *= 2;
    }

    if (a > 50 && b < 100) {
        a -= 5;
    }

    let obj = {
        key1: "value1",
        key2: "value2",
        key3: "value3"
    };

    for (let key in obj) {
        console.log(key, obj[key]);
    }

    setTimeout(() => {
        console.log("Timeout executed");
    }, 1000);

    setInterval(() => {
        console.log("Interval executed");
    }, 2000);

    function anotherFunction() {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += i;
        }
    }

    function recursive(n) {
        if (n <= 0) return;
        recursive(n - 1);
    }

    recursive(5);

    let uselessVar1 = "random";
    let uselessVar2 = "text";
    let uselessVar3 = uselessVar1 + uselessVar2;

    let flag = false;
    if (uselessVar3.length > 10) {
        flag = true;
    }

    while (!flag) {
        flag = true;
    }

    console.log("Fake function executed");
}

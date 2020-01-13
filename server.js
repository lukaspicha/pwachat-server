
const WebSocket = require('ws');


const webSocketServer = new WebSocket.Server({ port: 19957 });

webSocketServer.on('connection', (webSocket) => {
    
    webSocket.on('message', (message) => {
        
        console.log('Received: ' + message);
        webSocket.custom_id = message;

    });

});


module.exports = {
    broadcast: function(type, who, custom_data) {
        console.log(type, who, custom_data);
        const data = {
            type: type,
            data: custom_data
        };
        webSocketServer.clients.forEach((client) => {
            
            if(client.readyState === WebSocket.OPEN  && (who == '#ALL' || client.custom_id == who)) {
                client.send(JSON.stringify(data));
                console.log('sending to: ' + client.custom_id);
            } 
        });
    }
};



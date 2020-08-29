const MSG_TYPES = {
  HEART_BEAT: 0,
  ID: 1,
  MSG: 2,
  JOIN: 3,
  LEAVE: 4,
};

const WS_URL = 'wss://service-hkj3zca5-1300413308.bj.apigw.tencentcs.com/test/websocket';

let socket = null;
let heartBeatTimer = null;
let prevTimestamp = 0;

function sendHeartBeat() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(MSG_TYPES.HEART_BEAT);
  prevTimestamp = Date.now();
}

function sendMessage(msg) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(MSG_TYPES.MSG + msg);
  prevTimestamp = Date.now();
}

function requestConnectionId() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(MSG_TYPES.ID);
  prevTimestamp = Date.now();
}

function startHeartBeat() {
  heartBeatTimer = setInterval(() => {
    if (Date.now() - prevTimestamp > 10 * 1000) {
      sendHeartBeat();
    }
  }, 5 * 1000);
}

function stopHeartBeat() {
  clearInterval(heartBeatTimer);
}

function init({ onOpen = () => {}, onClose = () => {}, onMessage = () => {} }) {
  if (socket) {
    return;
  }

  socket = new WebSocket(WS_URL);
  socket.addEventListener('open', (e) => {
    requestConnectionId();
    startHeartBeat();

    console.log(e);
  });

  socket.addEventListener('close', (e) => {
    stopHeartBeat();
    onClose();
    console.log(e);
  });

  socket.addEventListener('error', (e) => {
    console.log(e);
  });

  socket.addEventListener('message', (e) => {
    console.log(e)
    const type = Number(e.data[0]);
    const data = e.data.substr(1);
    switch (type) {
      case MSG_TYPES.ID:
        onOpen(data);
        break;
      case MSG_TYPES.JOIN:
      case MSG_TYPES.LEAVE:
        break;
      case MSG_TYPES.MSG: {
        const message = JSON.parse(data);
        onMessage(message);
        break;
      }
      default:
        break;
    }
  });
}

export {
  init,
  sendMessage,
};

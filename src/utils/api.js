const API_JOIN_ROOM = 'https://service-hkj3zca5-1300413308.bj.apigw.tencentcs.com/test/join-room'
const API_LEAVE_ROOM = 'https://service-hkj3zca5-1300413308.bj.apigw.tencentcs.com/test/leave-room'

async function joinRoom(connectionId, roomname, username) {
  fetch(API_JOIN_ROOM, { method: 'POST', mode: 'cors', body: JSON.stringify({ connectionId, roomname, username }) });
}

async function leaveRoom(connectionId) {
  fetch(API_LEAVE_ROOM, { method: 'POST', mode: 'cors', body: JSON.stringify({ connectionId }) });
}

export {
  joinRoom,
  leaveRoom,
};

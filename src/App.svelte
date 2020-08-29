<script>
import Welcome from './components/Welcome.svelte';
import ChatRoom from './components/ChatRoom.svelte';
import Loading from './components/Loading.svelte';

import * as socket from './utils/socket';
import * as api from './utils/api';

const ROUTE_STATES = {
	WELCOME: 0,
	CHAT: 1,
};

let routeState = ROUTE_STATES.WELCOME;
let socketConnecting = true;
let connectionId = '';
let username = '';
let roomname = '';
let messages = [];
let editingMessage = '';

function onOpen(connId) {
	socketConnecting = false;
	connectionId = connId;
}

function onClose() {
	socketConnecting = true;
}

function onMessage(message) {
	messages = [message, ...messages];
}

async function sendMessage() {
	await socket.sendMessage(editingMessage);
	editingMessage = '';
}

async function joinRoom() {
	await api.joinRoom(connectionId, roomname, username);
	routeState = ROUTE_STATES.CHAT;
}

async function leaveRoom() {
	await api.leaveRoom(connectionId);
	routeState = ROUTE_STATES.WELCOME;
}

socket.init({
	onOpen,
	onClose,
	onMessage,
});
</script>

<main>
{#if socketConnecting}
	<Loading/>
{:else if routeState === ROUTE_STATES.WELCOME}
	<Welcome bind:roomname bind:username joinRoom={joinRoom}/>
{:else if routeState === ROUTE_STATES.CHAT}
	<ChatRoom bind:messages bind:content={editingMessage} sendMessage={sendMessage} leaveRoom={leaveRoom}/>
{/if}
</main>

<style>
</style>
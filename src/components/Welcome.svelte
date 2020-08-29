<script>
export let roomname = '';
export let username = '';
export let joinRoom = () => {};
</script>

<main>
  <div>
    <label for="room">room name</label>
    <input id="room" bind:value={roomname}/>
    <label for="user">user name</label>
    <input id="user" bind:value={username}/>
    <div>
      <button on:click={joinRoom}>Join</button>
    </div>
  </div>
</main>
<script>
export let sendMessage = () => {};
export let leaveRoom = () => {};
export let messages = [];
export let content = '';
</script>

<main>
  <ul>
    {#each messages as { username, content, date }}
      <li>
        <div><span class="username">{username}</span><span class="date">{new Date(date)}</span></div>
        <div class="content">{content}</div>
      </li>
    {/each}
  </ul>
  <textarea bind:value={content}/>
  <div>
    <button on:click={sendMessage}>Send</button>
    <button on:click={leaveRoom}>Leave</button>
  </div>
</main>

<style>
.username {
  margin-right: 10px;
  font-weight: bold;
}
</style>
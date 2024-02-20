import { createClient } from 'redis';

const client = createClient();
const channel = 'holberton school channel';

client.on('error', err => console.log('Redis client not connected to the server:', err));

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.subscribe(channel, (error, count) => {
  if (error) {
    console.log(`Error subscribing to ${channel}:`, error.message);
  }
});

client.on('message', (channel, message) => {
  if (message === 'KILL_SERVER') {
    console.log(message);
    // Unsubscribe from the channel
    client.unsubscribe(channel, (err) => {
      if (err) {
        console.error(`Error unsubscribing from ${channel}:`, err.message);
      }
    });

    // Quit the Redis client
    client.quit((err) => {
      if (err) {
        console.error(`Error quitting Redis client:`, err.message);
      }
    });
  } else {
    console.log(message);
  }
})

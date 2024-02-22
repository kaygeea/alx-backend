const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
  phoneNumber: '',
  message: '',
};
const job = queue.create('push_notification_code', jobData);

// Add job created event listener
job
  .on('enqueue', () => {
  console.log('Notification job created:', job.id);
  })
  // Add job completed event listener
  .on('complete', () => {
  console.log('Notification job completed');
  job.remove();
  })
  // Add job failing event listener
  .on('failed', () => {
  console.log('Notification job failed');
  });

job.save();

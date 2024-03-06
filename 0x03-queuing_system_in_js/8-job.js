import { Queue } from 'kue';

const createPushNotificationsJobs = (jobs, queue) => {
  if(!(jobs instanceof Array)) {
    throw new Error('Jobs is not an arry');
  }
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    // Add job created event listener
    job
      .on('enqueue', () => {
        console.log('Notification job created:', job.id);
      })
      // Add job completed event listener
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
        job.remove();
      })
      // Add job failing event listener
      .on('failed', (errorMessage) => {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      })
      // Add job progress event listener
      .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
    job.save();
  }); 
};

export default createPushNotificationsJobs;

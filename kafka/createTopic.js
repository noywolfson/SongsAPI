const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const admin = new kafka.Admin(client); // Use Admin client to create topic

const topicToCreate = [{
    topic: process.env.TOPIC_NAME || 'songs-topic',
    partitions: 1,
    replicationFactor: 1
}];

admin.createTopics(topicToCreate, (error, result) => {
    if (error) {
        console.error('Error creating topic:', error);
    } else {
        console.log('Topic created successfully:', result);
    }
    client.close(); // Close the client after creating the topic
});

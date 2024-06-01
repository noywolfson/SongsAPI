const kafka = require('kafka-node');
const { KafkaClient, Admin } = kafka;

const client = new KafkaClient({ kafkaHost: 'kafka:9092' });

const createTopic = async () => {
    const admin = new Admin(client);

    admin.listTopics((err, res) => {
        if (err) {
            console.error('Error listing topics:', err);
            return;
        }

        const topics = Object.keys(res[1].metadata);
        if (topics.includes('songs-topic')) {
            console.log('Topic "songs-topic" already exists');
        } else {
            admin.createTopics([{ topic: 'songs-topic', partitions: 1, replicationFactor: 1 }], (err, res) => {
                if (err) {
                    console.error('Error creating topic:', err);
                } else {
                    console.log('Topic "songs-topic" created:', res);
                }
            });
        }
    });
};

createTopic().catch(console.error);

module.exports = createTopic;
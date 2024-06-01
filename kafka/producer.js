const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

producer.on('ready', function () {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', function (error) {
    console.error('Kafka Producer error:', error);
});

module.exports = producer;
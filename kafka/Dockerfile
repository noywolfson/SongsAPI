FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

ENV KAFKA_BROKER=kafka:9092
ENV TOPIC_NAME=songs-topic
ENV DB_HOST=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD=Aa123456!
ENV DB_NAME=songs_db

CMD ["node", "consumer.js"]
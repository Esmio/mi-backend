'use strict';

const rmq = require('amqplib');

class BaseConsumer {


  static get ['QUEUE_NAME_PREF']() {
    return 'mi_';
  }

  get ['queueName']() {
    throw new Error('Please define yur own queue name');
  }

  async initConn() {
    this.conn = await rmq.connect(this.app.config.rabbitmq.url);
    console.log(this.conn);
  }

  async initChannel() {
    if (!this.conn) {
      await this.initConn();
    }
    const channel = await this.conn.createChannel(this.queueName);
    await channel.assertQueue(this.queueName, {
      durable: true,
    });
    this.channel = channel;
    return channel;
  }

  onMsg(msg) {
    throw new Error('Please define your own message handler', msg);
  }

  async init(app) {
    if (!this.app) this.app = app;
    if (!this.channel) {
      await this.initChannel();
    }
    console.log(this.queueName, this.onMsg.toString());
    this.channel.consume(this.queueName, msg => this.onMsg(msg));
  }

}

module.exports = BaseConsumer;

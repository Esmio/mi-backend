'use strict';

const BaseConsumer = require('./base_consumer');

class UnlockInventory extends BaseConsumer {


  get ['queueName']() {
    return BaseConsumer.QUEUE_NAME_PREF + 'inventory_unlock';
  }

  onMsg(msg) {
    const inventoryInfo = JSON.parse(msg.content.toString('utf-8'));
    console.log('inventoryInfo', inventoryInfo);
    const ctx = this.app.createAnonymousContext();
    ctx.service.inventory.removeLocksByGoodsId(inventoryInfo.goodsId, inventoryInfo.subOrderId)
      .catch(console.log);
    this.channel.ack(msg);
  }

}

module.exports = UnlockInventory;

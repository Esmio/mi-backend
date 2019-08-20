'use strict';

const uuid = require('uuid/v4');

module.exports = app => {
  const { Sequelize } = app;
  const { STRING, UUID, TEXT, BOOLEAN, Op } = Sequelize;

  const Model = app.model.define('mi_address', {
    id: {
      type: UUID,
      primaryKey: true,
    },
    user_id: {
      type: UUID,
    },
    consignee: {
      type: STRING(64),
      required: true,
    },
    address: {
      type: TEXT,
    },
    zipcode: {
      type: STRING(64),
    },
    tel: {
      type: STRING(32),
    },
    is_default: {
      type: BOOLEAN,
    },
    province: {
      type: STRING(32),
    },
    province_id: {
      type: STRING(32),
    },
    city: {
      type: STRING(32),
    },
    city_id: {
      type: STRING(32),
    },
    district: {
      type: STRING(32),
    },
    district_id: {
      type: STRING(32),
    },
    area: {
      type: STRING(32),
    },
    area_id: {
      type: STRING(32),
    },
  });

  Model.createNewAddress = async address => {
    // validate somehow

    address.id = uuid();
    const created = await Model.create(address);
    return created;
  };

  Model.listAddresses = async query => {
    const { ids, last_id, sort, limit, userIds } = query;
    console.log(ids, sort);

    const sequelizeQuery = {};
    sequelizeQuery.where = {};

    if (ids) {
      if (ids.length === 1) {
        sequelizeQuery.where.id = {
          [Op.eq]: ids[0],
        };
      } else {
        sequelizeQuery.where.id = {
          [Op.in]: ids,
        };
      }
    }

    if (last_id) {
      sequelizeQuery.where.id = {
        [Op.gt]: last_id,
      };
    }

    if (userIds) {
      sequelizeQuery.where.user_id = {
        [Op.in]: userIds,
      };
    }

    sequelizeQuery.limit = limit || 20;
    const addresses = await Model.findAll(sequelizeQuery);

    return addresses;
  };

  Model.updateAddress = async address => {
    const { id, user_id } = address;
    // validate id, something

    const updated = await Model.update(address, {
      where: {
        id: {
          [Op.eq]: id,
        },
        user_id: {
          [Op.eq]: user_id,
        },
      },
    });
    return updated;
  };

  Model.deleteAddresses = async query => {
    const { ids, userIds } = query;
    const result = await Model.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
        user_id: {
          [Op.in]: userIds,
        },
      },
    });
    return result;
  };

  Model.sync();

  return Model;
};

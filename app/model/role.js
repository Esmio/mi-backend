'use strict';

const uuid = require('uuid/v4');

module.exports = app => {
  const { Sequelize } = app;
  const { STRING, UUID, TEXT, Op } = Sequelize;

  const Model = app.model.define('mi_role', {
    id: {
      type: UUID,
      primaryKey: true,
    },
    name: {
      type: STRING(64),
      required: true,
    },
    desc: {
      type: TEXT,
    },
  });

  Model.createNewRole = async role => {
    // validate somehow

    role.id = uuid();
    const created = await Model.create(role);
    return created;
  };

  Model.listRoles = async query => {
    const { ids, last_id, sort, limit } = query;
    console.log(sort);
    const sequelizeQuery = {};
    sequelizeQuery.where = {};

    if (last_id) {
      sequelizeQuery.where.id = {
        [Op.gt]: last_id,
      };
    }

    if (ids) {
      if (!sequelizeQuery.where.id) sequelizeQuery.where.id = {};
      sequelizeQuery.where.id[Op.in] = ids;
    }

    sequelizeQuery.limit = limit || 20;
    const role = await Model.findAll(sequelizeQuery);

    return role;
  };

  Model.updateRole = async role => {
    const { id } = role;
    // validate id, something

    const updated = await Model.update(role, {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return updated;
  };

  Model.sync();

  return Model;
};

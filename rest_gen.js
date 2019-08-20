'use strict';

const fs = require('fs');

const modelDir = './app/model/';
const serviceDir = './app/service/';
const controllerDir = './app/controller/';

const [ , , resourceName ] = process.argv;
const capName = resourceName[0].toUpperCase() + resourceName.slice(1);


const modelTmpl = `'use strict';

const uuid = require('uuid/v4');

module.exports = app => {
  const { Sequelize } = app;
  const { STRING, UUID, TEXT, BOOLEAN, Op } = Sequelize;

  const Model = app.model.define('mi_${resourceName}', {
    id: {
      type: UUID,
      primaryKey: true,
    },
    name: {
      type: STRING(64),
      required: true,
    },
    defualt_goods_id: {
      type: UUID,
    },
    activity_tip_id: {
      type: UUID,
    },
    is_batched: {
      type: BOOLEAN,
    },
    is_enable: {
      type: BOOLEAN,
    },
    product_desc: {
      type: TEXT,
    },
    product_gallery_icon_id: {
      type: UUID,
    },
    share_content: {
      type: STRING(64),
    },
  });

  Model.createNew${capName} = async ${resourceName} => {
    // validate somehow

    ${resourceName}.id = uuid();
    const created = await Model.create(${resourceName});
    return created;
  };

  Model.list${capName} = async query => {
    const { ids, last_id, sort, limit } = query;
    console.log(ids, sort);
    const sequelizeQuery = {};
    sequelizeQuery.where = {};
    if (last_id) {
      sequelizeQuery.where.id = {
        [Op.gt]: last_id,
      };
    }

    sequelizeQuery.limit = limit || 20;
    const ${resourceName} = await Model.findAll(sequelizeQuery);

    return ${resourceName};
  };

  Model.update${capName} = async ${resourceName} => {
    const { id } = ${resourceName};
    // validate id, something

    const updated = await Model.update(${resourceName}, {
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
`;

const serviceTmpl = `'use strict';
const { Service } = require('egg');
class ${capName} extends Service {
  async createNew${capName}(${resourceName}) {
    const created = await this.app.model.${capName}.createNew${capName}(${resourceName});
    return created;
  }

  async list${capName}s(query) {
    const ${resourceName}s = await this.app.model.${capName}.list${capName}s(query);
    return ${resourceName}s;
  }
}

module.exports = ${capName};
`;

const controllerName = resourceName[0].toUpperCase() + resourceName.slice(1) + 'Controller';

const controllerTmpl = `'use strict';
const { Controller } = require('egg');

class ${controllerName} extends Controller {
  async createNew${capName}() {
    const { ${resourceName} } = this.ctx.request.body;
    const created = await this.ctx.service.${resourceName}.createNew${capName}(${resourceName});
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        ${resourceName}: created,
      },
    };
  }

  async list${capName}s() {
    const { query } = this.ctx.params;
    const ${resourceName}s = await this.ctx.service.${resourceName}.list${capName}s(query);
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        ${resourceName}s,
      },
    };
  }
  async get${capName}ById() {
    const { id } = this.ctx.params;
    const query = {
      ids: [ id ],
    };
    const [ ${resourceName} ] = await this.ctx.service.${resourceName}.list${capName}s(query);
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        ${resourceName},
      },
    };
  }

  async delete${capName}() {
    const { id } = this.ctx.request.params;
    const query = {
      ids: [ id ],
    };
    const result = await this.ctx.service.${resourceName}.delete${capName}(query);
    this.ctx.body = {
      code: 0,
      data: {
        result,
      },
    };
  }

  async update${capName}ById() {
    const { id } = this.ctx.params;
    const { ${resourceName} } = this.ctx.request.body;
    ${resourceName}.id = id;
    await this.ctx.service.${resourceName}.update${capName}(${resourceName});
    this.ctx.body = {
      code: 0,
      status: 200,
    };
  }
}

module.exports = ${controllerName};
`;

fs.appendFile(modelDir + resourceName + '.js', modelTmpl, () => {});
fs.appendFile(serviceDir + resourceName + '.js', serviceTmpl, () => {});
fs.appendFile(controllerDir + resourceName + '.js', controllerTmpl, () => {});

import _ from 'lodash';

interface ObjectLiteral {
  [key: string]: any;
}

function snakeToCamel(obj: ObjectLiteral): ObjectLiteral {
  if (_.isArray(obj)) {
    return obj.map((v) => snakeToCamel(v));
  }
  if (_.isObject(obj)) {
    return _.mapValues(
      _.mapKeys(obj, (v, k) => _.camelCase(k)),
      (v) => snakeToCamel(v),
    );
  }
  return obj;
}

export default snakeToCamel;

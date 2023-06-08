import { deleteObjectKey } from './object.js';

export function cleanDoc(queryResult, paths = []) {
  const doc = queryResult._doc;
  doc.id = doc._id;
  delete doc._id;
  delete doc.__v;
  delete doc.createdAt;
  delete doc.updatedAt;
  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];
    deleteObjectKey(doc, path);
  }
}

export function getCleanDoc(queryResult, paths = []) {
  cleanDoc(queryResult, paths);
  return queryResult._doc;
}

export function addCommonUtils(schema) {
  // Add 'id' getter that gets the stringified document id
  schema.virtual('id').get(function getId() {
    return this._id.toHexString();
  });

  // Clean documents found by queries
  schema.post('init', function preInit() {
    cleanDoc(this);
  });
}

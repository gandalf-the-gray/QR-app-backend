export function cleanDoc(queryResult) {
  const doc = queryResult._doc;
  doc.id = doc._id;
  delete doc._id;
  delete doc.__v;
  delete doc.createdAt;
  delete doc.updatedAt;
}

export function getCleanDoc(queryResult) {
  cleanDoc(queryResult);
  return queryResult._doc;
}

export function addCommonUtils(schema) {
  // Add 'id' getter that gets the stringified document id
  schema.virtual('id').get(function getId() {
    return this._id.toHexString();
  });

  // Clean documents found by queries
  schema.post('init', function preInit() {
    cleanDoc(this._doc);
  });
}

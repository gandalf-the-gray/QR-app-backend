import { getObjectField } from './object.js';

export function _cleanDoc(queryResult) {
  const doc = queryResult._doc;
  doc.id = doc._id;
  delete doc._id;
  delete doc.__v;
  delete doc.createdAt;
  delete doc.updatedAt;
}

export function cleanDoc(queryResult, paths = []) {
  _cleanDoc(queryResult, paths);
  for (let pathIndex = 0; pathIndex < paths.length; pathIndex += 1) {
    let path = paths[pathIndex];
    path = `_doc.${path.split('.').join('._doc.')}`;
    const doc = getObjectField(queryResult, path);
    if (Array.isArray(doc)) {
      for (let docIndex = 0; docIndex < doc.length; docIndex += 1) {
        _cleanDoc(doc[docIndex]);
      }
    } else {
      _cleanDoc(doc);
    }
  }
  return queryResult;
}

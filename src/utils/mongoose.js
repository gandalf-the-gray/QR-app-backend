export function preInitClean(doc) {
  doc.id = doc._id;
  delete doc._id;
  delete doc.__v;
  delete doc.createdAt;
  delete doc.updatedAt;
}

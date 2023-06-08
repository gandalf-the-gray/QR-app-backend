export function deleteObjectKey(object, fieldPath) {
  const fields = fieldPath.split('.');
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (i === fields.length - 1) {
      delete object[field];
    }
    if (object[field] === undefined) {
      return;
    }
    object = object[field];
  }
}

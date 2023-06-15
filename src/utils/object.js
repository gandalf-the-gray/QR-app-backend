export function getObjectField(object, fieldPath) {
  const fields = fieldPath.split('.');
  let value;
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (i === fields.length - 1) {
      value = object[field];
    }
    if (object[field] === undefined) {
      break;
    }
    object = object[field];
  }
  return value;
}

export function deleteObjectField(object, path) {
  const fields = path.split('.');
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (i === fields.length - 1) {
      delete object[field];
    }
    if (!(field in object)) {
      return;
    }
    object = object[field];
  }
}

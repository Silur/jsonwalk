async function walk (obj, schema, op, reverse = false, path) {
  if (typeof path === 'undefined') path = []
  for (const i in obj) {
    if (typeof obj[i] === 'object') {
      path.push(i)
      await walk(obj[i], schema, op, reverse, path)
      path.splice(-1, 1)
    } else {
      const absolutePath = path.concat([i]).join('.')
      const normalizedPath = absolutePath
        .replace(/\.\d+/g, '.$') // .0, .1 etc are not valid JSON keys
          for (const pi in schema) {
            if ((!reverse && (schema[pi] === normalizedPath)) ||
              (reverse && (schema[pi] !== normalizedPath))) {
              obj[i] = await op(i, obj[i])
            }
          }
    }
    return obj
  }
}

module.exports = {
  walk: walk
}

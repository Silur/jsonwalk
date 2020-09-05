async function walk (obj, schema, op, path) {
  if (typeof path === 'undefined') path = []
  for (const i in obj) {
    const absolutePath = path.concat([i]).join('.')
    const normalizedPath = absolutePath
      .replace(/\.\d+/g, '.$') // .0, .1 etc are not valid JSON keys
    for (const pi in schema) {
      if (schema[pi] === normalizedPath) {
        obj[i] = await op(i, obj[i])
      }
    }
    if (typeof obj[i] === 'object') {
      path.push(i)
      await walk(obj[i], schema, op, path)
      path.splice(-1, 1)
    }
  }
  return obj
}

module.exports = {
  walk: walk
}

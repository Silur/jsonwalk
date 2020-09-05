async function walk (obj, schema, op, path) {
  if (typeof path === 'undefined') path = []
  for (const i in obj) {
    if (typeof obj[i] === 'object') {
      path.push(i)
      walk(obj[i], schema, op, path)
      path.splice(-1, 1)
    } else {
      const absolutePath = path.concat([i]).join('.')
      // console.log('abs:', path.concat([i]))
      const normalizedPath = absolutePath
        .replace(/\.\d+\./g, '.$.') // .0, .1 etc are not valid JSON keys
      for (const pi in schema) {
        if (schema[pi] === normalizedPath) {
          obj[i] = await op(obj, i, obj[i])
        }
      }
    }
  }
  return obj
}

module.exports = {
  walk: walk
}

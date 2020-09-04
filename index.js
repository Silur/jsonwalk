module.exports = {
  walk: async function (obj, schema, op, path) {
    if (typeof path === 'undefined') path = []
    for (const i in obj) {
      if (typeof obj[i] === 'object') {
        path.push(i)
        this.walk(obj[i], schema, op, path)
        path.splice(-1, 1)
      } else {
        for (const pi in schema) {
          const absolutePath = path.concat([i]).join('.')
          const normalizedPath = absolutePath
            .replace(/\.\d+\./g, '.$.') // .0, .1 etc are not valid JSON keys
          if (schema[pi] === normalizedPath) {
            obj[i] = await op(obj, i, obj[i])
          }
        }
      }
    }
    return obj
  }
}

# jsonwalk

This tool allows you to walk a JSON object recursively given a jq-like query array, and run function transforms on the fields contained in this schema.

## Example

```javascript

const jsonwalk = require('jsonwalk')

const myJson = {
    "Product Name": "Bowler Hat",
      "ProductID": 858383,
      "SKU": "0406654608",
      "Description": {
              "Colour": "Purple",
              "Width": 300,
              "Height": 200,
              "Depth": 210,
              "Weight": 0.75
             },
      "Price": 34.45,
      "Quantity": 2,
    "tags": ['clothing', 'hats']

}

const query = ['Description.Width', 'Description.Height']

function makeBigger(key, value) {
    console.log(value)
    return value*2 // double the size
}

(async () => {
  jsonwalk.walk(myJson, query, makeBigger)
})()
/* should return: 
 * 300
 * 200
 */

```

Like in `jq`, you can specify array elements with `$`:

```javascript

const query = ['Description.tags.$']

function makeBigger(key, value) {
	console.log(value)
	return value.toUpperCase()
}
(async () => {
  jsonwalk.walk(myJson, query, makeBigger)
})()
/* should return
 * clothing
 * hats
 */

```

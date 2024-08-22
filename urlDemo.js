import url from 'url'

const urlString = 'https://www.google.com/search?q=hello+world'
const urlObject = new URL(urlString)

console.log(urlObject);
console.log(url.format(urlObject));

const params = new URLSearchParams(urlObject.search)
params.append('limit', 5)
console.log(params);
console.log(params.get('q'));

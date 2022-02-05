import fetch, {fileFromSync, FormData} from 'node-fetch'

const uploadByBuffer = async (img) => {

  const file = fileFromSync(img)
  const form = new FormData()
  form.set('image', file)
  const host = 'https://telegra.ph'

  const data = await fetch(host + '/upload', {method: "post", body: form})
  return {src: host + (await data.json())[0].src}
}

const result = await uploadByBuffer("test.jpeg")
console.log(result)

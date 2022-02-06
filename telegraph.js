import fetch, {File, FormData} from 'node-fetch'

const uploadByBuffer = async (buffer, name) => {

    const file = new File([buffer], name)

    const form = new FormData()

    form.set('file', file)

    const host = 'https://telegra.ph'

    const data = await fetch(host + '/upload', {method: "post", body: form})

    return await data.json()
}

export const upload = function(buffer){

  return new Promise((resolve, reject)=>{

      try{

          const images = Array.isArray(buffer) ? buffer : [buffer]

          const results = []

          images.forEach(async image => {

              const {name, data, size, type} = image

              if(!Buffer.isBuffer(data)){
                  throw "File not Buffer"
              }

              const result = await uploadByBuffer(data, name)

              if(result.error){

                throw result.error
              }


              results.push(result[0])

              if(buffer.length === results.length){
                  resolve(results)
              }

          })

      }catch(error){
          reject(error)
      }

  })
}

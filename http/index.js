export class Http {
  // url db = 'https://perfect-note.firebaseio.com/'

  static HEADERS = {'Content-Type': 'application/json'}

  static get (url) {
    try {
      return request(url)
    } catch (e){
      console.log('error http class', e);
    }
  }

  static post (url, data = {}) {
    try {
      return request(url, 'POST', data)
    } catch (e){
      console.log('error http class', e);
    }
  }

  static async delete (url) {
    try {
      return request(url, 'DELETE')
    } catch (e){
      console.log('error http class', e);
    }
  }

  static patch (url, data = {}) {
    try {
      return request(url, 'PATCH', data)
    } catch (e){
      console.log('error http class', e);
    }
  }

}

async function request (url, method = 'GET', data) {
  const config = {
    method,
    headers: Http.HEADERS
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(url, config)
  return await response.json()
}
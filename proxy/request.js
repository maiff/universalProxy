const request = require('superagent')
module.exports = function req (method, url, options/*only use get or post (form type)*/) {
  if (method === 'get') {
    if (!options.withCookie)
      return request
        .get(url)
        .query(options.data)
        .then(res => res.text)

    else if (options.withCookie) { // get with cookie
      let query = Object.assign({}, options.data)
      delete query._cookie
      return request
        .get(url)
        .set("Cookie", options.data._cookie)
        .query(query)
        .then(res => res.text)
    }
  }

  if (method === 'post') {
    let _request = request
                    .post(url)
                    .redirects(options.isFollowRedirects ? 5 : 0)
                    .type('form')
    return new Promise((resolve, reject) => { //why not return request starghtly? if not redirects,return promise with emit reject and with redirection not with cookie
      if (options.getCookie) { // post to get cookie
        return _request
          .send(options.data)
          .end((err, res) => {
            resolve({
              cookie: res.header['set-cookie'],
              text: res.text
            })
            err && reject(err)
          })
      }
      else if (options.withCookie) { // post with cookie
        let postDate = Object.assign({}, options.data)
        delete postDate._cookie
        return _request
          .set("Cookie", options.data._cookie)
          .send(postDate)
          .end((err, res) => {
            resolve(res)
            err && reject(err)
          })
      }
      else 
        return _request
          .send(data)
          .end((err, res) => {
            resolve(res.text)
            err && reject(err)
          })
    })
  }
}
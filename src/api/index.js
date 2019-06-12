
import request from '@/axios/index'

export function login(username,password) {
    return request({
      url: '/api/user/login',
      method: 'post',
      "data": {
        "username": username,
        "password": password
      }
    })
}


export function userRegister(username,password) {

    return request({
      url: '/api/user/register',
      method: 'post',
      "data": {
        "username": username,
        "password": password
      }
    })
}

export function userDiary(username) {

  return request({
    url: '/api/user/diary',
    method: 'post',
    "data": {
      "username":username
    }
  })
}

export function userFollow(username) {

  return request({
    url: '/api/user/userFollow',
    method: 'post',
    "data": {
      "username":username
    }
  })
}

export function indexMoviecards() {

  return request({
    url: '/api/movies',
    method: 'get',
  })

}

export function getDetailMoive(id) {

  return request({
    url: '/api/movies/detailMoive',
    method: 'post',
    "data": {
      "id": id,
    }
  })

}

export function getCommentByMid(id) {

  return request({
    url: '/api/movies/commentByMid',
    method: 'post',
    "data": {
      "id": id,
    }
  })

}

export function getMp4Movies() {

  return request({
    url: '/api/movies/hot',
    method: 'get',
  })

}

export function getRefMovie(movie_type) {

  return request({
    url: '/api/movies/ref',
    method: 'post',
    "data": {
      "movie_type": movie_type,
    }
  })
  
}

export function getCategorylists() {

  return request({
    url: '/api/movies/Categorylist',
    method: 'get',
  })
  
}

export function gethotComments() {

  return request({
    url: '/api/movies/hotComment',
    method: 'get',
  })
  
}

export function getTypeMovies(type) {

  return request({
    url: '/api/movies/Category',
    method: 'post',
    "data": {
      "type": type,
    }
  })
  
}
export function addComment(comment) {

  return request({
    url: '/api/user/addComment',
    method: 'post',
    "data": {
      "comment": comment,
    }
  })
  
}


export function uploadlike(comments) {

  return request({
    url: '/api/movies/uploadlike',
    method: 'post',
    "data": {
      "comments": comments,
    }
  })
  
}

export function addInterest(username,Iusername) {

  return request({
    url: '/api/user/addInterest',
    method: 'post',
    "data": {
      "username": username,
      "Iusername":Iusername
    }
  })
  
}




import axios from 'axios'
import {HOST} from 'common/js/config'

//  获得热门歌手信息
export function getSingers () {
  const url = HOST + '/top/artists?limit=100'
  return axios.get(url)
}

//  获取歌手详情
export function getSingerDetail (singerId) {
  const url = HOST + `/artists?id=${singerId}`
  return axios.get(url)
}

import axios from 'axios'
import {HOST} from 'common/js/config'

//  获得热门歌手信息
export function getSingers () {
  const url = HOST + '/toplist/artist'
  return axios.get(url)
}

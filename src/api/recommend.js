import axios from 'axios'
import {HOST} from 'common/js/config'

//  获得轮播图数据
export function getBanner () {
  const url = HOST + '/banner'
  return axios.get(url)
}
//  获取推荐歌单数据
export function getRecommendList () {
  const url = HOST + '/personalized'
  return axios.get(url)
}

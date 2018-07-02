export default class Song {
  constructor ({id, singer, name, album, img1v1Url, publishTime}) {
    this.id = id
    this.singer = singer//  歌手
    this.name = name
    this.album = album
    this.img1v1Url = img1v1Url
    this.publishTime = publishTime
  }
}

//  过滤方法
function singerName (arr) {
  let name = []
  name = arr.map((item) => {
    return item.name
  })
  return name.join('/')
}

export function createSong (music) {
  return new Song({
    id: music.id,
    singer: singerName(music.ar),
    name: music.name,
    album: music.al.name,
    image: music.al.picUrl
  })
}

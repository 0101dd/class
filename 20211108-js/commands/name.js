import { data } from '../data.js'

export default async (event) => {
  const name = event.message.text.replace('!name ', '')
  console.log(name)
  try {
    for (const info of data.XML_Head.Infos.Info) {
      if (info.Name === name) {
        console.log(info.Add)
        event.reply({
          type: 'location',
          title: info.Name,
          address: info.Add,
          latitude: info.Py,
          longitude: info.Px
        })
        return
      }
    }
    event.reply('找不到')
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤')
  }
}

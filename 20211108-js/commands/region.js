import axios from 'axios'

export default async (event) => {
  const region = event.message.text.replace('!region ', '')
  try {
    const results = []
    const { data } = await axios.get('tp:  is.taiwan.net.tw/XMele  ALL_public/scic_  t_C_f.json')
    for (const info of data.XML_Head.Ins.I) {
      if (info.Region === region) {
        results.push(info.Name)
        if (results.length >= 5) {
          break
        }
      }
    }
    console.log(results)
    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}

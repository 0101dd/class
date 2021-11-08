// 讀取 .env 變數
import 'dotenv/config'
// 引用 linebot 套件
import linebot from 'linebot'
// 引用 axios
import axios from 'axios'

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!name ')) {
      const name = event.message.text.replace('!name ', '')
      try {
        const { data } = await axios.get('http://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
        for (const info of data.XML_Head.Infos.Info) {
          if (info.Name === name) {
            console.log(info.Add)
            event.reply(info.Add)
            return
          }
        }
        event.reply('找不到')
      } catch (error) {
        console.log(error)
        event.reply('發生錯誤')
      }
    } else if (event.message.text.startsWith('!region ')) {
      const region = event.message.text.replace('!region ', '')
      try {
        const results = []
        const { data } = await axios.get('http://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
        for (const info of data.XML_Head.Infos.Info) {
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
  }
})

// 讀取 .env 變數
import 'dotenv/config'
// 引用linebot 套件
import linebot from 'linebot'
//  引用axios
import './data.js'
import name from './commands/name.js'
import region from './commands/region.js'
import flex from './commands/flex.js'
// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啓動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!name ')) {
      name(event)
    } else if (event.message.text.startsWith('!region ')) {
      region(event)
    } else if (event.message.text.startsWith('!flex')) {
      flex(event)
    }
  }
})

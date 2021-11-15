import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

// bot.on('message', async (event) => {
//   try {
//     event.reply(event.message.text)
//     console.log(event.message.text)
//   } catch (error) {
//     console.log(error)
//   }
// })

// 輸入!live回傳正在直播的影片網址
bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!live')) {
      const ing = event.message.text.replace('!live')
      try {
        const result = []
        const { data } = await axios.get('https://api.holotools.app/v1/live')
        let i = 0
        for (i; i <= data.live.length; i++) {
          console.log(ing)
          result.push('https://www.youtube.com/watch?v=' + data.live[i].yt_video_key)
          if (result.length >= 5) {
            break
          }
          event.reply(result)
        }
        console.log(result)
        if (result.length > 0) {
          // event.reply(result)
        } else {
          event.reply('找不到')
        }
      } catch (error) {
        console.log(error)
        event.reply('error')
      }
    }
  }
})

// 輸入！past回傳ended直播影片網址
bot.on('message', async (event1) => {
  if (event1.message.type === 'text') {
    if (event1.message.text.startsWith('!past')) {
      const ed = event1.message.text.replace('!past')
      try {
        const result1 = []
        const { data } = await axios.get('https://api.holotools.app/v1/live')
        let i = 0
        for (i; i <= data.ended.length; i++) {
          console.log(ed)
          result1.push('https://www.youtube.com/watch?v=' + data.ended[i].yt_video_key)
          if (result1.length >= 5) {
            break
          }
          event1.reply(result1)
        }
        console.log(result1)
        if (result1.length > 0) {
          // event.reply(result)
        } else {
          event1.reply('找不到')
        }
      } catch (error) {
        console.log(error)
        event1.reply('error')
      }
    }
  }
})

// // 輸入頻道名字+photo回傳圖片---------------------------------------------------------
// bot.on('message', async (event2) => {
//   // const text = event.message.text
//   try {
//     const { data } = await axios.get('https://api.holotools.app/v1/live')
//     const type = event2.message.text
//     console.log('1: ' + type)
//     if (type === 'photo ' + data.live[0].channel.name) {
//       console.log('2: ' + data.live[0].channel.photo)
//       event2.reply(data.live[0].channel.photo)
//     } else {
//       console.log('no')
//       event2.reply('no data')
//     }
//   } catch (error) {
//     console.log(error)
//     event2.reply(error)
//   }
// }
// )

// 輸入頻道名字(!name + xxx)回覆直播title--------------------------------------------------
bot.on('message', async (event3) => {
  if (event3.message.type === 'text') {
    if (event3.message.text.startsWith('!name ')) {
      const name = event3.message.text.replace('!name ', '')
      try {
        const { data } = await axios.get('https://api.holotools.app/v1/live')
        let i = 0
        for (i; i <= data.live.length; i++) {
          const str = data.live[i].channel.name
          // const type = event3.message.text
          console.log('1: ' + name)
          if (str.includes(name)) {
            console.log(str.includes(name))
            console.log(data.live[i].title)
            event3.reply(data.live[i].title)
          } else {
            console.log('no')
            event3.reply('no data')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})

// 輸入！upcoming回傳即將直播的影片網址
bot.on('message', async (event4) => {
  if (event4.message.type === 'text') {
    if (event4.message.text.startsWith('!upcoming')) {
      const up = event4.message.text.replace('!upcoming')
      try {
        const result2 = []
        const { data } = await axios.get('https://api.holotools.app/v1/live')
        let i = 0
        for (i; i <= data.upcoming.length; i++) {
          console.log(up)
          result2.push('https://www.youtube.com/watch?v=' + data.upcoming[i].yt_video_key)
          if (result2.length >= 5) {
            break
          }
          event4.reply(result2)
        }
        console.log(result2)
        if (result2.length > 0) {
          // event.reply(result)
        } else {
          event4.reply('找不到')
        }
      } catch (error) {
        console.log(error)
        event4.reply('error')
      }
    }
  }
})

// 輸入!viewer回傳直播同接人數
bot.on('message', async (event5) => {
  if (event5.message.type === 'text') {
    if (event5.message.text.startsWith('!viewer')) {
      const view = event5.message.text.replace('!viewer', '')
      try {
        const { data } = await axios.get('https://api.holotools.app/v1/live')
        let i = 0
        for (i; i <= data.live.length; i++) {
          const str = data.live[i].channel.name
          // const type = event3.message.text
          console.log('1: ' + view)
          if (str.includes(view)) {
            console.log(str.includes(view))
            console.log(data.live[i].live_viewers)
            event5.reply(data.live[i].live_viewers)
          } else {
            console.log('no')
            event5.reply('no data')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})

import axios from 'axios'
import schedule from 'node-schedule'
//  資料陣列
export let data = []
// 更新資料的 function
const getData = () => {
  axios.get('http://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
    .then(response => {
      data = response.data.XML_Head.Infos.Info
      console.log('資料成功更新')
    })
}
//  機器人啓動時先更新資料
getData()
//  設定排程每日 0:00 更新
schedule.scheduleJob('0 0 * * *', getData)

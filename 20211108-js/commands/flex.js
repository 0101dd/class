import flex from '../template/flex.js'

export default async (event) => {
  flex.altText = 'HI'
  flex.contents.body.contents[0].text = '123'
  event.reply(flex)
}

const mineflayer = require('mineflayer')

// Cấu hình bot
const botConfig = {
  host: 'NTDSMP1165.aternos.me', // Thay bằng IP server (ví dụ: 'play.hypixel.net')
  port: 51261,           // Thay bằng cổng server (mặc định: 25565)
  username: 'BotName',   // Thay bằng tên bot (ví dụ: 'MyBot123')
  // auth: 'microsoft',  // Bỏ comment nếu dùng tài khoản premium
  version: '1.20.1'      // Thay bằng phiên bản server (ví dụ: '1.20.1')
}

// Hàm tạo bot
function createBot() {
  const bot = mineflayer.createBot(botConfig)

  // Sự kiện khi bot đăng nhập
  bot.on('login', () => {
    console.log('Bot đã đăng nhập thành công!')
    // Di chuyển ngẫu nhiên để giữ hoạt động
    setInterval(() => {
      bot.setControlState('forward', true)
      setTimeout(() => {
        bot.setControlState('forward', false)
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
      }, 1000)
    }, 10000)
  })

  // Xử lý lỗi
  bot.on('error', (err) => console.log('Lỗi:', err))
  bot.on('kicked', (reason) => console.log('Bị kick:', reason))
  bot.on('end', () => console.log('Bot đã ngắt kết nối'))

  // Tự động kết nối lại
  bot.on('end', () => {
    console.log('Đang thử kết nối lại sau 60 giây...')
    setTimeout(createBot, 60000)
  })
}

// Khởi chạy bot
createBot()

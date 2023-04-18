"use strict";
require("./config.js");
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState, makeInMemoryStore, downloadContentFromMessage, jidDecode, generateForwardMessageContent, generateWAMessageFromContent, delay } = require("@adiwajshing/baileys")
const { fs } = require("fs");
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const pino = require('pino')
const store = require('./store')
const { Spinner } = clui
const { existsSync } = require('fs')
const { serialize, fetchJson, getBuffer } = require("./function/func_Server");
const { nocache, uncache } = require('./function/Chache_Data.js');
const { welcome_JSON } = require('./function/Data_Location.js')
const { auto_BlockCaller } = require('./function/Data_Server_Bot/Call_AutoBlock.js')
const { status_Connection } = require('./function/Data_Server_Bot/Status_Connect.js')
const { Memory_Store } = require('./function/Data_Server_Bot/Memory_Store.js')
const { groupResponse_Welcome, groupResponse_Remove, groupResponse_Promote, groupResponse_Demote } = require('./function/group_Respon.js')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./function/Exif_Write')
const { updateGroup } = require("./function/update_Group")

existsSync('./store/baileys_store.json') && store.readFromFile('./store/baileys_store.json')
setInterval(() => {
store.writeToFile('./store/baileys_store.json')
}, 10000)

let session = `./${global.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

// Jangan di edit
const connectToWhatsApp = async () => {
function _0x4632(){const _0x361d6d=['Safari','692749OHwaZW','2829590iioDKG','8EkYNBe','1522962TZFWxD','1448018jzILdt','18186zlbIQk','453060EjOeZw','20zNXnUi','8244643Tyienk','1659FZmXmS','4wSEfZy'];_0x4632=function(){return _0x361d6d;};return _0x4632();}const _0x2d8eba=_0x367d;function _0x367d(_0x3f668e,_0x3173ec){const _0x4632dc=_0x4632();return _0x367d=function(_0x367d3e,_0x243438){_0x367d3e=_0x367d3e-0xab;let _0x32d2a7=_0x4632dc[_0x367d3e];return _0x32d2a7;},_0x367d(_0x3f668e,_0x3173ec);}(function(_0x544d49,_0x44eb9d){const _0x4483bd=_0x367d,_0x2ce483=_0x544d49();while(!![]){try{const _0x56bba5=-parseInt(_0x4483bd(0xad))/0x1+-parseInt(_0x4483bd(0xb1))/0x2+parseInt(_0x4483bd(0xb0))/0x3+-parseInt(_0x4483bd(0xab))/0x4*(-parseInt(_0x4483bd(0xae))/0x5)+-parseInt(_0x4483bd(0xb2))/0x6*(parseInt(_0x4483bd(0xb6))/0x7)+parseInt(_0x4483bd(0xaf))/0x8*(-parseInt(_0x4483bd(0xb3))/0x9)+parseInt(_0x4483bd(0xb4))/0xa*(parseInt(_0x4483bd(0xb5))/0xb);if(_0x56bba5===_0x44eb9d)break;else _0x2ce483['push'](_0x2ce483['shift']());}catch(_0x5a5b7b){_0x2ce483['push'](_0x2ce483['shift']());}}}(_0x4632,0x5e851));const conn=makeWASocket({'printQRInTerminal':!![],'logger':logg({'level':'fatal'}),'browser':['Ryuu\x20Zxy`',_0x2d8eba(0xac),'3.1.0'],'auth':state});

store.bind(conn.ev)

conn.ev.on('chats.set', () => {
console.log('got chats', store.chats.all().length)
})

conn.ev.on('contacts.set', () => {
console.log('got contacts', Object.values(store.contacts).length)
})

conn.ev.on('messages.upsert', async m => {
var msg = m.messages[0]
if (!m.messages) return;
if (msg.key && msg.key.remoteJid == "status@broadcast") return
msg = serialize(conn, msg, store)
msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
require('./conn')(conn, msg, m, store)
})

conn.ev.on('creds.update', () => saveState)

conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

conn.ws.on('CB:call', async (json) => {
auto_BlockCaller(json)
})

conn.ev.on('creds.update', () => saveState)

conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

conn.ev.on('connection.update', (update) => {
status_Connection(conn, update, connectToWhatsApp)
})

conn.ev.on('group-participants.update', async (update) =>{
const isWelcome = welcome_JSON
if(!isWelcome.includes(update.id)) return
groupResponse_Demote(conn, update)
groupResponse_Promote(conn, update)
groupResponse_Welcome(conn, update)
groupResponse_Remove(conn, update)
console.log(update)
})

conn.ev.on('group-update', async (anu) => {
updateGroup(conn, anu, MessageType)
})

conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}
conn.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
if (type_file === 'image') {
const fs = require("fs");
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
await fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'video') {
const fs = require("fs");
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
}
await fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
const fs = require("fs");
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
await fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
const fs = require("fs");
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
await fs.writeFileSync(path_file, buffer)
return path_file
}
}
conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}
conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}
function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}
return conn
}
connectToWhatsApp()
.catch(err => console.log(err))

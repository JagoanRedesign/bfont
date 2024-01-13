
require('dotenv').config();
const { Telegraf, session, Scenes, Markup } = require("telegraf");
const { Stage, BaseScene } = Scenes;
const axios = require('axios');
const font = require('./lib/font.js');
const bot = new Telegraf(process.env.BOT_TOKEN || '5910800028:AAFLom3LB1yk1iFLhtqiun4KY_4KpZ57mrY';);
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || '';


const stage = new Stage();

async function getJsonDataFromUrl(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    return null;
  }
}



bot.use(session());
bot.use(stage.middleware());

const name = new BaseScene('name')
stage.register(name)

bot.command('aksarajawa', (ctx) => {

    ctx.reply('*📝 Please, send your text. *', { parse_mode: "Markdown" })
    ctx.scene.enter('name')
})

name.on('message', async (ctx) => {
    var input = ctx.update.message.text
    if (!input) {
        ctx.reply('Please send a message')
        return
    }
    ctx.scene.leave('name')
    if (input == "/cancel") {
        ctx.reply('Process terminated')
    } else {
    const jsonDataUrl = `https://yasirapi.eu.org/latintojawa?q=${input}`;
getJsonDataFromUrl(jsonDataUrl)
  .then(data => {
    ctx.reply(data.result, {reply_to_message_id : ctx.update.message.message_id})
  })

    }
})




bot.command('start', (ctx) =>{
  //console.log(ctx.update.message)
  var msg = ctx.update.message
  if(msg.chat.type = "private"){

    var pesan = "Halo! "+msg.from.first_name+"👋🏻 Saya adalah bot yang dapat membantu Anda untuk mendapatkan font bergaya terlihat keren, aneh (dan indah) yang dapat Anda gunakan di postingan media sosial atau profil gamer di Twitter, Instagram, Twitch, dan banyak lagi.\n\n<b><i>⚠️ Beberapa perangkat mungkin tidak mendukung font khusus, jadi ingatlah itu saat Anda mengirim teks penting ke teman.</i></b>\n\nAnda dapat menggunakan saya dengan menyebut username bot di obrolan apa pun dan mengetik pesan Anda. Daftar font akan muncul yang dapat Anda pilih."
    var inline = {inline_keyboard : [
       [{text: "Support", url: "https://t.me/DutabotSupport"}, 
{text: "Dev", url: "tg://user?id=1910497806"}],
      [{text: "Request Font", url: "https://t.me/Mazekubot"}],
    [{text: "InlineSearch", switch_inline_query_current_chat: ""}]
    ]}

    return ctx.reply(pesan, {parse_mode: "HTML", reply_markup : inline, reply_to_message_id : msg.message_id})

  }

})

bot.command('evals', async ctx => {
  var boleh = [1349919799];
  var msg = ctx.message;
  var test = ctx.telegram;
  var pola = /(^\/evals)/i.exec(ctx.message.text);
  var init = ctx.message.text.replace(pola[1], '');
  if (!boleh.includes(ctx.message.from.id)) {
    return false; //ctx.reply('Anda tidak diijinkan memakai command ini!!');
  } else {
    try {
      await eval(`(async ()=>{ ${init} })()`);
    } catch (err) {
      ctx.reply(String(err));
    }
  }
});





bot.on('inline_query', ctx => {
  let results = []
  if (ctx.inlineQuery.query) {
    const text = ctx.inlineQuery.query.replace(/<br\/>/g, '\n')
    results = [

    {type:'article', id:`bentText_${ctx.inlineQuery.id}`, title:'bentText', input_message_content:{message_text:`${font.bentText(text)}`, parse_mode:'HTML'}, description:`${font.bentText(text)}`}, 

{type:'article', id:`boldSans_${ctx.inlineQuery.id}`, title:'boldSans', input_message_content:{message_text:`${font.boldSans(text)}`, parse_mode:'HTML'}, description:`${font.boldSans(text)}`}, 

{type:'article', id:`boldText_${ctx.inlineQuery.id}`, title:'boldText', input_message_content:{message_text:`${font.boldText(text)}`, parse_mode:'HTML'}, description:`${font.boldText(text)}`}, 

{type:'article', id:`boldItalicSerif_${ctx.inlineQuery.id}`, title:'boldItalicSerif', input_message_content:{message_text:`${font.boldItalicSerif(text)}`, parse_mode:'HTML'}, description:`${font.boldItalicSerif(text)}`}, 

{type:'article', id:`currency_${ctx.inlineQuery.id}`, title:'currency', input_message_content:{message_text:`${font.currency(text)}`, parse_mode:'HTML'}, description:`${font.currency(text)}`}, 

{type:'article', id:`cursive_${ctx.inlineQuery.id}`, title:'cursive', input_message_content:{message_text:`${font.cursive(text)}`, parse_mode:'HTML'}, description:`${font.cursive(text)}`}, 

{type:'article', id:`doubleStruck_${ctx.inlineQuery.id}`, title:'doubleStruck', input_message_content:{message_text:`${font.doubleStruck(text)}`, parse_mode:'HTML'}, description:`${font.doubleStruck(text)}`}, 

{type:'article', id:`greek_${ctx.inlineQuery.id}`, title:'greek', input_message_content:{message_text:`${font.greek(text)}`, parse_mode:'HTML'}, description:`${font.greek(text)}`}, 

{type:'article', id:`italic_${ctx.inlineQuery.id}`, title:'italic', input_message_content:{message_text:`${font.italic(text)}`, parse_mode:'HTML'}, description:`${font.italic(text)}`}, 

{type:'article', id:`invertedSquares_${ctx.inlineQuery.id}`, title:'invertedSquares', input_message_content:{message_text:`${font.invertedSquares(text)}`, parse_mode:'HTML'}, description:`${font.invertedSquares(text)}`}, 

{type:'article', id:`medieval_${ctx.inlineQuery.id}`, title:'medieval', input_message_content:{message_text:`${font.medieval(text)}`, parse_mode:'HTML'}, description:`${font.medieval(text)}`}, 

{type:'article', id:`monospace_${ctx.inlineQuery.id}`, title:'monospace', input_message_content:{message_text:`${font.monospace(text)}`, parse_mode:'HTML'}, description:`${font.monospace(text)}`}, 

{type:'article', id:`neonText_${ctx.inlineQuery.id}`, title:'neonText', input_message_content:{message_text:`${font.neonText(text)}`, parse_mode:'HTML'}, description:`${font.neonText(text)}`}, 

{type:'article', id:`oldEnglish_${ctx.inlineQuery.id}`, title:'oldEnglish', input_message_content:{message_text:`${font.oldEnglish(text)}`, parse_mode:'HTML'}, description:`${font.oldEnglish(text)}`}, 

{type:'article', id:`superscript_${ctx.inlineQuery.id}`, title:'superscript', input_message_content:{message_text:`${font.superscript(text)}`, parse_mode:'HTML'}, description:`${font.superscript(text)}`}, 

{type:'article', id:`subscript_${ctx.inlineQuery.id}`, title:'subscript', input_message_content:{message_text:`${font.subscript(text)}`, parse_mode:'HTML'}, description:`${font.subscript(text)}`}, 

{type:'article', id:`symbols_${ctx.inlineQuery.id}`, title:'symbols', input_message_content:{message_text:`${font.symbols(text)}`, parse_mode:'HTML'}, description:`${font.symbols(text)}`}, 

{type:'article', id:`scriptify_${ctx.inlineQuery.id}`, title:'scriptify', input_message_content:{message_text:`${font.scriptify(text)}`, parse_mode:'HTML'}, description:`${font.scriptify(text)}`}, 

{type:'article', id:`upperAngles_${ctx.inlineQuery.id}`, title:'upperAngles', input_message_content:{message_text:`${font.upperAngles(text)}`, parse_mode:'HTML'}, description:`${font.upperAngles(text)}`}, 

{type:'article', id:`wideText_${ctx.inlineQuery.id}`, title:'wideText', input_message_content:{message_text:`${font.wideText(text)}`, parse_mode:'HTML'}, description:`${font.wideText(text)}`, }


    ]
  }

  return ctx.answerInlineQuery(results).catch(error => {
    ctx.answerInlineQuery([{
      type: 'article',
      id: `error_${ctx.inlineQuery.id}`,
      title: '⚠️ Error',
      message_text: `${error}`,
      description: `${error}`
    }])
  })
})




const express = require('express');
var app = express();
bot.telegram.setWebhook(`${BASE_URL}`)
app.use(bot.webhookCallback('/'))
app.get('/*', (req, res) => {
  res.send("bobott is running");
});

app.get('/ping', (req, res) => {
  res.send("pong !!!");
});

app.listen(process.env.PORT);

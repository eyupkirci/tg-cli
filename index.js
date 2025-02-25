// Auth process
// go to https://my.telegram.org/auth and create an app
// get the api_id and api_hash
// npm install telegram
// npm install input
// npm install dotenv
// create a .env file in the root directory
// add the following lines to the .env file
// API_ID=your_api_id
// API_HASH=your_api_hash
// npm install dotenv
// require("dotenv").config();
// const apiId = process.env.API_ID;
// const apiHash = process.env.API_HASH;

// client doesnt have all methods, we need to use invoke method to use all methods
// const result = await client.invoke(
//   new Api.XYZ.XYZ({}),
// );

const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const config = require("dotenv").config();

const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;

// stringSession
const stringSession = new StringSession(
  "1BAAOMTQ5LjE1NC4xNjcuOTEAUBUguQYZUxXW2LARvZkOWb9jW7ISprUZZ0iE5IY3GLoKUoixKRhhjGWJMmqLLYR/7llFkz8IjiEhMfNT6ojSByXXftYBMdM4ONlaTUSLJICmhzKJ5C5Ou2wr+iMBJc9B9qRXGOTIWrq3w5kt0WTQlDnBjzqWJx/J5q841xm/Wq+Y2+1bw7Wmu5xESW/yPt37bQ4GbVTRdr1wnmxRWzUSO0cGcG/WbRKx0mXN9BItOfkx/6eIntTJOluYzoRnDXiukQc8JOjbNH6UhsO3T05fiyFybr7A1NrjqR5uYoyCFzXzBZcDOSpIkCjHwA+trsf1Azdt5Za8Ttj5bzjoTfO1I8U="
);
// 1BAAOMTQ5LjE1NC4xNjcuOTEAUBUguQYZUxXW2LARvZkOWb9jW7ISprUZZ0iE5IY3GLoKUoixKRhhjGWJMmqLLYR/7llFkz8IjiEhMfNT6ojSByXXftYBMdM4ONlaTUSLJICmhzKJ5C5Ou2wr+iMBJc9B9qRXGOTIWrq3w5kt0WTQlDnBjzqWJx/J5q841xm/Wq+Y2+1bw7Wmu5xESW/yPt37bQ4GbVTRdr1wnmxRWzUSO0cGcG/WbRKx0mXN9BItOfkx/6eIntTJOluYzoRnDXiukQc8JOjbNH6UhsO3T05fiyFybr7A1NrjqR5uYoyCFzXzBZcDOSpIkCjHwA+trsf1Azdt5Za8Ttj5bzjoTfO1I8U=
// const stringSession = new StringSession("");

(async () => {
  // ********** AUTH PROCESS **********
  // if you have a string session, you can skip the auth process

  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
  await client.connect();

  //if you don't have a string session, you can use the following code to get one

  // await client.start({
  //   phoneNumber: async () => await input.text("Please enter your number: "),
  //   password: async () => await input.text("Please enter your password: "),
  //   phoneCode: async () => await input.text("Please enter the code you received: "),
  //   onError: (err) => console.log(err),
  // });

  // console.log("You should now be connected.");
  // console.log(client.session.save()); // Save this string to avoid logging in again or send it to your BE

  // ********** AUTH PROCESS **********

  // SEND MESSAGE
  // const messageText = "Hi There!";
  // const result = await client.sendMessage(peer, { message: messageText });

  // GET PEER ID
  // const peer = await client.getPeerId("me");
  // console.log("peer:", peer);

  // CHANNEL
  // const result = await client.invoke(
  //   new Api.channels.GetChannels({
  //     id: ["tg_channel"],
  //   })
  // );

  // const messageResult = await client.getMessages("tgtestchannl", { reverse: true });
  // console.log("🚀 ~ messageResult:", messageResult);
})();

// custom send message
async function customSendMessage(client, channelName, message, replyTo = null) {
  const peer = await client.getPeerId(channelName);
  const options = { message: message };
  if (replyTo !== null) {
    options.replyTo = replyTo;
  }
  const result = await client.sendMessage(peer, options);
  console.log("🚀 ~ customSendMessage ~ result:", result);
  return result;
}

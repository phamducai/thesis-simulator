import mqtt from "mqtt";

const client = mqtt.connect("mqtt://test.mosquitto.org", {
  reconnectPeriod: 0,
});

client.on("error", (error) => {
  console.log("error", error.message);
});

client.on("connect", () => {
  console.log("connect");

  client.subscribe("down/+", (error) => {
    if (error) return console.log("error", error.message);
    console.log("subscribed success");
  });

  // code sau danh cho provision, chi chay 1 lan
  // const msgObj = {
  //   action: "provision",
  //   deviceName: "Relay 3 Channels",
  //   deviceType: "Relay3Channels",
  //   channels: {
  //     channel1: 0,
  //     channel2: 0,
  //     channel3: 0,
  //   },
  // };
  // client.publish("up/", JSON.stringify(msgObj));

  // code sau cho telemetry
  // khi nao provision thi phai comment no di

  setInterval(() => {
    const msgObj = {
      action: "telemetry",
      channels: {
        channel0: getRandomInt(110, 220),
        channel1: getRandomInt(110, 220),
        channel3: getRandomInt(110, 220),
      },
    };
    client.publish("up/6276b3031269a1c923ff50be", JSON.stringify(msgObj));
  }, 2000);
});

client.on("message", async (topic, msgBuff) => {
  // msgBuff is a buffer, so convert it to string
  const msgStr = msgBuff.toString();

  const msgObj = JSON.parse(msgStr);

  console.log(msgObj);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

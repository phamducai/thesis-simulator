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

  //relay ADe
  // const msgObj = {
  //   action: "provision",
  //   deviceName: "May bom",
  //   deviceType: "RelayAde",
  //   channels: {
  //     Relay_state: true,
  //     vrms: 220,
  //     irms: 10,
  //     power: 110,
  //     enegy: 310,
  //   },
  //   refRoom: "627411c4fdef6aa7eb4705aa",
  // };
  // client.publish("up/", JSON.stringify(msgObj));
  // //sensor add
  // const msgObj = {
  //   deviceName: "Sensor",
  //   action: "provision",
  //   deviceType: "Sensor",
  //   channels: {
  //     temp: 110,
  //     humidity: 220,
  //     airquality: 10,
  //   },
  //   refRoom: "627411c4fdef6aa7eb4705aa",
  // };
  // client.publish("up/", JSON.stringify(msgObj));

  // Relay3Channels;
  // const msgObj = {
  //   action: "provision",
  //   deviceName: "Relay 3 Channels",
  //   deviceType: "Relay3Channels",
  //   channels: {
  //     namechannel1: "loai 1",
  //     channel1: 4123,
  //     namechannel2: "lhasd",
  //     channel2: 41234,
  //     namechannel3: "ccc",
  //     channel3: 12421,
  //   },
  //   refRoom: "627411c4fdef6aa7eb4705aa",
  // };

  // client.publish("up/", JSON.stringify(msgObj));

  /////////////////////////////////////////////////////////////////////////////////////////////code sau cho telemetry
  // khi nao provision thi phai comment no di

  // setInterval(() => {
  //   const deviceId = "62789eec08a7577efaf71c6d";
  //   const msgObj = {
  //     action: "telemetry",
  //     channels: {
  //       channel1: getRandomInt(110, 220),
  //       channel2: getRandomInt(110, 220),
  //       channel3: getRandomInt(110, 220),
  //     },
  //   };
  //   client.publish("up/" + deviceId, JSON.stringify(msgObj));
  // }, 2000);
  //Ade relay
  setInterval(() => {
    const deviceId = "6278c48a12ccdde504ae8f3e";
    const msgObj = {
      action: "telemetry",
      channels: {
        vrms: getRandomInt(110, 220),
        irms: getRandomInt(110, 220),
        energy: getRandomInt(110, 220),
      },
    };
    client.publish("up/" + deviceId, JSON.stringify(msgObj));
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

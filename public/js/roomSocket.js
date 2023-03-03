const btn = document.querySelector(".btn");
btn.addEventListener("click", async () => {
  const roomName = location.pathname.split("/").pop();

  var socket = io.connect("http://localhost:5555/", {
    query: `roomName=${roomName}`,
  });
  console.log(roomName);
  fetch("http://localhost:5555/chat/show/6401d583d77e0bdfeaf7d115", {
    method: "POST",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: "640041554d81e39195c27736",
      chatId: "6401d583d77e0bdfeaf7d115",
    }),
  })
    .then((response) => response.json())
    .then((user) => console.log(user));

  // socket.on("message-to-me", (msg) => {
  //   const div = getTmp(msg);
  //   boxList.insertAdjacentHTML("beforeend", div);
  // });

  // sendMe.addEventListener("click", () => {
  //   socket.emit("message-to-me", {
  //     username: inputUsername.value,
  //     text: inputText.value,
  //   });
  // });

  // socket.on("message-to-all", (msg) => {
  //   const div = getTmp(msg);
  //   boxList.insertAdjacentHTML("beforeend", div);
  // });

  // sendAll.addEventListener("click", () => {
  //   socket.emit("message-to-all", {
  //     username: inputUsername.value,
  //     text: inputText.value,
  //   });
  // });

  //   socket.on("message-to-room", (msg) => {
  //     const div = getTmp(msg);
  //     boxList.insertAdjacentHTML("beforeend", div);
  //   });

  //   socket.emit("message-to-room", {
  //     username: inputUsername.value,
  //     text: inputText.value,
  //   });
});

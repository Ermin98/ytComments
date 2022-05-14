"use strict";

const account1 = {
  image: "https://picsum.photos/30",
  user: "Ivan Zorzok",
  pin: "1111",
};

const comments = {
  images: [
    "https://picsum.photos/30",
    "https://picsum.photos/30",
    "https://picsum.photos/30",
  ],
  users: ["Jones Carol", "Ivan Berzok", "Mike Torres"],
  texts: ["Hi! Great video!", "Wow! Thank you.", "I subscribed!"],
  replies: [
    {
      images: [],
      users: [],
      texts: [],
      opened: false,
    },
    {
      images: ["https://picsum.photos/30", "https://picsum.photos/30"],
      users: ["Pierre Jacques", "Caroline Schmidt"],
      texts: ["He helped me too.", "Exactly, thank you!"],
      opened: false,
    },
    {
      images: ["https://picsum.photos/30", "https://picsum.photos/30"],
      users: ["Mark Zorr", "Quintin Dupont"],
      texts: ["I agree with you.", "Nicely said."],
      opened: false,
    },
  ],
};

const commentInput = document.querySelector(".comment-input");
const commentBtn = document.querySelector(".comment-btn");
const commentContainer = document.querySelector(".comments");
const displayComments = function (comms) {
  commentContainer.innerHTML = "";

  // for (let i = 0; i < comms.texts.length; i++) {
  for (let i = comms.texts.length - 1; i >= 0; i--) {
    const html = `
      <div class="comment-div">
        <img src="${comms.images[i]}" alt="" />
        <div class="comment-content">
          <h1>${comms.users[i]}</h1>
          <p>${comms.texts[i]}</p>
          <button class="reply-btn">Reply</button>
          </br>
          <input class="input-reply collapse" type="text"> 
          <button class="send-reply-btn collapse">Reply</button>
          </br>
        
        
          <span class="show-replies-btn ${
            comms.replies[i].texts.length === 0 ? "collapse" : ""
          }">${comments.replies[i].opened ? "🔺 Hide" : "🔻 Show"} ${
      comms.replies[i].texts.length
    } replies</span>
    
    <div class="replies ${
      comments.replies[i].opened === false ? `collapse` : ``
    }">
    ${comments.replies[i].texts
      .map(
        (_, j) =>
          `<div class="reply-div">
                      <img src=${comments.replies[i].images[j]} alt="" />
                      <div class="reply-content">
                      <h1>${comments.replies[i].users[j]}</h1>
                      <p>${comments.replies[i].texts[j]}</p>
                      </div>
                </div>`
      )
      .join("")}
    </div>
    
    </div
      </div>
    `;
    commentContainer.insertAdjacentHTML("afterbegin", html);
  }
  const replyBtn = document.querySelectorAll(".reply-btn");
  const inputReply = document.querySelectorAll(".input-reply");
  const sendReplyBtn = document.querySelectorAll(".send-reply-btn");
  const showRepliesBtn = document.querySelectorAll(".show-replies-btn");
  const commentDiv = document.querySelectorAll(".comment-div");
  const replyDiv = document.querySelectorAll(".reply-div");
  const replies = document.querySelectorAll(".replies");

  replyBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      inputReply[i].classList.toggle("collapse");
      sendReplyBtn[i].classList.toggle("collapse");
    });
  });

  for (let i = sendReplyBtn.length - 1; i >= 0; i--)
    sendReplyBtn[i].addEventListener("click", function (e) {
      e.preventDefault();
      comments.replies[i].users.push(account1.user);
      comments.replies[i].texts.push(inputReply[i].value);
      comments.replies[i].images.push(account1.image);
      comments.replies[i].opened = true;

      updateUI();
    });

  showRepliesBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      comments.replies[i].opened = !comments.replies[i].opened;
      replies[i].classList.toggle("collapse");

      updateUI();
    });
  });
};

commentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  comments.users.unshift(account1.user);
  comments.texts.unshift(commentInput.value);
  comments.images.unshift(account1.image);
  commentInput.value = "";
  comments.replies.unshift({ images: [], users: [], texts: [] });
  updateUI();
});

const updateUI = function () {
  displayComments(comments);
  // displayReplies();
};
updateUI();

// const displayReplies = function () {
//   const showRepliesBtn = document.querySelectorAll(".show-replies-btn");
//   const commentDiv = document.querySelectorAll(".comment-div");

//   showRepliesBtn.forEach((btn, i) => {
//     comments.replies[i].texts.forEach((reply, j) => {
//       const html = `<div class="reply-div collapse">
//                                   <img src=${comments.replies[i].images[j]} alt="" />
//                                   <h1>${comments.replies[i].users[j]}</h1>
//                                   <p>${comments.replies[i].texts[j]}</p>
//                                   </div>
//                                   `;
//       commentDiv[i].insertAdjacentHTML("beforeend", html);
//       const replyDiv = document.querySelectorAll(".reply-div");
//       showRepliesBtn.forEach((btn, i) => {
//         replyDiv.forEach((reply) => {
//           btn.addEventListener("click", function (e) {
//             e.preventDefault();
//             reply.classList.toggle("collapse");
//           });
//         });
//       });
//     });
//   });
// };

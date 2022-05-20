"use strict";

const account1 = {
  image:
    "https://i.picsum.photos/id/5/200/300.jpg?hmac=1TWjKFT7_MRP0ApEyDUA3eCP0HXaKTWJfHgVjwGNoZU",
  user: "James Gerrard",
  pin: 1111,
};

const account2 = {
  image:
    "https://i.picsum.photos/id/836/200/200.jpg?hmac=70GDRJl0glOr9fJhUxmdhh7zQQz1uA8Zam_aGTa8Ucg",
  user: "Tony Montana",
  pin: 2222,
};

const accounts = [account1, account2];

const comments = {
  images: [
    "https://picsum.photos/30",
    "https://picsum.photos/30",
    "https://picsum.photos/30",
  ],
  users: ["Jones Carol", "Paul Berger", "Mike Torres"],
  texts: ["Hi! Great video!", "Wow! Thank you.", "I subscribed!"],
  likes: [
    ["name1 name2", "name1 name2", "name1 name2", "name1 name2", "name1 name2"],
    [
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
    ],
    ["name1 name2", "name1 name2", "name1 name2", "name1 name2", "name1 name2"],
  ],
  dislikes: [
    ["name1 name2", "name1 name2"],
    ["name1 name2", "name1 name2", "name1 name2"],
    ["name1 name2", "name1 name2"],
  ],
  replyLikes: [
    [],
    [["name1 name2"], ["name1 name2", "name1 name2", "name1 name2"]],
    [
      ["name1 name2", "name1 name2", "name1 name2", "name1 name2"],
      ["name1 name2", "name1 name2", "name1 name2", "name1 name2"],
    ],
  ],
  replyDislikes: [[], [[], ["name1 name2"]], [["name1 name2"], []]],

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
      texts: ["Very helpful.", "Exactly, thank you!"],
      opened: false,
    },
    {
      images: ["https://picsum.photos/30", "https://picsum.photos/30"],
      users: ["Mark Stark", "Quentin Dupont"],
      texts: ["I agree with you.", "Nicely said."],
      opened: false,
    },
  ],
};
let currentAccount;

const commentInput = document.querySelector(".comment-input");
const commentBtn = document.querySelector(".comment-btn");
const commentContainer = document.querySelector(".comments");
const commentApp = document.querySelector(".comment-app");

const displayComments = function (comms) {
  commentContainer.innerHTML = "";

  // for (let i = 0; i < comms.texts.length; i++) {
  for (let i = comms.texts.length - 1; i >= 0; i--) {
    const html = `
      <div class="comment-div">
        <img src="${comms.images[i]}" alt="" />
        <div class="comment-content">
          <h2>${comms.users[i]}</h2>
          <p>${comms.texts[i]}</p>
          <div class="likes">
            <span class="like-btns like">${
              !comments.likes[i].includes(currentAccount?.user) ? "👍" : "👍🏾"
            }</span> 
            <span>${
              comments.likes[i].length - comments.dislikes[i].length
            }</span> 
            <span class="like-btns dislike">${
              !comments.dislikes[i].includes(currentAccount?.user) ? "👎" : "👎🏾"
            }</span> 
          </div>
          <button class="reply-btn">Reply</button>
          <div class="add-reply-div collapse">
          
            <img class="reply-img" src=${
              currentAccount
                ? currentAccount.image
                : "https://logodix.com/logo/1727545.png"
            } alt="" />
            <input class="input-reply" placeholder="Write a reply..." type="text"> 
            <br/>
            <button class="cancel-reply-btn">Cancel</button>
            <button class="send-reply-btn">Reply</button>

          </div>
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
                      <img class="reply-img" src=${
                        comments.replies[i].images[j]
                      } alt="" />
                      <div class="reply-content">
                      <h4>${comments.replies[i].users[j]}</h4>
                      <p>${comments.replies[i].texts[j]}</p>

                      <div class="likes">
            <span class="like-btns reply-like">${
              !comments.replyLikes[i][j].includes(currentAccount?.user)
                ? "👍"
                : "👍🏾"
            }</span> 
            <span>${
              comments.replyLikes[i][j].length -
              comments.replyDislikes[i][j].length
            }</span> 
            <span class="like-btns reply-dislike">${
              !comments.replyDislikes[i][j].includes(currentAccount?.user)
                ? "👎"
                : "👎🏾"
            }</span> 
          </div>

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
  const addReplyDiv = document.querySelectorAll(".add-reply-div ");
  const cancelReplyBtn = document.querySelectorAll(".cancel-reply-btn");
  const cancelCommentBtn = document.querySelector(".cancel-comment-btn");

  replyBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      addReplyDiv[i].classList.remove("collapse");
      inputReply[i].focus();
    });
  });

  cancelReplyBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      addReplyDiv[i].classList.add("collapse");
      inputReply[i].value = "";
    });
  });

  cancelCommentBtn.addEventListener("click", function (e) {
    e.preventDefault();
    cancelCommentBtn.classList.add("collapse");
    commentBtn.classList.add("collapse");
  });

  commentInput.addEventListener("click", function (e) {
    e.preventDefault();
    cancelCommentBtn.classList.remove("collapse");
    commentBtn.classList.remove("collapse");
  });

  for (let i = sendReplyBtn.length - 1; i >= 0; i--)
    sendReplyBtn[i].addEventListener("click", function (e) {
      e.preventDefault();

      if (!currentAccount) {
        alert("You are not logged in!");
      } else if (inputReply[i].value.trim().length !== 0) {
        //adding reply data to the replies array
        comments.replies[i].users.push(currentAccount.user);
        comments.replies[i].texts.push(inputReply[i].value);
        comments.replies[i].images.push(currentAccount.image);
        comments.replyLikes[i].push([]);
        comments.replyDislikes[i].push([]);
        //open replies section after adding comment
        comments.replies[i].opened = true;
        updateUI();
      }
    });

  showRepliesBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      comments.replies[i].opened = !comments.replies[i].opened;
      replies[i].classList.toggle("collapse");

      updateUI();
    });
  });

  //Comments like and dislike buttons
  const likeBtns = document.querySelectorAll(".like-btns");
  const likeBtn = document.querySelectorAll(".like");
  const dislikeBtn = document.querySelectorAll(".dislike");

  likeBtn.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const currentLikeIndex = comments.likes[i].indexOf(currentAccount.user);
      const currentDislikeIndex = comments.dislikes[i].indexOf(
        currentAccount.user
      );
      if (!comments.likes[i].includes(currentAccount.user)) {
        comments.likes[i].unshift(currentAccount.user);
        if (comments.dislikes[i].includes(currentAccount.user)) {
          comments.dislikes[i].splice(currentDislikeIndex, 1);
        }
      } else {
        comments.likes[i].splice(currentLikeIndex, 1);
      }

      updateUI();
    });
  });

  dislikeBtn.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const currentLikeIndex = comments.likes[i].indexOf(currentAccount.user);
      const currentDislikeIndex = comments.dislikes[i].indexOf(
        currentAccount.user
      );

      if (!comments.dislikes[i].includes(currentAccount.user)) {
        comments.dislikes[i].unshift(currentAccount.user);
        if (comments.likes[i].includes(currentAccount.user)) {
          comments.likes[i].splice(currentLikeIndex, 1);
        }
      } else {
        comments.dislikes[i].splice(currentDislikeIndex, 1);
      }

      updateUI();
    });
  });

  //Replies like and dislike buttons
  const replyLikeBtn = document.querySelectorAll(".reply-like");
  const replyDislikeBtn = document.querySelectorAll(".reply-dislike");

  replyLikeBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      const currentLikeIndex = comments.replyLikes
        .flat()
        [i].indexOf(currentAccount.user);
      const currentDislikeIndex = comments.replyDislikes
        .flat()
        [i].indexOf(currentAccount.user);

      if (!comments.replyLikes.flat()[i].includes(currentAccount.user)) {
        comments.replyLikes.flat()[i].unshift(currentAccount.user);
        if (comments.replyDislikes.flat()[i].includes(currentAccount.user)) {
          comments.replyDislikes.flat()[i].splice(currentDislikeIndex, 1);
        }
      } else {
        comments.replyLikes.flat()[i].splice(currentLikeIndex, 1);
      }
      updateUI();
    });
  });

  replyDislikeBtn.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const currentLikeIndex = comments.replyLikes
        .flat()
        [i].indexOf(currentAccount.user);
      const currentDislikeIndex = comments.replyDislikes
        .flat()
        [i].indexOf(currentAccount.user);

      if (!comments.replyDislikes.flat()[i].includes(currentAccount.user)) {
        comments.replyDislikes.flat()[i].unshift(currentAccount.user);
        if (comments.replyLikes.flat()[i].includes(currentAccount.user)) {
          comments.replyLikes.flat()[i].splice(currentLikeIndex, 1);
        }
      } else {
        comments.replyDislikes.flat()[i].splice(currentDislikeIndex, 1);
      }
      updateUI();
    });
  });
};

commentBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (currentAccount === undefined) {
    alert("You are not logged in!");
  } else if (commentInput.value.trim().length !== 0) {
    comments.users.unshift(currentAccount.user);
    comments.texts.unshift(commentInput.value);
    comments.images.unshift(currentAccount.image);
    comments.likes.unshift([]);
    comments.dislikes.unshift([]);
    commentInput.value = "";
    comments.replies.unshift({
      images: [],
      users: [],
      texts: [],
      opened: false,
    });
    comments.replyLikes.unshift([]);
    comments.replyDislikes.unshift([]);
    updateUI();
  }
});
const commentImg = document.querySelector(".comment-img");

const updateUI = function () {
  displayComments(comments);

  currentAccount
    ? (commentImg.src = currentAccount.image)
    : (commentImg.src = "https://logodix.com/logo/1727545.png");
};
updateUI();

//LOGIN

const loginFields = document.querySelector(".login-fields");
const loginBtn = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const labelWelcome = document.querySelector(".welcome");
const replyImg = document.querySelectorAll(".reply-img");
const logoutBtn = document.querySelector(".logout-btn");

const createUsername = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.user
      .split(" ")
      .map((name) => name[0].toLowerCase())
      .join("");
  });
};
createUsername(accounts);

currentAccount = account1; //to be removed, fake login

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) =>
      acc.username === inputLoginUsername.value &&
      +inputLoginPin.value === acc.pin
  );

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.user.split(" ")[0]
    }!`;
    commentImg.src = currentAccount.image;
    replyImg.forEach((img) => {
      img.src = currentAccount.image;
    });

    inputLoginUsername.value = inputLoginPin.value = "";
    loginFields.classList.add("collapse");
    commentApp.classList.remove("collapse");
    logoutBtn.classList.remove("collapse");
  } else if (
    inputLoginUsername.value !== "" &&
    inputLoginPin.value !== "" &&
    !currentAccount
  ) {
    labelWelcome.textContent = `Username or password incorrect!`;
  } else {
    labelWelcome.textContent = `Username or password field empty!`;
  }
  updateUI();
});

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginFields.classList.remove("collapse");
  commentApp.classList.add("collapse");
  logoutBtn.classList.add("collapse");
  currentAccount = undefined;
  // updateUI();
});

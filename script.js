"use strict";

const account1 = {
  image:
    "https://i.picsum.photos/id/5/200/300.jpg?hmac=1TWjKFT7_MRP0ApEyDUA3eCP0HXaKTWJfHgVjwGNoZU",
  user: "Marko Zorzok",
  pin: 1111,
};

const account2 = {
  image:
    "https://i.picsum.photos/id/836/200/200.jpg?hmac=70GDRJl0glOr9fJhUxmdhh7zQQz1uA8Zam_aGTa8Ucg",
  user: "Paul Berger",
  pin: 2222,
};

const accounts = [account1, account2];

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
          <h2>${comms.users[i]}</h2>
          <p>${comms.texts[i]}</p>
          <button class="reply-btn">Reply</button>
          <div class="add-reply-div collapse">
          
            <img class="reply-img" src="https://picsum.photos/20" alt="" />
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
                      <img class = "reply-img"src=${comments.replies[i].images[j]} alt="" />
                      <div class="reply-content">
                      <h4>${comments.replies[i].users[j]}</h4>
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
    console.log(cancelCommentBtn);
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
        comments.replies[i].users.push(currentAccount.user);
        comments.replies[i].texts.push(inputReply[i].value);
        comments.replies[i].images.push(currentAccount.image);
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
};

commentBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (currentAccount === undefined) {
    alert("You are not logged in!");
  } else if (commentInput.value.trim().length !== 0) {
    comments.users.unshift(currentAccount.user);
    comments.texts.unshift(commentInput.value);
    comments.images.unshift(currentAccount.image);
    commentInput.value = "";
    comments.replies.unshift({ images: [], users: [], texts: [] });
    updateUI();
  }
});

const updateUI = function () {
  displayComments(comments);
  // displayReplies();
};
updateUI();

//LOGIN

const loginBtn = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const labelWelcome = document.querySelector(".welcome");
const commentImg = document.querySelector(".comment-img");
const replyImg = document.querySelector(".reply-img");

const createUsername = function (accs) {
  console.log(accs);
  accs.forEach((acc) => {
    acc.username = acc.user
      .split(" ")
      .map((name) => name[0].toLowerCase())
      .join("");
  });
};
createUsername(accounts);

let currentAccount;
currentAccount = account1; //to be removed, fake login

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) =>
      acc.username === inputLoginUsername.value &&
      +inputLoginPin.value === acc.pin
  );

  console.log(currentAccount);

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.user.split(" ")[0]
    }!`;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  } else if (
    inputLoginUsername.value !== "" &&
    inputLoginPin.value !== "" &&
    !currentAccount
  ) {
    labelWelcome.textContent = `Username or password incorrect!`;
  } else {
    labelWelcome.textContent = `Username or password field empty!`;
  }

  if (currentAccount) {
    console.log(commentImg);
    commentImg.src = currentAccount.image;
    replyImg.src = currentAccount.image;
  }
});

/////

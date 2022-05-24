"use strict";

const account1 = {
  image: "https://picsum.photos/id/1005/200",
  user: "James Gerrard",
  pin: 1111,
};

const account2 = {
  image: "https://picsum.photos/id/338/200",
  user: "Tony Montana",
  pin: 2222,
};

const accounts = [account1, account2];

const comments = {
  images: [
    "https://picsum.photos/id/883/200",
    "https://picsum.photos/id/447/200",
    "https://picsum.photos/id/669/200",
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
  commentDatesArray: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
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
  // replyID: [0, 1, 2]
  replyDislikes: [[], [[], ["name1 name2"]], [["name1 name2"], []]],

  replies: [
    {
      images: [],
      users: [],
      texts: [],
      opened: false,
      replyDatesArray: [],
    },
    {
      images: [
        "https://picsum.photos/id/473/200",
        "https://picsum.photos/id/1027/200",
      ],
      users: ["Pierre Jacques", "Caroline Schmidt"],
      texts: ["Very helpful.", "Exactly, thank you!"],
      opened: false,
      replyDatesArray: ["2020-02-05T16:33:06.386Z", "2020-04-10T14:43:26.374Z"],
    },
    {
      images: [
        "https://picsum.photos/id/685/200",
        "https://picsum.photos/id/856/200",
      ],
      users: ["Mark Stark", "Quentin Dupont"],
      texts: ["I agree with you.", "Nicely said."],
      opened: false,
      replyDatesArray: ["2020-06-25T18:49:59.371Z", "2020-07-26T12:01:20.894Z"],
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
    //defining time
    const date = new Date(comments.commentDatesArray[i]);
    const minute = `${date.getMinutes()}`.padStart(2, 0);
    const hour = `${date.getHours()}`.padStart(2, 0);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = `${date.getFullYear()}`;
    const displayDate = `${day}.${month}.${year} at ${hour}:${minute}`;

    const html = `
      <div id="comment-${i}" class="comment-div">
        <img src="${comms.images[i]}" alt="" />
        <div class="comment-content">
          <h2 class="inline-block">${comms.users[i]}</h2>
            <a class="comment-date" href="#">${displayDate}</a>
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
            <div class="input-reply" contentEditable="true" data-text="Write a reply..."></div>
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
      .map((_, j) => {
        // console.log(date);
        // console.log(date2[j]);
        // const saat = `${date[j].getHours()}`;
        // console.log(date2);
        const replyDate = new Date(comments.replies[i].replyDatesArray[j]);
        const replyMinute = `${replyDate.getMinutes()}`.padStart(2, 0);
        const replyHour = `${replyDate.getHours()}`.padStart(2, 0);
        const replyDay = `${replyDate.getDate()}`.padStart(2, 0);
        const replyMonth = `${replyDate.getMonth() + 1}`.padStart(2, 0);
        const replyYear = `${replyDate.getFullYear()}`;
        const displayDate = `${replyDay}.${replyMonth}.${replyYear} at ${replyHour}:${replyMinute}`;

        // console.log(saat);

        return `<div id="comment-${i}-reply-${j}" class="reply-div">
                      <img class="reply-img" src=${
                        comments.replies[i].images[j]
                      } alt="" />
                      <div class="reply-content">
                      <h4 class="inline-block">${
                        comments.replies[i].users[j]
                      }</h4>
                      <a class="comment-date" href="#">${displayDate}</a>
                      <p>${comments.replies[i].texts[j]}</p>

                      <div class="likes">
            <span class="reply-like-btns reply-like">${
              !comments.replyLikes[i][j].includes(currentAccount?.user)
                ? "👍"
                : "👍🏾"
            }</span> 
            <span>${
              comments.replyLikes[i][j].length -
              comments.replyDislikes[i][j].length
            }</span> 
            <span class="reply-like-btns reply-dislike">${
              !comments.replyDislikes[i][j].includes(currentAccount?.user)
                ? "👎"
                : "👎🏾"
            }</span> 
          </div>


          <button class="reply-btn reply-to-reply-btn">Reply</button>
          <div class="add-reply-div collapse">
          
            <img class="reply-img" src=${
              currentAccount
                ? currentAccount.image
                : "https://logodix.com/logo/1727545.png"
            } alt="" />
            <div class="input-reply" contentEditable="true" data-text="Write a reply..."></div>
            <br/>
            <button class="cancel-reply-btn">Cancel</button>
            <button class="send-reply-btn">Reply</button>

          </div>


                      </div>
                </div>`;
      })
      .join("")}
    </div>
    
    </div
      </div>
    `;
    commentContainer.insertAdjacentHTML("afterbegin", html);
  }

  //remove styles when pasting in content-editable divs -  source: https://localcoder.org/stop-pasting-html-style-in-a-contenteditable-div-only-paste-the-plain-text
  var ceEl = document.querySelectorAll("[contentEditable]");
  ceEl.forEach((ce) => {
    ce.addEventListener("paste", function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    });
  });

  const replyBtn = document.querySelectorAll(".reply-btn");
  const inputReply = document.querySelectorAll(".input-reply");
  const sendReplyBtn = document.querySelectorAll(".send-reply-btn");
  const replyToReplyBtn = document.querySelectorAll(".reply-to-reply-btn");
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

      if (btn.classList.contains("reply-to-reply-btn")) {
        document.getElementsByClassName("input-reply")[
          i
        ].innerHTML = `<span class="end-of-tag-span"><span class="reply-to-reply-tag" contentEditable="false">@${btn.parentElement.children[0].textContent}</span>&nbsp;</span>`;

        //setting cursor at the end of the tag - source: https://gist.github.com/michelcmorel/6725279
        const endOfTagSpan = document.querySelector(".end-of-tag-span");
        function setCaretAtEnd() {
          let range = document.createRange();
          let sel = window.getSelection();
          if (endOfTagSpan) {
            range.setStartAfter(endOfTagSpan);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
        setCaretAtEnd();
      }
      addReplyDiv[i].classList.remove("collapse");
      inputReply[i].focus();
    });
  });

  cancelReplyBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      addReplyDiv[i].classList.add("collapse");
      inputReply[i].textContent = "";
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

  for (let i = sendReplyBtn.length - 1; i >= 0; i--) {
    sendReplyBtn[i].addEventListener("click", function (e) {
      e.preventDefault();
      console.log(inputReply[i].children[0]?.children[0]?.textContent.length);

      //getting ID of the parent
      let commentID = sendReplyBtn[i].closest(".comment-div").id.split("-")[1];

      let replyingTo =
        sendReplyBtn[i].parentElement.parentElement.children[0].textContent;
      console.log(replyingTo.length);

      //if reply doesn't contain only spaces and/or username, the input won't count as empty
      if (
        inputReply[i].textContent.trim().length -
          (inputReply[i].children[0]?.children[0]?.textContent.length
            ? replyingTo.length + 1
            : 0) >
        0
      ) {
        //adding the current reply date to the reply array
        comments.replies[commentID].replyDatesArray.push([
          new Date().toISOString(),
        ]);
        //adding reply data to the replies array
        comments.replies[commentID].users.push(currentAccount.user);
        //if tag not removed, make a href link of it, otherwise just show the text
        comments.replies[commentID].texts.push(
          inputReply[i].children[0]?.children[0]?.textContent
            ? `<a href="#" class="reply-tag-href">@${replyingTo}</a> ${inputReply[
                i
              ].textContent
                .split(replyingTo)[1]
                .trim()}`
            : inputReply[i].textContent
        );
        comments.replies[commentID].images.push(currentAccount.image);
        comments.replyLikes[commentID].push([]);
        comments.replyDislikes[commentID].push([]);
        //open replies section after adding comment
        comments.replies[commentID].opened = true;
        updateUI();
      }
    });
  }

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

  likeBtns.forEach((btn, ii) => {
    btn.addEventListener("click", function () {
      //Dividing the like/dislike indexes by two in order to match the comment index
      let i = Math.floor(ii / 2);

      //Checking if the account exists inside the like/dislike arrays
      const currentLikeIndex = comments.likes[i].indexOf(currentAccount.user);
      const currentDislikeIndex = comments.dislikes[i].indexOf(
        currentAccount.user
      );

      if (btn.classList.contains("like")) {
        if (!comments.likes[i].includes(currentAccount.user)) {
          comments.likes[i].unshift(currentAccount.user);
          if (comments.dislikes[i].includes(currentAccount.user)) {
            comments.dislikes[i].splice(currentDislikeIndex, 1);
          }
        } else {
          comments.likes[i].splice(currentLikeIndex, 1);
        }
      } else if (btn.classList.contains("dislike")) {
        if (!comments.dislikes[i].includes(currentAccount.user)) {
          comments.dislikes[i].unshift(currentAccount.user);
          if (comments.likes[i].includes(currentAccount.user)) {
            comments.likes[i].splice(currentLikeIndex, 1);
          }
        } else {
          comments.dislikes[i].splice(currentDislikeIndex, 1);
        }
      }

      updateUI();
    });
  });

  //Replies like and dislike buttons
  const replyLikeBtns = document.querySelectorAll(".reply-like-btns");

  replyLikeBtns.forEach((btn, ii) => {
    btn.addEventListener("click", function (e) {
      //Dividing the like index by two in order to match the reply index
      let i = Math.floor(ii / 2);

      //Checking if the account exists inside the like/dislike arrays
      const currentLikeIndex = comments.replyLikes
        .flat()
        [i].indexOf(currentAccount.user);
      const currentDislikeIndex = comments.replyDislikes
        .flat()
        [i].indexOf(currentAccount.user);

      if (btn.classList.contains("reply-like")) {
        if (!comments.replyLikes.flat()[i].includes(currentAccount.user)) {
          comments.replyLikes.flat()[i].unshift(currentAccount.user);
          if (comments.replyDislikes.flat()[i].includes(currentAccount.user)) {
            comments.replyDislikes.flat()[i].splice(currentDislikeIndex, 1);
          }
        } else {
          comments.replyLikes.flat()[i].splice(currentLikeIndex, 1);
        }
      } else if (btn.classList.contains("reply-dislike")) {
        if (!comments.replyDislikes.flat()[i].includes(currentAccount.user)) {
          comments.replyDislikes.flat()[i].unshift(currentAccount.user);
          if (comments.replyLikes.flat()[i].includes(currentAccount.user)) {
            comments.replyLikes.flat()[i].splice(currentLikeIndex, 1);
          }
        } else {
          comments.replyDislikes.flat()[i].splice(currentDislikeIndex, 1);
        }
      }

      updateUI();
    });
  });
};

commentBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (currentAccount === undefined) {
    alert("You are not logged in!");
  } else if (commentInput.textContent.trim().length !== 0) {
    //add comment date
    comments.commentDatesArray.unshift(new Date().toISOString());

    comments.users.unshift(currentAccount.user);
    comments.texts.unshift(commentInput.textContent);
    comments.images.unshift(currentAccount.image);
    comments.likes.unshift([]);
    comments.dislikes.unshift([]);
    commentInput.textContent = "";
    comments.replies.unshift({
      images: [],
      users: [],
      texts: [],
      opened: false,
      replyDatesArray: [],
    });
    comments.replyLikes.unshift([]);
    comments.replyDislikes.unshift([]);
    updateUI();
  }
});
const commentImg = document.querySelector(".comment-img");

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

//Updating the UI
const updateUI = function () {
  displayComments(comments);

  currentAccount
    ? (commentImg.src = currentAccount.image)
    : (commentImg.src = "https://logodix.com/logo/1727545.png");
};
updateUI();

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

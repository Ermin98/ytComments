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
      "name1 name2",
    ],
    [
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
      "name1 name2",
    ],
  ],

  dislikes: [
    ["name1 name2", "name1 name2"],
    ["name1 name2", "name1 name2", "name1 name2"],
    ["name1 name2", "name1 name2"],
  ],
  commentDatesArray: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
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
currentAccount = account1; //to be removed, fake login

const commentInput = document.querySelector(".comment-input");
const commentBtn = document.querySelector(".comment-btn");
const commentContainer = document.querySelector(".comments");
const commentApp = document.querySelector(".comment-app");
const totalNumberOfComments = document.querySelector(
  ".total-number-of-comments"
);
const sortComments = document.querySelector(".sort-comments");
let frozenCurrentCommentIndexes;
const displayComments = function (comms, sort = undefined) {
  totalNumberOfComments.textContent = "0 comments";
  commentContainer.innerHTML = "";

  //getting the new sorted index based on the likes
  let newCommentMap = new Map();
  let commentsObject;
  comms.likes.forEach((com, i) => {
    newCommentMap.set(`newIndex-${i}`, {
      comLikes: com,
      comDislikes: comms.dislikes[i],
    });
    commentsObject = [...newCommentMap.entries()];
  });
  const nonSortedIndexes = [...newCommentMap.entries()].map((a, i) => i);

  let sortedIndexes;

  //creating the array of sorted indexes and stop updating them when you click the sort button
  if (sort === false) {
    sortedIndexes = commentsObject
      ?.sort(
        (a, b) =>
          b[1].comLikes.length -
          b[1].comDislikes.length -
          (a[1].comLikes.length - a[1].comDislikes.length)
      )
      .flat()
      .filter((el) => typeof el === "string")
      .map((newIndex) => +newIndex.split("-")[1]);
    frozenCurrentCommentIndexes = sortedIndexes?.slice();
  } else {
    sortedIndexes = frozenCurrentCommentIndexes
      ? frozenCurrentCommentIndexes
      : [];
  }
  console.log(commentsObject);
  // sorting the comments if the parameter is true, otherwise show comments non-ordered.
  const images1 = sort
    ? sortedIndexes.slice().map((a) => comms.images[a])
    : nonSortedIndexes.slice().map((a) => comms.images[a]);

  const users1 = sort
    ? sortedIndexes.slice().map((a) => comms.users[a])
    : nonSortedIndexes.slice().map((a) => comms.users[a]);

  const texts1 = sort
    ? sortedIndexes.slice().map((a) => comms.texts[a])
    : nonSortedIndexes.slice().map((a) => comms.texts[a]);

  const likes1 = sort
    ? sortedIndexes.slice().map((a) => comms.likes[a])
    : nonSortedIndexes.slice().map((a) => comms.likes[a]);

  const dislikes1 = sort
    ? sortedIndexes.slice().map((a) => comms.dislikes[a])
    : nonSortedIndexes.slice().map((a) => comms.dislikes[a]);

  const commentDatesArray1 = sort
    ? sortedIndexes.slice().map((a) => comms.commentDatesArray[a])
    : nonSortedIndexes.slice().map((a) => comms.commentDatesArray[a]);

  const replyLikes1 = sort
    ? sortedIndexes.slice().map((a) => comms.replyLikes[a])
    : nonSortedIndexes.slice().map((a) => comms.replyLikes[a]);

  const replyDislikes1 = sort
    ? sortedIndexes.slice().map((a) => comms.replyDislikes[a])
    : nonSortedIndexes.slice().map((a) => comms.replyDislikes[a]);

  const replies1 = sort
    ? sortedIndexes.slice().map((a) => comms.replies[a])
    : nonSortedIndexes.slice().map((a) => comms.replies[a]);

  //defining the number of length
  let numberOfComments = replies1.length;
  let numberOfReplies = 0;

  // Calculate and display the number of comments
  for (let i = texts1.length - 1; i >= 0; i--) {
    numberOfReplies += replies1[i].texts.length;
    totalNumberOfComments.textContent = `${
      numberOfComments + numberOfReplies
    } comments`;

    //defining time
    const date = new Date(commentDatesArray1[i]);
    const minute = `${date.getMinutes()}`.padStart(2, 0);
    const hour = `${date.getHours()}`.padStart(2, 0);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = `${date.getFullYear()}`;
    const displayDate = `${day}.${month}.${year} at ${hour}:${minute}`;

    const html = `
      <div id="comment-${i}" class="comment-div">
            <span class="delete-comment"><button><i class="las la-trash"></i></button></span>
            <img src="${images1[i]}" alt="" />
        <div class="comment-content">
            <h2 class="inline-block">${users1[i]}</h2>
            <a class="comment-date" href="#">${displayDate}</a>
          <p class="all-comment-paragraphs">${texts1[i]}</p>
          <div class="likes">
            <span class="like-btns like">${
              !likes1[i].includes(currentAccount?.user) ? "👍" : "👍🏾"
            }</span> 
            <span>${likes1[i].length - dislikes1[i].length}</span> 
            <span class="like-btns dislike">${
              !dislikes1[i].includes(currentAccount?.user) ? "👎" : "👎🏾"
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
            replies1[i].texts.length === 0 ? "collapse" : ""
          }">${replies1[i].opened ? "🔺 Hide" : "🔻 Show"} ${
      replies1[i].texts.length
    } replies</span>
   <div class="replies ${replies1[i].opened === false ? `collapse` : ``}">
    ${replies1[i].texts
      .map((_, j) => {
        const replyDate = new Date(replies1[i].replyDatesArray[j]);
        const replyMinute = `${replyDate.getMinutes()}`.padStart(2, 0);
        const replyHour = `${replyDate.getHours()}`.padStart(2, 0);
        const replyDay = `${replyDate.getDate()}`.padStart(2, 0);
        const replyMonth = `${replyDate.getMonth() + 1}`.padStart(2, 0);
        const replyYear = `${replyDate.getFullYear()}`;
        const displayDate = `${replyDay}.${replyMonth}.${replyYear} at ${replyHour}:${replyMinute}`;

        return `<div id="comment-${i}-reply-${j}" class="reply-div">
        

                      <img class="reply-img" src=${
                        replies1[i].images[j]
                      } alt="" />
                      <div class="reply-content">
                      <h4 class="inline-block">${replies1[i].users[j]}</h4>
                      <a class="comment-date" href="#">${displayDate}</a>
                      <p class="all-comment-paragraphs">${
                        replies1[i].texts[j]
                      }</p>

                      <div class="likes">
            <span class="reply-like-btns reply-like">${
              !replyLikes1[i][j].includes(currentAccount?.user) ? "👍" : "👍🏾"
            }</span> 
            <span>${
              replyLikes1[i][j].length - replyDislikes1[i][j].length
            }</span> 
            <span class="reply-like-btns reply-dislike">${
              !replyDislikes1[i][j].includes(currentAccount?.user) ? "👎" : "👎🏾"
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
  //Defining selectors
  const replyBtn = document.querySelectorAll(".reply-btn");
  const inputReply = document.querySelectorAll(".input-reply");
  const sendReplyBtn = document.querySelectorAll(".send-reply-btn");
  // const replyToReplyBtn = document.querySelectorAll(".reply-to-reply-btn");
  const showRepliesBtn = document.querySelectorAll(".show-replies-btn");
  // const commentDiv = document.querySelectorAll(".comment-div");
  // const replyDiv = document.querySelectorAll(".reply-div");
  const replies = document.querySelectorAll(".replies");
  const addReplyDiv = document.querySelectorAll(".add-reply-div ");
  const cancelReplyBtn = document.querySelectorAll(".cancel-reply-btn");
  const cancelCommentBtn = document.querySelector(".cancel-comment-btn");
  const deleteComment = document.querySelectorAll(".delete-comment");

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

  sendReplyBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      //getting ID of the parent
      let commentID = btn.closest(".comment-div").id.split("-")[1];

      let replyingTo = btn.parentElement.parentElement.children[0].textContent;
      console.log(replyingTo.length);

      if (currentAccount === undefined) {
        alert("You are not logged in!");
      } else {
        //if reply doesn't contain only spaces and/or username, the input won't count as empty
        if (
          inputReply[i].textContent.trim().length -
            (inputReply[i].children[0]?.children[0]?.textContent.length
              ? replyingTo.length + 1
              : 0) >
          0
        ) {
          //adding the current reply date to the reply array
          replies1[commentID].replyDatesArray.push([new Date().toISOString()]);
          //adding reply data to the replies array
          replies1[commentID].users.push(currentAccount.user);
          //if tag not removed, make a href link of it, otherwise just show the text
          replies1[commentID].texts.push(
            inputReply[i].children[0]?.children[0]?.textContent
              ? `<a href="#" class="reply-tag-href">@${replyingTo}</a> ${inputReply[
                  i
                ].textContent
                  .split(replyingTo)[1]
                  .trim()}`
              : inputReply[i].textContent
          );
          replies1[commentID].images.push(currentAccount.image);
          replyLikes1[commentID].push([]);
          replyDislikes1[commentID].push([]);
          //open replies section after adding comment
          replies1[commentID].opened = true;
          updateUI();
        }
      }
    });
  });

  showRepliesBtn.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      replies1[i].opened = !replies1[i].opened;

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
      const currentLikeIndex = likes1[i].indexOf(currentAccount.user);
      const currentDislikeIndex = dislikes1[i].indexOf(currentAccount.user);

      if (btn.classList.contains("like")) {
        if (!likes1[i].includes(currentAccount.user)) {
          likes1[i].unshift(currentAccount.user);
          if (dislikes1[i].includes(currentAccount.user)) {
            dislikes1[i].splice(currentDislikeIndex, 1);
          }
        } else {
          likes1[i].splice(currentLikeIndex, 1);
        }
      } else if (btn.classList.contains("dislike")) {
        if (!dislikes1[i].includes(currentAccount.user)) {
          dislikes1[i].unshift(currentAccount.user);
          if (likes1[i].includes(currentAccount.user)) {
            likes1[i].splice(currentLikeIndex, 1);
          }
        } else {
          dislikes1[i].splice(currentDislikeIndex, 1);
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
      const currentLikeIndex = replyLikes1
        .flat()
        [i].indexOf(currentAccount.user);
      const currentDislikeIndex = replyDislikes1
        .flat()
        [i].indexOf(currentAccount.user);

      if (btn.classList.contains("reply-like")) {
        if (!replyLikes1.flat()[i].includes(currentAccount.user)) {
          replyLikes1.flat()[i].unshift(currentAccount.user);
          if (replyDislikes1.flat()[i].includes(currentAccount.user)) {
            replyDislikes1.flat()[i].splice(currentDislikeIndex, 1);
          }
        } else {
          replyLikes1.flat()[i].splice(currentLikeIndex, 1);
        }
      } else if (btn.classList.contains("reply-dislike")) {
        if (!replyDislikes1.flat()[i].includes(currentAccount.user)) {
          replyDislikes1.flat()[i].unshift(currentAccount.user);
          if (replyLikes1.flat()[i].includes(currentAccount.user)) {
            replyLikes1.flat()[i].splice(currentLikeIndex, 1);
          }
        } else {
          replyDislikes1.flat()[i].splice(currentDislikeIndex, 1);
        }
      }

      updateUI();
    });
  });
  //deleting comments
  let arr = sort ? Array.from(deleteComment).reverse() : deleteComment;

  arr.forEach((item, i) => {
    item.addEventListener("click", function (e) {
      sorted = false;

      const deleteCommentFunc = function () {
        comms.users.splice(i, 1);
        comms.commentDatesArray.splice(i, 1);
        comms.texts.splice(i, 1);
        comms.images.splice(i, 1);
        comms.likes.splice(i, 1);
        comms.dislikes.splice(i, 1);
        comms.replies.splice(i, 1);
        comms.replyLikes.splice(i, 1);
        comms.replyDislikes.splice(i, 1);
        updateUI();
      };
      deleteCommentFunc();

      if (sort) {
        sorted = true;
        updateUI();
      }
    });
  });
};

//switch and update the sorted variable each time you click the sort button
let sorted = false;

sortComments.addEventListener("click", function (e) {
  displayComments(comments, !sorted);
  sorted = !sorted;
  if (
    sortComments.innerHTML.includes(`<i class="las la-sort-amount-down"></i>`)
  ) {
    sortComments.innerHTML = `<i class="las la-sort-amount-down-alt"></i> UNSORT`;
  } else {
    sortComments.innerHTML = `<i class="las la-sort-amount-down"></i> SORT`;
  }
});

commentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //function for adding the main comments
  const commentBtnFunc = function () {
    if (currentAccount === undefined) {
      alert("You are not logged in!");
    } else if (commentInput.textContent.trim().length !== 0) {
      //add comment date
      comments.commentDatesArray.unshift(new Date().toISOString());

      comments.users.unshift(currentAccount.user);
      comments.texts.unshift(commentInput.textContent);
      commentInput.textContent = "";
      comments.images.unshift(currentAccount.image);
      comments.likes.unshift([]);
      comments.dislikes.unshift([]);
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
  };
  //if comments are sorted, unsort them to add a comment than sort it back
  if (sorted === true) {
    sorted = false;
    commentBtnFunc();
    sorted = true;
    updateUI();
  } else {
    commentBtnFunc();
  }
});
const commentImg = document.querySelector(".comment-img");

//LOGIN
//Defining selectors
const loginFields = document.querySelector(".login-fields");
const loginBtn = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const labelWelcome = document.querySelector(".welcome");
const replyImg = document.querySelectorAll(".reply-img");
const logoutBtn = document.querySelector(".logout-btn");
const ghostModeBtn = document.querySelector(".ghost-mode-btn");

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
  displayComments(comments, sorted);

  currentAccount
    ? (commentImg.src = currentAccount.image)
    : (commentImg.src = "https://logodix.com/logo/1727545.png");
};
updateUI();

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
    //turn off the sorting when you log in to another account
    displayComments(comments, (sorted = false));
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
const inputReply = document.querySelectorAll(".input-reply");
const addComment = document.querySelector(".add-comment");
const replyBtn = document.querySelectorAll(".reply-btn");
const userModeBtn = document.querySelector(".user-mode-btn");
ghostModeBtn.addEventListener("click", function (e) {
  e.preventDefault;
  loginFields.classList.add("collapse");
  commentApp.classList.remove("collapse");
  userModeBtn.classList.remove("collapse");

  labelWelcome.textContent =
    "Welcome! You have to log in in order to be able to comment.";
});

userModeBtn.addEventListener("click", function () {
  loginFields.classList.remove("collapse");
  commentApp.classList.add("collapse");
  userModeBtn.classList.add("collapse");

  labelWelcome.textContent = "";
});

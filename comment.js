document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.querySelector("#submitComment");
  const commentInput = document.querySelector("#commentInput");
  const commentContainer = document.querySelector("#commentsContainer");

  submitBtn.addEventListener("click", function () {
    const mainCommentInputValue = commentInput.value;
    if (mainCommentInputValue) {
      addComment(mainCommentInputValue);
      commentInput.value = "";
    }
  });

  function addComment(comment) {
    const divEl = document.createElement("div");
    divEl.className = "repliesContainer";
    divEl.innerHTML = `
            <p>${comment}</p>
            <span class="mt-1 toggleComments" data-expanded="false" style="display:none;">
                <svg class="toggleIcon" stroke="rgb(29 78 216/1)" fill="rgb(29 78 216/1)" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path class="upArrow" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                </svg>
            </span>
            <a class="replyBtn">Reply</a>
            <textarea class="replyInput" placeholder="Write a reply..." style="display:none;"></textarea>
            <button class="replyCommentBtn" style="display:none;">Reply</button>
        `;
    commentContainer.appendChild(divEl);
  }

  commentContainer.addEventListener("click", function (e) {
    const currentElem = e.target;

    if (currentElem && currentElem.classList.contains("replyBtn")) {
      const parentComment = currentElem.parentElement;
      const replyInput = parentComment.querySelector(".replyInput");
      const postReply = parentComment.querySelector(".replyCommentBtn");
      replyInput.style.display = "block";
      postReply.style.display = "block";
    }
    if (currentElem && currentElem.classList.contains("replyCommentBtn")) {
      const parentComment = currentElem.parentElement;
      const replyInput = parentComment.querySelector(".replyInput");
      const replyText = replyInput.value;
      const toggleCommentsEl = parentComment.querySelector(".toggleComments");
      if (replyText) {
        addReply(parentComment, replyText);
        toggleCommentsEl.style.display = 'block';
        replyInput.value = "";
      }
    }
    
    if (
      currentElem &&
      (currentElem.classList.contains("toggleComments") ||
        currentElem.closest(".toggleComments"))
    ) {
      const toggleContainer = currentElem.closest(".toggleComments");
      const parentEl = toggleContainer.parentElement;
      const innerChildEl = parentEl.querySelector('.repliesContainer');
            
      const isExpanded = toggleContainer.getAttribute('data-expanded') === "true";

      if (isExpanded) {
        toggleContainer.setAttribute("data-expanded", "false");
        toggleContainer.innerHTML = `
            <svg class="toggleIcon" stroke="rgb(29 78 216/1)" fill="rgb(29 78 216/1)" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path class="downArrow" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path>
            </svg>`;
          if(innerChildEl) {
            innerChildEl.style.display = 'none';
          }
      } else {
        toggleContainer.setAttribute("data-expanded", "true");
        toggleContainer.innerHTML = `
            <svg class="toggleIcon" stroke="rgb(29 78 216/1)" fill="rgb(29 78 216/1)" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path class="upArrow" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
            </svg>`;
            if(innerChildEl) {
              innerChildEl.style.display = 'block';
            }
      }
    }
  });
});

function addReply(parentComment, replyText) {
  const divEl = document.createElement("div");
  divEl.className = "repliesContainer";
  divEl.innerHTML = `
            <p>${replyText}</p>
            <span class="mt-1 toggleComments" data-expanded="false" style="display:none;">
                <svg class="toggleIcon" stroke="rgb(29 78 216/1)" fill="rgb(29 78 216/1)" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path class="upArrow" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                </svg>
            </span>
            <a class="replyBtn">Reply</a>
            <textarea class="replyInput" placeholder="Write a reply..." style="display:none;"></textarea>
            <button class="replyCommentBtn" style="display:none;">Reply</button>
        `;
  parentComment.appendChild(divEl);
}

const addComment = document.querySelector('.comments-content button');
const commentsContent = document.querySelector('.comments-content');
const commentformWrapper = document.querySelector('.comment-form-wrapper');
const submitComment = document.querySelector('.comment-form button');
const commentContent = document.querySelector('.comment-form textarea');

//Get the data from the user input and fetch the backend api for creating a new comment.
const addCommentHundler = async (e) => {
  e.preventDefault();
  const content = commentContent.value.trim();
  const blogId = submitComment.dataset.blogid;
  console.log(blogId);
  if (content) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, blogId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to comment.');
      }
    } catch (e) {
      alert('Failed to comment.');
    }
  } else {
    alert('Fill out the form.');
  }
};

addComment.addEventListener('click', () => {
  commentsContent.classList.add('hide');
  commentformWrapper.classList.remove('hide');
});

submitComment.addEventListener('click', addCommentHundler);

const commentFormHandler = async function (event) {
 
  event.preventDefault();

  const blogId = document.querySelector('input[name="blog-id"]').value;
 
  const body = document.querySelector('textarea[name="comment-content"]').value;

  if (body) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        blogId,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);
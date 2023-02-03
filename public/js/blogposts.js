const newFormHandler = async function (event) {
 
 
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value.trim();
  
  const body = document
    .querySelector('textarea[name="blog-body"]')
    .value.trim();

  const response = await fetch(`/api/blog`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
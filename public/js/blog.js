const createBlogHandler = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();
  if (title && content) {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create.');
      }
    } catch (e) {
      alert('Failed to create.');
    }
  }
};


const updateBlogHandler = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();
  if (title && content) {
    try {
      const response = await fetch('/api/blogs', {
        method: 'PUT',
        body: JSON.stringify({ title, content, id: 2 }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to update.');
      }
    } catch (e) {
      alert('Failed to update.');
    }
  }
};


const deleteBlogHandler = async () => {
  try {
    const response = await fetch('/api/blog', {
      method: 'DELETE',
      body: JSON.stringify({id: 2 }),
      headers: { 'Content-Type': 'application/json' },
    });
console.log(response)
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete.');
    }
  } catch (e) {
    alert('Failed to delete.');
  }
}

document
  .querySelector('#create-blog')
  .addEventListener('click', createBlogHandler);

document
  .querySelector('#update-blog')
  .addEventListener('click', updateBlogHandler);

document
  .querySelector('#delete-blog')
  .addEventListener('click', deleteBlogHandler);

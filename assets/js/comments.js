// This assumes the 'post.html' template has rendered the PR number into a global variable or a data attribute.
// To do this cleanly, add this script tag to _layouts/post.html instead of linking a file:
// <script>
//   const REPO_NAME = 'YOUR_USERNAME/YOUR_REPO';
//   const PR_NUMBER = {{ page.pr_number }};
// </script>
// <script src="/assets/js/comments.js"></script>

document.addEventListener('DOMContentLoaded', function() {
  if (typeof PR_NUMBER === 'undefined') {
    return; // Don't run on pages without a PR number
  }

  const commentsContainer = document.getElementById('comments-container');
  const GITHUB_API_URL = `https://api.github.com/repos/${REPO_NAME}/issues/${PR_NUMBER}/comments`;

  commentsContainer.innerHTML = '<p>Loading comments...</p>';

  fetch(GITHUB_API_URL)
    .then(response => response.json())
    .then(comments => {
      if (comments.length === 0) {
        commentsContainer.innerHTML = '<p>No comments yet. Be the first to leave one!</p>';
        return;
      }

      let commentsHTML = '';
      // We use a Markdown parsing library to render comment bodies correctly
      // You would need to include this library, e.g. 'marked.js'
      comments.forEach(comment => {
        const commentBody = comment.body;
        const commentDate = new Date(comment.created_at).toLocaleString();

        commentsHTML += `
          <div class="comment">
            <div class="comment-header">
              <img src="${comment.user.avatar_url}" alt="${comment.user.login}" width="30" height="30">
              <strong>${comment.user.login}</strong> commented on ${commentDate}
            </div>
            <div class="comment-body">
              ${commentBody}
            </div>
          </div>
        `;
      });
      commentsContainer.innerHTML = commentsHTML;
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
      commentsContainer.innerHTML = '<p>Could not load comments.</p>';
    });
});
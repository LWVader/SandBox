const btn = document.getElementById('sendButton');

btn.addEventListener('click', function() {
  // 1. Prevent double-clicks during animation
  if (this.classList.contains('is-sent')) return;

  // 2. Add the class to trigger the plane flight and state change
  this.classList.add('is-sent');
  
  // 3. Reset the button after the animation cycle (3-4 seconds)
  setTimeout(() => {
    this.classList.remove('is-sent');
  }, 4000);
});
// SPA Fallback Handler
(function() {
  // Check if the current path is not a file
  var path = window.location.pathname;
  var isFile = /\.(html|css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i.test(path);
  
  if (!isFile && path !== '/') {
    // Redirect to index.html for SPA routing
    window.location.href = '/';
  }
})(); 
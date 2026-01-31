let progress = 0;
  const progressText = document.getElementById("progress");

  const interval = setInterval(() => {
    progress++;
    progressText.innerText = `Loading ${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      progressText.innerText = "Loaded ";
      window.location.href = "index.html";
    }
  }, 100); 
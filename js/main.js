fetch("data/stories.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("story-list");
    data.stories.forEach(story => {
      const div = document.createElement("div");
      div.innerHTML = `<a href="story.html?title=${encodeURIComponent(story.title)}">${story.title}</a>`;
      container.appendChild(div);
    });
  });

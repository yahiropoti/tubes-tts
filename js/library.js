fetch("data/stories.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("library-list");
    data.stories.forEach(story => {
      const div = document.createElement("div");
      div.className = "story-card";
      div.innerHTML = `
        <h3>${story.title}</h3>
        <button onclick="location.href='reader.html?file=${encodeURIComponent(story.file)}'">Baca Disini</button>
      `;
      container.appendChild(div);
    });
  });

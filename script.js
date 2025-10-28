(function () {
  const example = document.getElementById("example");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const cw4 = document.getElementById("cw4");
  const answer = document.getElementById("answer");

  example.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      });
  });

  cw1.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts)
        let html = "<ul>";

        posts.forEach((post) => {
          html += `
          <li>
            <strong>${post.title}</strong><br>
            <em>${post.body}</em>
          </li>
        `;
        });

        html += "</ul>";

        answer.innerHTML = html;
      })
      .catch(err);
  });

  cw2.addEventListener("click", function () {
    answer.innerHTML = "Loading...";

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((posts) => {
          console.log(posts)
          let html = "<ul>";

          posts.forEach((post) => {
            html += `
          <li>
            <strong>${post.title}</strong><br>
            <em>${post.body}</em>
          </li>
        `;
          });

          html += "</ul>";

          answer.innerHTML = html;
        })
        .catch((err) => console.log(err));
    }, 1000);
  });

  cw3.addEventListener("click", function () {
    answer.innerHTML = "Loading...";

    post_id = document.getElementById("post_id").value;

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts/" + post_id)
        .then((response) => response.json())
        .then((post) => {
          console.log(post)
          console.log(post.title)
          let html = "<div>";
          html += `
            <h1>${post.title}</h1><br>
            <p>${post.body}</p>
        `;
          html += "</div>";

          answer.innerHTML = html;
        })
        .catch((err) => console.log(err));
    }, 1000);
  });

  cw4.addEventListener("click", async () => {
    answer.innerHTML = "Processing...";

    try {
      const newPost = {
        title: document.getElementById("post_title").value,
        body: document.getElementById("post_body").value,
        userId: 1,
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      const data = await response.json();
      answer.innerHTML = `Dodano nowy post o ID = ${data.id}`;
    } catch (err) {
      answer.innerHTML = `Wystąpił błąd: ${err.message}`;
    }
  });
})();


const button = document.querySelector(".button");
const topScores = document.querySelector(".top-scores");

db.collection("users")
  .get()
  .then(data => {
    const allUserScores = [];
    data.docs.forEach(doc => {
      let score = doc.data();
      allUserScores.push(score);
      allUserScores.sort(function (a, b) {
        return b.highscore - a.highscore;
      });
    });
    document.querySelector(".top-scores").innerHTML = 
      `1 - ${allUserScores[0].username}: ${allUserScores[0].highscore}<br/> 

       2 - ${allUserScores[1].username}: ${allUserScores[1].highscore}<br/>
       
       3 - ${allUserScores[2].username}: ${allUserScores[2].highscore}`;
});

button.addEventListener("click", () => {
  let name = document.querySelector(".user-name");
  if (!name) {
    return;
  }

  name = name.value.toString();
  let score = document.querySelector(".score").innerHTML;
  db.collection("users")
    .get()
    .then(data => {
      const allUserNames = [];
      data.docs.forEach(doc => {
        let name = doc.data().userName;
        allUserNames.push(name);
      });

      if (!allUserNames.includes(name)) {
        db.collection("users").add({
          userName: name,
          highScore: score
        });
      } else {
        console.error(`the username ${name} already exists`);
      }
    });
});


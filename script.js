//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

const container = document.getElementById("images");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const heading = document.getElementById("h");
const para = document.getElementById("para");

const message =
  "Please click on the identical tiles to verify that you are not a robot.";

let selected = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const duplicate =
  imageClasses[Math.floor(Math.random() * imageClasses.length)];

const allImages = shuffle([...imageClasses, duplicate]);

allImages.forEach((className) => {
  const img = document.createElement("img");

  // Use the exact classes defined in styles.css
  img.classList.add(className);
  img.dataset.image = className;

  img.addEventListener("click", () => {
    if (selected.length >= 2 || selected.includes(img)) return;

    selected.push(img);
    img.classList.add("selected");

    reset.style.display = "inline-block";
    verify.style.display =
      selected.length === 2 ? "inline-block" : "none";

    para.textContent = "";
  });

  container.appendChild(img);
});

verify.addEventListener("click", () => {
  if (selected.length !== 2) return;

  if (selected[0].dataset.image === selected[1].dataset.image) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verify.style.display = "none";
});

reset.addEventListener("click", () => {
  selected.forEach((img) => img.classList.remove("selected"));

  selected = [];
  reset.style.display = "none";
  verify.style.display = "none";

  heading.textContent = message;
  para.textContent = "";
});
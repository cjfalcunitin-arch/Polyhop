export function showLoading(container) {
  const wrapper = document.createElement("div");
  styleCenter(wrapper);

  const title = document.createElement("div");
  title.textContent = "LOADING.JS";
  title.style.marginBottom = "10px";

  const counter = document.createElement("div");
  counter.style.fontSize = "20px";

  wrapper.appendChild(title);
  wrapper.appendChild(counter);
  container.appendChild(wrapper);

  let count = 100;

  // random duration between 1s and 3s
  const totalDuration = Math.random() * 2000 + 1000;
  const intervalTime = totalDuration / 100;

  counter.textContent = count;

  const interval = setInterval(() => {
    count--;

    // random fast jumps
    if (Math.random() > 0.7) {
      count -= Math.floor(Math.random() * 3);
    }

    if (count <= 1) {
      counter.textContent = "1";
      clearInterval(interval);
      return;
    }

    counter.textContent = count;
  }, intervalTime);
}

function styleCenter(el) {
  el.style.height = "100vh";
  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
  el.style.fontSize = "32px";
  el.style.fontWeight = "bold";
}

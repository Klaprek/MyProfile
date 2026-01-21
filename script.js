async function loadIncludes() {
  const includeElements = document.querySelectorAll("[data-include]");
  const includeJobs = Array.from(includeElements, async (element) => {
    const path = element.getAttribute("data-include");
    const mode = element.getAttribute("data-include-mode");

    if (!path) {
      return;
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
      }

      const html = await response.text();
      if (mode === "replace") {
        element.outerHTML = html;
      } else {
        element.innerHTML = html;
      }
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.all(includeJobs);
}

function setActiveNav() {
  const path = window.location.pathname;
  let current = path.split("/").pop();
  if (!current) {
    current = "index.html";
  }

  const aliasMap = {
    "project-quran.html": "project.html",
    "project-mancala.html": "project.html",
  };

  if (aliasMap[current]) {
    current = aliasMap[current];
  }

  const navLinks = document.querySelectorAll(".list-nav a, .sidebar-nav a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const normalized = href.split("?")[0].split("#")[0];
    link.classList.toggle("active", normalized === current);
  });
}

function initCopyEmail() {
  const tombolSalin = document.getElementById("copy-email");
  if (!tombolSalin) {
    return;
  }

  tombolSalin.addEventListener("click", () => {
    const email = "aprissupandi@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert("Email berhasil disalin ke clipboard!");
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      });
  });
}

function initSidebar() {
  const hamburger = document.querySelector(".humberger");
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector(".close-btn");
  const backdrop = document.querySelector(".backdrop");

  if (!hamburger || !sidebar || !closeBtn || !backdrop) {
    return;
  }

  hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
    backdrop.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    backdrop.classList.remove("active");
  });

  backdrop.addEventListener("click", () => {
    sidebar.classList.remove("active");
    backdrop.classList.remove("active");
  });

  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
      backdrop.classList.remove("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadIncludes();
  setActiveNav();
  initCopyEmail();
  initSidebar();
});

function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_8iyw7d3", "template_vsuzao7", parms)
    .then(function (response) {
      alert("Email send");
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch(function (error) {
      alert("Can't send email. try again!");
      console.error("FAILED...", error);
    });
}

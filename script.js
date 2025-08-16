document.addEventListener("DOMContentLoaded", function () {
  const tombolSalin = document.getElementById("copy-email");

  tombolSalin.addEventListener("click", function () {
    const email = "aprissupandi@email.com";
    navigator.clipboard.writeText(email)
      .then(() => {
        alert("Email berhasil disalin ke clipboard!");
      })
      .catch(err => {
        console.error("Gagal menyalin: ", err);
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.humberger');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');
  const backdrop = document.querySelector('.backdrop');

  hamburger.addEventListener('click', () => {
      sidebar.classList.add('active');
      backdrop.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
      backdrop.classList.remove('active');
  });

  backdrop.addEventListener('click', () => {
      sidebar.classList.remove('active');
      backdrop.classList.remove('active');
  });

  // Optional: Close sidebar when clicking a menu item
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
          sidebar.classList.remove('active');
          backdrop.classList.remove('active');
      });
  });
});

function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_8iyw7d3", "template_vsuzao7", parms)
    .then(function(response) {
      alert("Email send");
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch(function(error) {
      alert("Can't send email. try again!");
      console.error("FAILED...", error);
    });
}

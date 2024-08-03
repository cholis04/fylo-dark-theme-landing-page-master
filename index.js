document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[type="email"]');
  const joinButton = document.querySelector('a[href="#"]');
  const form = document.querySelector("form");

  // Disable the button initially
  joinButton.style.pointerEvents = "none";
  joinButton.style.opacity = "0.5";

  emailInput.addEventListener("input", () => {
    const email = emailInput.value;
    function validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    }
    if (validateEmail(email)) {
      joinButton.style.pointerEvents = "auto";
      joinButton.style.opacity = "1";
    } else {
      joinButton.style.pointerEvents = "none";
      joinButton.style.opacity = "0.5";
    }
  });

  joinButton.addEventListener("click", (event) => {
    event.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const email = emailInput.value;
    const referralLink = localStorage.getItem("referral_link");
    function validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    }
    // Validate input
    if (
      !name ||
      !email ||
      //  || !email.includes(".edu")
      !validateEmail(email)
    ) {
      alert("Please enter a valid name and email.");
      return;
    }

    const data = {
      first_name: name,
      email: email,
      waitlist_id: 19151,
      referral_link: referralLink,
    };
    fetch("https://api.getwaitlist.com/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "success.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting your request. Please try again.");
      });
  });
});

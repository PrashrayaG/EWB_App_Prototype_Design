document.addEventListener("DOMContentLoaded", () => {
  // Show SPLASH first
  showScreen("splashScreen");
});

/** Hide all screens, show the chosen ID */
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((scr) => (scr.style.display = "none"));
  document.getElementById(screenId).style.display = "block";

  // Initialize charts when showing the Progress screen
  if (screenId === "progressScreen") {
    initializeMoodChart();
  }

  // Reset form fields when navigating away
  if (screenId !== "loginScreen") {
    resetLoginForm();
  }
  if (screenId !== "signUpScreen") {
    resetSignUpForm();
  }
  if (screenId !== "moodScreen") {
    resetMoodForm();
  }
}

/* BASIC NAVIGATION */
function goToLogin() {
  showScreen("loginScreen");
}

function goToSignUp() {
  showScreen("signUpScreen");
}

function goToDashboard() {
  showScreen("dashboardScreen");
}

function goToMood() {
  showScreen("moodScreen");
}

function goToExercises() {
  showScreen("exercisesScreen");
}

function goToProgress() {
  showScreen("progressScreen");
}

function goToSettings() {
  showScreen("settingsScreen");
  closeDrawer();
}

function goToProfile() {
  showScreen("profileScreen");
  closeDrawer();
}

function goToFavorites() {
  showScreen("favoritesScreen");
  closeDrawer();
}

function logOut() {
  alert("Logging out...");
  closeDrawer();
  showScreen("loginScreen");
}

/* HAMBURGER DRAWER */
function openDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const overlay = document.getElementById("drawerOverlay");
  drawer.classList.add("open");
  overlay.style.display = "block";
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const overlay = document.getElementById("drawerOverlay");
  drawer.classList.remove("open");
  overlay.style.display = "none";
  drawer.setAttribute("aria-hidden", "true");
}

/* FORM HANDLERS */

/** Login Form Submission */
function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Show loading modal
  showLoadingModal();

  // Simulate authentication delay
  setTimeout(() => {
    closeLoadingModal();
    goToDashboard();
  }, 1500);
}

/** Sign-Up Form Submission */
function handleSignUp() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();
  const password = document.getElementById("signUpPassword").value.trim();

  if (fullName === "" || email === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Show loading modal
  showLoadingModal();

  // Simulate sign-up delay
  setTimeout(() => {
    closeLoadingModal();
    goToDashboard();
  }, 1500);
}

/** Mood Logging Form Submission */
function handleSaveEntry() {
  const moodRating = document.getElementById("moodRating").value;
  const reflection = document.getElementById("reflection").value.trim();

  if (reflection === "") {
    alert("Please enter your reflection.");
    return;
  }

  // Show loading modal
  showLoadingModal();

  // Simulate saving entry
  setTimeout(() => {
    closeLoadingModal();
    alert("Mood entry saved successfully!");
    goToDashboard();
  }, 1000);
}

/** Export Data */
function exportData() {
  alert("Exporting your data...");
  // Implement data export functionality here
}

/** Confirm Delete Account */
function confirmDeleteAccount() {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

/** Delete Account */
function deleteAccount() {
  // Close modal
  closeModal();
  // Show loading modal
  showLoadingModal();
  // Simulate account deletion
  setTimeout(() => {
    closeLoadingModal();
    alert("Your account has been deleted.");
    logOut();
  }, 2000);
}

/** Close Modal */
function closeModal() {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

/** Show Loading Modal */
function showLoadingModal() {
  const modal = document.getElementById("loadingModal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

/** Close Loading Modal */
function closeLoadingModal() {
  const modal = document.getElementById("loadingModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

/* CHARTS */
let moodChartInstance = null;

function initializeMoodChart() {
  const ctx = document.getElementById("moodChart").getContext("2d");

  // If a chart already exists, destroy it to prevent duplication
  if (moodChartInstance) {
    moodChartInstance.destroy();
  }

  // Sample data - replace with dynamic data as needed
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood Rating",
        data: [3, 4, 2, 5, 3, 4, 3],
        backgroundColor: "rgba(59, 177, 67, 0.6)",
        borderColor: "rgba(59, 177, 67, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Mood Rating",
        },
      },
      x: {
        title: {
          display: true,
          text: "Day of the Week",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Create the chart
  moodChartInstance = new Chart(ctx, {
    type: "bar", // You can change this to 'line', 'pie', etc.
    data: data,
    options: options,
  });
}

/* SLIDER VALUE DISPLAY */
const moodSlider = document.getElementById("moodRating");
const moodValue = document.getElementById("moodValue");

if (moodSlider && moodValue) {
  moodValue.textContent = moodSlider.value;
  moodSlider.addEventListener("input", () => {
    moodValue.textContent = moodSlider.value;
  });
}

/* FAVORITE EXERCISES HANDLERS */
function startFavoriteExercise(exerciseName) {
  alert(`Starting "${exerciseName}"...`);
  // Implement exercise start functionality here
}

/* VIEW MOOD LOG HANDLER */
function viewMoodLog(logName) {
  alert(`Viewing "${logName}"...`);
  // Implement mood log viewing functionality here
}

/* EDIT PROFILE */
function editProfile() {
  alert("Edit Profile functionality is not implemented yet.");
  // Implement profile editing functionality here
}

/* BEGIN EXERCISE */
function beginExercise(exerciseName) {
  alert(`Beginning "${exerciseName}"...`);
  // Implement exercise initiation functionality here
}

/* RESET FORM FIELDS */
function resetLoginForm() {
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
}

function resetSignUpForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpPassword").value = "";
}

function resetMoodForm() {
  document.getElementById("moodRating").value = "3";
  document.getElementById("moodValue").textContent = "3";
  document.getElementById("reflection").value = "";
}

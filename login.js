if(localStorage.getItem("loggedInUser")){
    window.location.href = "dashboard.html";
}

document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(username && password){

        localStorage.setItem(
            "loggedInUser",
            username
        );

        window.location.href =
        "dashboard.html";
    }
});
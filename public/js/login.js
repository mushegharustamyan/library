const form = document.getElementById("form") ; 
form.addEventListener("submit" , () => {
    const email = document.getElementById("email") ;
    const password = document.getElementById("password") ;

    const login = {
        email : email.value , 
        password : password.value
    }

    fetch("/auth/login" , {
        method : "POST" , 
        body : JSON.stringify(login) ,
        headers : {
            "Content-type" : "application/json"
        }
    }) 
    .then(res => res.json())
    .then(data => {
        const message = document.getElementById("message") ;
        if (data.status === "error") {
            message.style.display = "block"
            message.innerHTML = data.error
        } else {
            window.location.replace("/")
        }
    })
})
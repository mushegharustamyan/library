const form = document.getElementById("form") ; 
form.addEventListener("submit" , () => {
    const email = document.getElementById("email") ;
    const password = document.getElementById("password") ;
    const name = document.getElementById("name") ;
    const surname = document.getElementById("surname") ; 

    const register = {
        email : email.value , 
        password : password.value , 
        name : name.value , 
        surname : surname.value , 
    }

    fetch("/auth/register" , {
        method : "POST" , 
        body : JSON.stringify(register) ,
        headers : {
            "Content-type" : "application/json"
        }
    }) 
    .then(res => res.json())
    .then(data => {
        const message = document.getElementById("message") ;
        if (data.status === "error") {
            message.style.display = "block" ; 
            message.innerHTML = data.error ;
        } else {
            message.style.display = "block" ; 
            message.innerHTML = data.success ;
        }
    })
})
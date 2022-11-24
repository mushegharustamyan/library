class Book {
    constructor (data) {
        this.data = data ; 
        this.img = data.image ; 
        this.title = data.title ; 
        this.author = data.author ; 
        this.date = data.date ; 
        this.description = data.description ;
        this.$book = document.querySelector(".book_wrapper") ;
        this.$image = document.createElement("div") ;
        this.$authorAndTitle = document.createElement("p") ;
        this.$description = document.createElement("p") ; 
        this.$order = document.createElement("p") ; 
    }

    setingValues () {
        this.$image.style.backgroundImage = `url(${this.img})` ;
        this.$authorAndTitle.innerHTML = `${this.author} - ${this.title} (${this.date})` ;
        this.$description.innerHTML = this.description ;
        this.$order.innerHTML = "order book" ;
    }

    setingStyles () {
        this.$image.className = "book_img" ; 
        this.$authorAndTitle.className = "book_title" ; 
        this.$description.className = "book_description" ; 
        this.$order.className = "order" ;
    }

    appending () {
        this.$book.appendChild(this.$image) ; 
        const info = document.createElement("div") ;
        info.appendChild(this.$authorAndTitle) ; 
        info.appendChild(this.$description) ;
        info.appendChild(this.$order) ;
        info.className = "info" ; 
        this.$book.appendChild(info) ;
    }

    render () {
        this.setingValues() ; 
        this.setingStyles() ; 
        this.appending() ;
        this.addingEventListeners() ;
    }

    addingEventListeners () {
        this.$order.addEventListener("click" , () => {
            fetch("/order")
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.showMessage(data) ;
                }) 
        })

        this.$image.addEventListener("mouseenter" , () => {
            const box = document.createElement("div") ;
            const zoomImg = document.createElement("img") ;
            zoomImg.src = "../img/zoom.png" ;
            zoomImg.className = "zoom" ; 
            zoomImg.addEventListener("click" , () => {
                this.zoomImg() ;
            })
            box.className = "img_shadow" ;
            box.appendChild(zoomImg) ;
            this.$image.appendChild(box) ;
        })

        this.$image.addEventListener("mouseleave" , () => {
            this.$image.removeChild(this.$image.firstChild) ;
        })
    }

    addBlur () {
        const all = document.querySelectorAll(".section") ; 
        all.forEach((elem) => {
            elem.classList.toggle("blur")
        })
    }

    removeBlur() {
        const all = document.querySelectorAll(".section") ; 
        all.forEach((elem) => {
            elem.classList.remove("blur")
        })
    }

    zoomImg () {
        const zoomedImg = document.createElement("div") ; 
        const img = document.createElement("div") ;
        img.addEventListener("click" , () => {
            document.body.removeChild(zoomedImg) ; 
            this.removeBlur()
        })
        img.className = "img" ;
        zoomedImg.className = "zoomed_img" ;
        img.style.backgroundImage = `url(${this.img})` ;
        zoomedImg.appendChild(img) ;
        this.addBlur()
        document.body.appendChild(zoomedImg) ;
    }

    showMessage (response) {   
        if(response.loggedIn) {
            const message = document.createElement("div") ; 
            message.innerHTML = response.order ;
            message.className = "success" ;
            document.querySelector(".info").appendChild(message)
        } else {
            window.location.replace("/login")
        }
    }
}

fetch(`/api/books/${window.location.pathname.split("/")[2]}`)
.then(res => res.json())
.then(data => {
    const book = new Book(data)
    book.render() ;
})




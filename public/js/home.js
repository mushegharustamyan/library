const books = document.querySelector(".books_section_wrapper") ;    

class Book {
    constructor (data) {
        this.data = data ;
        this.id = data.id ; 
        this.title = data.title ;
        this.author = data.author ;
        this.img = data.image ;
        this.description = data.description ;
        this.$book = document.createElement("div") ;
        this.$image = document.createElement("div") ;
        this.$authorAndTitile = document.createElement("p") ;
        this.$linkToBook = document.createElement("a") ;
        this.$description = document.createElement("p") ;
    }

    setingValues () {
        this.$authorAndTitile.innerHTML = `${this.author} - ${this.title}` ;
        this.$book.id = this.id ;
        this.$linkToBook.href = `/book/${this.id}`;
        // this.$linkToBook.href = `/book`;
        this.$linkToBook.innerHTML = "more" ;
        this.$description.innerHTML = `${this.description.slice(0 , 100)}...` ;
    }

    setingStyles () {
        this.$authorAndTitile.className = "book_title" ;
        this.$image.style.backgroundImage = `url(${this.img})` ;
        this.$image.className = "book_img" ; 
        this.$book.className = "book" ;
        this.$linkToBook.className = "link_to_book" ;
        this.$description.className = "book_description" ;
    }

    append () {
        this.$book.appendChild(this.$image) ; 
        this.$book.appendChild(this.$authorAndTitile) ;
    }

    render() {
        this.setingValues() ; 
        this.setingStyles() ; 
        this.append() ;
        this.addingEventListeners() ;
        books.appendChild(this.$book) ;
    }

    addingEventListeners () {
        this.$image.addEventListener("mouseenter" , () => {
            this.$book.classList.add("book_mouse_on") ;
            this.$image.style.backgroundImage = "" ;
            this.$image.appendChild(this.$description) ; 
            this.$image.appendChild(this.$linkToBook) ;
        }) ;

        this.$image.addEventListener("mouseleave" , () => {
            this.$image.style.backgroundImage = `url(${this.img})` ;
            this.$book.classList.toggle("book_mouse_on") ;
            this.$image.innerHTML = "" ;
        }) ;
    }

}

class Search {
    constructor(data) {
        this.data = data ;
        this.$search = document.querySelector("#search") ; 
        this.$submit = document.querySelector(".search_button") ;
    }
}




fetch("/api/books")
    .then(data => data.json())
    .then(data => {
        const search = new Search(data)
        search.$submit.addEventListener("click" , () => {
            const filteredBooks = search.data.filter((value) => {
                return value.title.includes(search.$search.value) || value.author.includes(search.$search.value)
            })
            books.innerHTML = "" ;
            filteredBooks.forEach((value) => {
                const book = new Book (value) ;
                book.render()
            })
            console.log(filteredBooks) ;
        })
        data.forEach((value) => {
            const book = new Book (value) ;
            book.render() ;
        })
    })

    
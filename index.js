const container = document.querySelector('.container')
// all creates a node list thats similar to an array - you can manipulate it like an array
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value


// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
    console.log(movieIndex, moviePrice)
}

// update total and count 
function updateSelectedCount() {
    // this creates a nodelist(array) of selected seats - when you de-select a seat it is removed from the array
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    // copy selected seats into an array, map over array, return index of selected seat
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    // save to local storage - use stringify to convert seatindex
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
   

    // set length of array
    const selectedSeatsCount = selectedSeats.length
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
}

// get data from localstorage and populate UI
function populateUI() {
    // get array from storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    
    // if selected seats is empty loop through array and add classlist of selected to each selected seat
    // adds css color to selected seats saved to storage
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        }) 
    } 

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})
    

// seat click event
container.addEventListener('click', (e) => {
    if (
        // check if you click on an empty seat or occupied (class of seat or occupied)
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')
        ) {
        // when empty seat is selected - change to selected and add css color for selected
        // if you click it again it toggles it back to empty seat and changes the color back
        e.target.classList.toggle('selected')

        updateSelectedCount()
    }
})

// initiial count and total 
updateSelectedCount()
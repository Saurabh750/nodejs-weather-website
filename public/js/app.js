
//*******************************************************
// console.log('Client side javaScript file is loaded!')
//******************************************************* */



// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         }else {
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()           // prevents refreshing of browser
    
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
// Although method name is .json(), it converts JSON to js object
    console.log(location)
    fetch('/weather?address='+ (location)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageTwo.textContent = data.error
        }else {
            messageOne.textContent = data.location + '. ' + data.forecast
        }
    })
})
})
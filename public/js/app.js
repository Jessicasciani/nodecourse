console.log("Hello World")


const form = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('.p-1')
const messageTwo = document.querySelector('.p-2')

form.addEventListener("submit", (e) => {
  e.preventDefault()
  // console.log(search.value)
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      console.log(data)
      if (data.error) {
        messageOne.innerHTML = data.error
        messageTwo.innerHTML = ""
        console.log(data.error)
      } else {
        messageOne.innerHTML = data.forecast
        messageTwo.innerHTML = data.location
        console.log(data.forecast)
      }
    })
  })
})




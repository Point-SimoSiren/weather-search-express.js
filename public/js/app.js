


const weatherForm = document.querySelector('form')
const haku = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //ei lataa sivua uudelleen kuten oletuksena toimisi, vaan antaa tämän funktion ajaa itsensä.

    const haettava = haku.value;

    viesti1.textContent = 'Haetaan säädataa...'

    viesti2.textContent = ''

    fetch('/weather?address=' + haettava).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                viesti1.textContent = data.error
            } else {
                viesti1.textContent = data.location
                viesti2.textContent = data.weather
            }

        })
    })

})
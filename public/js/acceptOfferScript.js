// for updating

const viewForm = document.querySelector(".offer-response")

function offerSubmitHandler(event) {
    event.preventDefault()
    const status = this.value;
    const offerId = this.getAttribute('data-offer')
    fetch(`/api/offer/${offerId}`, {
        method: "PUT",
        body: JSON.stringify({
        status
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/userprofile');
        // otherwise, display the error
    } else {
        alert(response.statusText);
    }

}
const responseBtns = document.querySelectorAll('.offer-response')
for (let i = 0; i < responseBtns.length; i++) {
    responseBtns[i].addEventListener('click', offerSubmitHandler)}



// offerForm.addEventListener(".offer-response", offerSubmitHandler)

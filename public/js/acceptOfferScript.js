// for updating

const viewForm = document.getElementById("accept-offer")

function offerSubmitHandler(event) {
    event.preventDefault()
    const offerRequested = this.getAttribute("data-offer")
    const userRequested = this.getAttribute("data-user")
    const input = document.getElementById("input").value;
    fetch("/api/offer", {
        method: "PUT",
        body: JSON.stringify({
            service_offer_id: offerRequested,
            requested_id: userRequested,
            service_request_id: serviceRequested,
            service_offer_id: input
        }),
        headers: { 'Content-Type': 'application/json' }
    })



}

offerForm.addEventListener("submit", offerSubmitHandler)

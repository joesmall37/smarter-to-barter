const offerForm = document.getElementById("offer")

function offerSubmitHandler(event) {
    event.preventDefault()
    const serviceRequested = this.getAttribute("data-service")
    const userRequested = this.getAttribute("data-user")
    const input = document.getElementById("input").value
    fetch("/api/offer", {
        method: "POST",
        body: JSON.stringify({
            requested_id: userRequested,
            service_request_id: serviceRequested,
            service_offer_id: input
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}

offerForm.addEventListener("submit", offerSubmitHandler)

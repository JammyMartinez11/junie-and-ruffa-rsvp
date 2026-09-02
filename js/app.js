
// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const scriptURL =
    "https://script.google.com/macros/s/AKfycbxMqtO6Z1v9KqfzcdgPuGksFV5fBF6Xp6aogoWUlj0wE06SbNdFaxV9OWth84fbOOBO5w/exec";



// ==========================================
// SEARCH GUEST
// ==========================================

function searchGuest() {

    let inputName = document
        .getElementById("guestName")
        .value
        .trim();

    let result = document.getElementById("result");


    // ==========================================
    // EMPTY NAME
    // ==========================================

    if (!inputName) {

        result.innerHTML = `

            <div class="guest-card">

                <h3>
                    Please enter your name 💙
                </h3>

            </div>

        `;

        return;
    }



    // ==========================================
    // CHECK GUEST WITH GOOGLE APPS SCRIPT
    // ==========================================

    result.innerHTML = `

        <div class="guest-card">

            <h3>
                Checking your name... 💙
            </h3>

        </div>

    `;


    fetch(scriptURL, {

        method: "POST",

        body: JSON.stringify({

            name: inputName,

            action: "check"

        })

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Google Apps Script returned HTTP " + response.status
            );

        }

        return response.json();

    })

    .then(data => {

        console.log("Guest search result:", data);



        // ==========================================
        // NAME NOT FOUND
        // ==========================================

        if (data.status === "guest_not_found") {

            result.innerHTML = `

                <div class="guest-card">

                    <h3>
                        Name Not Found
                    </h3>

                    <p>
                        We could not find your name on our guest list.
                    </p>

                    <p>
                        For plus one requests or if you believe this is an error,
                        please contact:
                    </p>

                    <p>

                        <strong>
                        Clarisse B. Martinez
                        </strong>

                        <br>

                        RSVP Coordinator

                        <br>

                        <a href="tel:09755624427">
                        📞 0975 562 4427
                        </a>

                    </p>

                </div>

            `;

            return;
        }



        // ==========================================
        // MULTIPLE FIRST NAME MATCHES
        // ==========================================

        if (data.status === "multiple_matches") {

            result.innerHTML = `

                <div class="guest-card">

                    <h3>
                        Multiple Guests Found 💙
                    </h3>

                    <p>
                        We found more than one guest with that
                        first name.
                    </p>

                    <p>
                        Please enter your full name to continue.
                    </p>

                </div>

            `;

            return;
        }



        // ==========================================
        // ALREADY SUBMITTED
        // ==========================================

        if (data.status === "already_submitted") {

            result.innerHTML = `

                <div class="guest-card">

                    <h3>
                        Already Submitted 💙
                    </h3>

                    <p>
                        Hi ${data.name}, you have already submitted
                        your RSVP.
                    </p>

                    <p>
                        Your current response:

                        <strong>
                            ${
                                data.rsvp === "Yes"
                                ? "Attending"
                                : "Not Attending"
                            }
                        </strong>

                    </p>

                    <p>
                        If you need to make changes, please contact:
                    </p>

                    <p>

                        <strong>
                        Clarisse B. Martinez
                        </strong>

                        <br>

                        RSVP Coordinator

                        <br>

                        <a href="tel:09755624427">
                        📞 0975 562 4427
                        </a>

                    </p>

                    <a
                        href="https://junieandruffaweddinginvitation.my.canva.site/"
                        target="_blank"
                    >

                        <button>
                            View Wedding Details
                        </button>

                    </a>

                </div>

            `;

            return;
        }



        // ==========================================
        // NOT YET SUBMITTED
        // ==========================================

        if (data.status === "not_submitted") {

            result.innerHTML = `

                <div class="guest-card">

                    <h3>
                        Welcome, ${data.name}! 💙
                    </h3>

                    <p>
                        You have
                        <strong>
                        one (1) reserved seat.
                        </strong>
                    </p>

                    <p>
                        Will you be attending?
                    </p>

                    <button onclick="rsvp('Yes', '${data.name}')">
                        Yes, I will attend
                    </button>

                    <button onclick="rsvp('No', '${data.name}')">
                        No, I cannot attend
                    </button>

                </div>

            `;

            return;
        }



        // ==========================================
        // UNEXPECTED RESPONSE
        // ==========================================

        throw new Error(
            "Unexpected response from Google Apps Script."
        );

    })

    .catch(error => {

        console.error("Error checking guest:", error);

        result.innerHTML = `

            <div class="guest-card">

                <h3>
                    Something went wrong 😢
                </h3>

                <p>
                    Please try again.
                </p>

            </div>

        `;

    });

}



// ==========================================
// SUBMIT RSVP
// ==========================================

function rsvp(answer, guestName) {

    let result = document.getElementById("result");


    result.innerHTML = `

        <div class="guest-card">

            <h3>
                Submitting your RSVP... 💙
            </h3>

        </div>

    `;


    fetch(scriptURL, {

        method: "POST",

        body: JSON.stringify({

            name: guestName,

            rsvp: answer

        })

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Google Apps Script returned HTTP " + response.status
            );

        }

        return response.json();

    })

    .then(data => {

        console.log("RSVP submission:", data);



        // ==========================================
        // ALREADY SUBMITTED
        // ==========================================

        if (data.status === "already_submitted") {

            result.innerHTML = `

                <div class="guest-card">

                    <h3>
                        Already Submitted 💙
                    </h3>

                    <p>
                        Hi ${data.name}, you have already submitted
                        your RSVP.
                    </p>

                    <p>
                        Your current response:

                        <strong>
                            ${
                                data.rsvp === "Yes"
                                ? "Attending"
                                : "Not Attending"
                            }
                        </strong>

                    </p>

                    <p>
                        If you need to make changes, please contact:
                    </p>

                    <p>

                        <strong>
                        Clarisse B. Martinez
                        </strong>

                        <br>

                        RSVP Coordinator

                        <br>

                        <a href="tel:09755624427">
                        📞 0975 562 4427
                        </a>

                    </p>

                    <a
                        href="https://junieandruffaweddinginvitation.my.canva.site/"
                        target="_blank"
                    >

                        <button>
                            View Wedding Details
                        </button>

                    </a>

                </div>

            `;

            return;
        }



        // ==========================================
        // SUCCESS
        // ==========================================

        if (data.status === "success") {

            result.innerHTML = `

                <div class="guest-card">

                    <h3>
                        Thank you, ${data.name}! 💙
                    </h3>

                    <p>
                        Your RSVP has been recorded.
                    </p>

                    <p>
                        Attendance:

                        <strong>
                            ${
                                answer === "Yes"
                                ? "Attending"
                                : "Not Attending"
                            }
                        </strong>

                    </p>

                    <a
                        href="https://junieandruffaweddinginvitation.my.canva.site/"
                        target="_blank"
                    >

                        <button>
                            View Wedding Details
                        </button>

                    </a>

                </div>

            `;

            return;
        }



        // ==========================================
        // UNEXPECTED RESPONSE
        // ==========================================

        throw new Error(
            "Unexpected response from Google Apps Script."
        );

    })

    .catch(error => {

        console.error("Error submitting RSVP:", error);

        result.innerHTML = `

            <div class="guest-card">

                <h3>
                    Something went wrong 😢
                </h3>

                <p>
                    Your RSVP could not be submitted.
                </p>

                <p>
                    Please try again.
                </p>

            </div>

        `;

    });

}

async function mail() {
    const fullName = document.getElementById("editableInput").value;
    const email = document.getElementById("editableInput2").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!fullName || !email || !subject || !message) {
        alert("Please fill in all the fields.");
        return;
    }

    const payload = {
        fullName,
        email,
        subject,
        message
    };

    try {
        const response = await fetch("http://localhost:3000/api/mail/sendMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Your message was sent successfully! ✅");
        } else {
            const error = await response.json();
            alert(`Failed to send message: ${error.message || "Unknown error."}`);
        }
    } catch (error) {
        alert("Error: Could not connect to the server.");
        console.error(error);
    }
}

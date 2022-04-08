// edit profile button working & save button to save the entered data
$("#edit-button").click(function () {
    $(".contact-info").css('display','none');
    $("#contact-input").removeClass("hide");
});

$("#save-btn").click(saveInput);

async function saveInput(e) {
    e.preventDefault();

    const location = $("#location").val();
    const companyName = $('#company-name').val().trim();
    const position = $('#position').val().trim();
    const phoneNumber = $('#mobile-num').val().trim();
    const email = $('#email').val().trim();
    const address = $('#work-adds').val().trim();

    if (location && companyName && position && phoneNumber && email && address) {
        const response = await fetch('/homeRoutes/profile', {
          method: 'POST',
          body: JSON.stringify({ location, companyName, position, phoneNumber, email, address }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace(`/myprofile`);
        } else {
          alert(response.statusText);
        }
        console.log(response)
    }
}

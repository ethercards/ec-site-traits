const URL = 'https://script.google.com/macros/s/AKfycbyct2Kw9lzU8MhzcQZwCBlJMR-K6hUf_0vMVsiRqJBmDEg02BI/exec';
const GET = "GET";

const ID_REGISTER = 'register-form';
var $registerForm = $('form#' + ID_REGISTER);

jQuery(function () {
    $registerForm.on('submit', (function (e) {
        var form = $(this)
        e.preventDefault();
        enableButton(form, false)
        submitAjax($(this), function (response) {
            enableButton(form, true)
            if (response.result == "error") {
                alert("Something went wrong! : " + response.error)
            } else {
                $('#thankYouPopup').modal("show");
                $registerForm[0].reset();
                console.log("Form submitted successfully")
            }
        })
    }))

    $('#thankYouPopup').on('hidden.bs.modal', function () {
        // Redirect to root
        // window.location = '/';
    });
})

function enableButton(form, enable) {
    if (enable) {
        form.find('#submit-form').attr("disabled", false);
        form.find('.spinner-border').removeClass('loading');
    } else {
        form.find('#submit-form').attr("disabled", true);
        form.find('.spinner-border').addClass('loading');
    }
}

// Append Form Id to every submit requests
function submitAjax(e, successFunc) {
    var id = e.attr('id');
    var data = e.serialize();

    $.ajax({
        method: GET,
        url: URL,
        data: data + '&id=' + id,
        success: successFunc,
        error: function (xhr, status, errorThrown) {
            alert("Error: " + xhr.responseText);
            console.log("Request Status: " + xhr.statusText);
            console.log("Status: " + status);
            console.log("Error: " + errorThrown);
        }
    })
}
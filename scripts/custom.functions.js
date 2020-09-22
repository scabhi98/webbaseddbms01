function hello(name){
    alert("Hello "+name);
}

var signup_data = {};

function submit_action(){
    signup_data.name = $('#name').val();
    signup_data.email = $('#email').val();
    signup_data.contact = $('#contact_no').val();
    signup_data.password = $('#password').val();
    signup_data.cnf_password = $('#cnf_password').val();

    $.ajax({
        url: "http://localhost:3000/users",
        type: 'POST',
        data: JSON.stringify(signup_data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(msg) {
            console.log(msg);
        }
    });

    console.log(signup_data); 
}

$(document).ready(function (){
    $('#name').val("Kunal Sen");
});
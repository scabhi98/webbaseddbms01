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
    $('#name').val("");
});


$('#password, #cnf_password').on('keyup change', function () {
    if ($('#password').val() == $('#cnf_password').val()) { 
      if($('#password').val().length > 0)       
      $('#message').html('Password Confirmed').css('color', 'yellow');
      else
      $('#message').html('');
    } else {
      
        $('#message').html('Passwords are different').css('color', 'red');
      
    }
      
  }); 
  
/*

// Function to generate OTP 
function generateOTP() { 
		
	// Declare a digits variable 
	// which stores all digits 
	var digits = '0123456789'; 
	let OTP = ''; 
	for (let i = 0; i < 4; i++ ) { 
		OTP += digits[Math.floor(Math.random() * 10)]; 
	} 
	return OTP; 
} 

document.write("OTP of 4 digits: ") 
document.write( generateOTP() ); 
*/


var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message1").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message1").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

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


//clic dropdown script

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
*/


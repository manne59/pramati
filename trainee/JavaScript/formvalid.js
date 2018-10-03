$(document).ready(function () {
	$("#datepicker").datepicker();

	$("#first_name").keyup(function () {
		$('#first_name').css('textTransform', 'capitalize');
	});

	$("#last_name").keyup(function () {
		$('#last_name').css('textTransform', 'capitalize');
	});
});

function valid() {
	var flag = 0;
	var blank_flag = 0;
	var first_name = document.getElementById("first_name").value;
	var last_name = document.getElementById("last_name").value;
	var email = document.getElementById("email").value;
	var phone_number = document.getElementById("phone_number").value;
	var dob = document.getElementById("datepicker").value;
	if (first_name.length < 1) {
		document.getElementById("first_name_error").innerHTML = "First Name cannot be blank";
		$("#first_name_error").show();
		blank_flag = 1;
		flag = 1;
	}
	if (last_name.length < 1) {
		document.getElementById("last_name_error").innerHTML = "Last Name cannot be blank";
		$("#last_name_error").show();
		blank_flag = 1;
		flag = 1;
	}
	if (dob.length < 1) {
		document.getElementById("dob_error").innerHTML = "DOB cannot be blank";
		$("#dob_error").show();
		blank_flag = 1;
		flag = 1;
	}
	if (email.length < 1) {
		document.getElementById("email_error").innerHTML = "Email cannot be blank";
		$("#email_error").show();
		blank_flag = 1;
		flag = 1;
	}
	if (phone_number.length < 1) {
		document.getElementById("phone_number_error").innerHTML = "Phone Number cannot be blank";
		$("#phone_number_error").show();
		blank_flag = 1;
		flag = 1;
	}
	if (blank_flag == 0) {
		$("#first_name_error").hide();
		$("#last_name_error").hide();
		$("#email_error").hide();
		$("#phone_number_error").hide();
		$("#dob_error").hide();
		var today = new Date();
		var given = new Date(dob);
		if (given > today) {
			document.getElementById("dob_error").innerHTML = "DOB cannot be future date";
			$("#dob_error").show();
			flag = 1;
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
			flag = 1;
			document.getElementById("email_error").innerHTML = "Enter a valid email address";
			$("#email_error").show();
		}
		if (!(/^[a-zA-Z]/.test(email))) {
			flag = 1;
			document.getElementById("email_error").innerHTML = "Email address cannot start with numbers";
			$("#email_error").show();
		}
		if (!(phone_number.length == 10)) {
			flag = 1;
			document.getElementById("phone_number_error").innerHTML = "Invalid Phone Number";
			$("#phone_number_error").show();
		}
		if (phone_number.length == 10 && !(phone_number.charAt(0) == '6' || phone_number.charAt(0) == '7' || phone_number.charAt(0) == '8' || phone_number.charAt(0) == '9')) {
			flag = 1;
			document.getElementById("phone_number_error").innerHTML = "Phone Number should start with 6,7,8,9 only";
			$("#phone_number_error").show();
		}
	}
	if (flag == 0) {
		first_name = first_name.charAt(0).toUpperCase() + first_name.substring(1, first_name.length);
		last_name = last_name.charAt(0).toUpperCase() + last_name.substring(1, last_name.length);
		var row = "<tr><td>" + first_name + "</td><td>" +
			last_name + "</td><td>" +
			email + "</td><td>" +
			phone_number + "</td><td>" +
			dob + "</td></tr>";
		$("#form_details_table tbody").append(row);
		document.getElementById("sample_form").reset();
	}
}



<?php
session_start();
if(isset($_POST['submit'])) {
	$email= $_POST['email'];
  $password= $_POST['pass'];

	// checking empty fields
	if(empty($email) || empty($password)) {

		if(empty($email)) {
			echo "<font color='red'>Please put username</font><br/>";
		}

		if(empty($password)) {
			echo "<font color='red'>Please put password</font><br/>";
		}


		//link to the previous page
	//	echo "<br/><a href='javascript:self.history.back();'>Go Back</a>";
	} else {
		// if all the fields are filled (not empty)
    if ($email == "emaganjo@gmail.com" && $password == "password") {
      session_register("user");
      $_SESSION['login_user'] = $user;
      header("Location:admin.html#/admin");
    } else {
      echo "Wrong Email/Password combination";
    }
	}
}
?>

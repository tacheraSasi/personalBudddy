<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Retrieve POST data
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

// Check if email and password were provided
if (!isset($data->email) || !isset($data->password)) {
    $response = array('success' => false, 'message' => 'Email and password are required');
    echo json_encode($response);
    exit;
}

// Connect to MySQL database
include("config.php");

if (!$conn) {
    $response = array('success' => false, 'message' => 'Failed to connect to MySQL: ' . mysqli_connect_error());
    echo json_encode($response);
    exit;
}

// Sanitize email
$email = mysqli_real_escape_string($conn, $data->email);

// Query the database for the user
$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $query);

if (!$result) {
    $response = array('success' => true, 'message' => 'Query failed: ' . mysqli_error($conn));
    echo json_encode($response);
    exit;
}

// Check if the user exists
if (mysqli_num_rows($result) > 0) {
    $user_data = mysqli_fetch_array($result);
    $stored_password = $user_data['password'];

    // Hash the entered password with MD5 for comparison
    $entered_password_md5 = md5($data->password);

    // Check if the hashed entered password matches the stored password
    if ($entered_password_md5 === $stored_password) {
        $response = array('success' => true, 'message' => 'User authenticated successfully', 'user_data' => $user_data);
    } else {
        $response = array('success' => false, 'message' => 'Invalid email or password');
    }
} else {
    $response = array('success' => false, 'message' => 'Invalid email or password');
}

// Return response as JSON
echo json_encode($response);

// Close database connection
mysqli_close($conn);
?>

<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Retrieve POST data
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

// Check if email and password were provided
if (!isset($data->email)) {
    $response = array('message' => 'Email are required');
    echo json_encode($response);
    exit;
}

// Connect to MySQL database
include("config.php");

if (!$conn) {
    $response = array('message' => 'Failed to connect to MySQL: ' . mysqli_connect_error());
    echo json_encode($response);
    exit;
}

// Sanitize email
$email = mysqli_real_escape_string($conn, $data->email);

// Query the database for the user
$query = "SELECT * FROM Categories WHERE created_by =  '$email'";
$result = mysqli_query($conn, $query);

if (!$result) {
    $response = array('message' => 'Query failed: ' . mysqli_error($conn));
    echo json_encode($response);
    exit;
}

// Check if the user exists
if (mysqli_num_rows($result) > 0) {
    $categories = mysqli_fetch_array($result);
    $stored_password = $categories['password'];

   
    // Check if the hashed entered password matches the stored password
    if ($entered_password_md5 === $stored_password) {
        $response = array('message' => 'User authenticated successfully', 'categories' => $categories);
    } else {
        $response = array('message' => 'Invalid email or password');
    }
} else {
    $response = array('message' => 'Invalid email or password');
}

// Return response as JSON
echo json_encode($response);

// Close database connection
mysqli_close($conn);
?>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
if (empty($_POST["idi_name"]) || empty($_POST["idi_mail"]) || empty($_POST["idi_text"])) {
http_response_code(400);
header("Location: Contact.html?error=" . urlencode("Please fill out all required fields."));
exit();
}

$name = filter_var(trim($_POST["idi_name"]), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST["idi_mail"]), FILTER_SANITIZE_EMAIL);
$message = filter_var(trim($_POST["idi_text"]), FILTER_SANITIZE_STRING);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
http_response_code(400);
header("Location: Contact.html?error=" . urlencode("Invalid email format."));
exit();
}

try {
$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'smtp-relay.brevo.com';
$mail->SMTPAuth = true;
$mail->Username = 'tomasvmoreno@gmail.com';
$mail->Password = 'gjfGWq7KkUrAaP23';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('no-reply@tomasvmoreno.com', 'Mailer');
$mail->addAddress('tvm@tomasvmoreno.com');

$mail->isHTML(false);
$mail->Subject = 'New message from the contact form - ' . date('Y-m-d H:i:s');
$mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

if (!$mail->send()) {
error_log("Mailer Error: Failed to send email.", 3, "error_log.txt");
http_response_code(500);
header("Location: Contact.html?error=" . urlencode("Failed to send email. Please try again."));
exit();
}
} catch (Exception $e) {
error_log("Mailer Error: " . $mail->ErrorInfo, 3, "error_log.txt");
http_response_code(500);
header("Location: Contact.html?error=" . urlencode("Mailer Error: " . $mail->ErrorInfo));
exit();
}
}
?>
<?php
   use PHPMailer\PHPMailer\PHPMailer;

   require 'PHPMailer/src/PHPMailer.php';
   require 'PHPMailer/src/SMTP.php';
   $mail = new PHPMailer;
   $mail->isSMTP();
   $mail->SMTPDebug = 2;
   $mail->Host = 'smtp.hostinger.com';
   $mail->Port = 587;
   $mail->SMTPAuth = true;
   $mail->Username = 'tvm@tomasvmoreno.com';
   $mail->Password = '976500!SAvm';
   $mail->setFrom('tvm@tomasvmoreno.com', 'Your Name');
   $mail->addReplyTo('tvm@tomasvmoreno.com', 'Your Name');
   $mail->addAddress('zakiralibhai@gmail.com', 'Receiver Name');
   $mail->Subject = 'Checking if PHPMailer works';
   $mail->Body = 'This is just a plain text message body';
   if (!$mail->send()) {
       echo 'Mailer Error: ' . $mail->ErrorInfo;
   } else {
       echo 'The email message was sent.';
   }
?>
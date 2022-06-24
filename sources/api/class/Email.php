<?php

class Email
{

    private $_HOST;
    private $_PORT;
    private $_USER;
    private $_PASS;
    private $_FROM;

    public function __construct()
    {
        try {
            $_DIR = explode("api", __DIR__)[0];
            $file_name = $_DIR . "api/.env";
            if (file_exists($file_name)) {
                $json = file_get_contents($file_name);
                $_ENV = json_decode($json, true);

                $this->_HOST = $_ENV['email']['host'];
                $this->_PORT = $_ENV['email']['port'];
                $this->_USER = $_ENV['email']['user'];
                $this->_PASS = $_ENV['email']['pass'];
                $this->_FROM = $_ENV['email']['from'];

                require_once $_DIR . "api/libs/phpmailer/class.phpmailer.php";
                require_once $_DIR . "api/libs/phpmailer/class.smtp.php";

            } else {
                throw new Exception("No existe el fichero: " . $file_name);
            }
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function send($arr)
    {
        try {
            $mail = new PHPMailer();
            $mail->IsSMTP();
            $mail->SMTPSecure = "ssl";
            $mail->SMTPAuth = true;

            $mail->Host = $this->_HOST; // SMTP a utilizar. Por ej. smtp.elserver.com
            $mail->Username = $this->_USER; // Correo completo a utilizar
            $mail->Password = $this->_PASS; // Contraseña

            $mail->Port = $this->_PORT; // Puerto a utilizar
            $mail->From = $this->_FROM; // Desde donde enviamos (Para mostrar)
            $mail->FromName = $arr['title'];
            $mail->Subject = $arr['subtitle']; // Este es el titulo del email.
            $mail->IsHTML(true); // El correo se envía como HTML

            $mail->AddAddress("{$arr['para']}"); // Esta es la dirección a donde enviamos
            foreach ($arr['copias'] as $key => $email) {
                $mail->AddCC("{$email}"); // Copia
            }

            $mail->Body = $arr["body"];

            foreach ($arr['adjuntos'] as $key => &$adjunto) {
                $mail->AddAttachment($adjunto['path'], $adjunto['name']);
            }
            foreach ($arr['imgs'] as $key => &$img) {
                $mail->AddEmbeddedImage($img['path'], $img['name'], $img['name_ext']);
            }

            $mail->CharSet = 'UTF-8';
            $exito = $mail->Send(); //Envía el correo.

            if ($exito) {
                // echo json_encode("El correo fue enviado correctamente.");
                return true;
            } else {
                // echo json_encode("Hubo un inconveniente. Contacta a un administrador.");
                return false;
            }
        } catch (Exception $e) {
            // print(json_encode('Excepción capturada: ' . $e->getMessage()));
            return false;
        }
    }
}

<?php

class Encryption
{

    private $_TOKEN;
    private $_PATH_LIBS;
    private $_ENCRYPT_METHOD = "AES-128-CBC";
    private $_SECRET;
    private $_IV;
    private $_ENCODING;

    public function __construct()
    {
        try {
            $_DIR = explode("api", __DIR__)[0];
            $this->_PATH_LIBS = $_DIR . "api/libs/";

            $file_name = $_DIR . "api/.env";
            if (file_exists($file_name)) {
                $json = file_get_contents($file_name);
                $_ENV = json_decode($json, true);

                $this->_TOKEN = $_ENV['TOKEN'];
                $this->_SECRET = hex2bin(str_replace('-', '', $_ENV['SECRET']));
                $this->_IV = hex2bin(str_replace('-', '', $_ENV['IV']));
                $this->_ENCODING = $_ENV['ENCODING'];
            } else {
                throw new Exception("No existe el fichero: " . $file_name);
            }
        } catch (Exception $ex) {
            echo "Error: " . $ex->getMessage();
        }
    }

    // CREA UN TOKEN CON EL PAYLOAD QUE SE LE PASE
    public function generateToken($payload)
    {
        try {
            require_once $this->_PATH_LIBS . "JWT.php";
            $arr = array(
                "iss" => "http://ocacall.com",
                "aud" => "http://ocacall.com",
                "data" => $payload, // ARRAY, INT OR STRING
                "iat" => time(),
                "exp" => time() + (60 * 60 * 24 * 30), // TIME UXIX UN MES
            );
            return JWT::encode($arr, $this->_TOKEN);
        } catch (Exception $e) {
            return $e;
        }
    }

    // DECODIFICA EL TOKEN RECUPERANDO LA AUTHORIZATION HEADER
    public function decodeToken()
    {
        try {
            require_once $this->_PATH_LIBS . "JWT.php";
            $headers = apache_request_headers();
            $token = isset($headers['Token']) ? $headers['Token'] : $headers['token'];
            JWT::decode($token, $this->_TOKEN, array('HS256'));
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    // DECODIFICA EL TOKEN POR PARAMETRO
    public function decodeTokenPayload($token)
    {
        try {
            require_once $this->_PATH_LIBS . "JWT.php";
            return JWT::decode($token, $this->_TOKEN, array('HS256'));
        } catch (Exception $e) {
            return $e;
        }
    }

    // SIFRADO DE UN STRING
    public function encrypData($data)
    {
        return openssl_encrypt($data, $this->_ENCRYPT_METHOD, $this->_SECRET, 0, $this->_IV);
    }

    // DESIFRADO DE UN STRING
    private function decrypData($data)
    {
        return openssl_decrypt($data, $this->_ENCRYPT_METHOD, $this->_SECRET, 0, $this->_IV);
    }

    // VALIDA SI LA INFORMACION ENVIADA ESTA SIFRADA Y SI CUENTA CON PERMISOS
    public function encryption()
    {
        $headers = apache_request_headers();
        $header = isset($headers['encoding']) ? $headers['encoding'] : $headers['Encoding'];
        $encryption = $header == $this->_ENCODING ? false : true;
        return array(
            "encryption" => $encryption,
            "_POST" => $encryption ? json_decode($this->decrypData($_POST['data']), true) : $_POST,
        );
    }

    public function encryptPassword($pass)
    {
        $val = 0;
        for ($i = 0; $i < strlen($pass); $i++) {
            $val += ord(substr($pass, $i, 1));
        }
        return $val;
    }
}

<?php

class MssqlPDO
{
    public $_CONN;
    public function __construct($index = 0)
    {
        try {
            $_DIR = explode("api", __DIR__)[0];
            $file_name = $_DIR . "api/.env";
            if (file_exists($file_name)) {
                $json = file_get_contents($file_name);
                $_ENV = json_decode($json, true);

                $host = $_ENV['MSSQL'][$index]['host'];
                $user = $_ENV['MSSQL'][$index]['user'];
                $pass = $_ENV['MSSQL'][$index]['password'];
                $db = $_ENV['MSSQL'][$index]['database'];
                $driver = $_ENV['MSSQL'][$index]['driver'];

                $url = "odbc:Driver={$driver};Server={$host};Database={$db};Uid={$user};Pwd={$pass};";                
                $this->_CONN = new PDO($url);
                $this->_CONN->exec("set names utf8");
            } else {
                throw new Exception("No existe el fichero: " . $file_name);
            }
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    /** CONSULTA */
    public function db_consulta($strQuery)
    {
        $resultado = $this->_CONN->query($strQuery);
        if (!$resultado) {
            print "<pre>Ha ocurrido un error intente nuevamente:  <br> Query:  <br>" . $strQuery . " <br> Error: <br>" . $this->_CONN->error . "</pre>";
            return null;
        } else {
            return $resultado;
        }
    }

    // Prepara una sentencia para su ejecución y devuelve un objeto sentencia
    public function db_procedure($strQuery)
    {
        $sth = $this->_CONN->prepare($strQuery);
        $sth->execute();
        return $sth;
    }

    /** RETORNA UN ARRAY ASOCIATIVO CORRESPONDIENTE A LA FILA OBTENIDA O NULL SI NO HUBIRA MAS FILAS */
    public function db_fetch_assoc($qTmp)
    {
        if ($qTmp != null) {
            return $qTmp->fetch(PDO::FETCH_ASSOC);
        } else {
            return null;
        }
    }

    /** DEVUELVE LA FILA ACTUAL DE UN CONJUNTO DE RESULTADOS COMO UN OBJETO */
    public function db_fetch_object($qTmp)
    {
        if ($qTmp != null) {
            return $qTmp->fetch(PDO::FETCH_OBJ);
        } else {
            return null;
        }
    }

    /** CIERRA LA _CONN */
    public function db_close()
    {
        $this->_CONN = null;
    }

    /** OBTIENE EL NUMERO DE FILAS DE UN RESULTADO */
    public function db_num_rows($qTmp)
    {
        return $qTmp->rowCount();
    }

    /** OBTIENE LA ULTIMA IDENTIFICACION DE LA INSERCION QUE SE HA GENERADO */
    public function db_last_id()
    {
        return $this->_CONN->lastInsertId();
    }
}

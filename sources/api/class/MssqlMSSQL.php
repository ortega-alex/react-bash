<?php

class MssqlMSSQL
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

                $server = $_ENV['MYSQL'][$index]['host'];
                $db = $_ENV['MYSQL'][$index]['database'];
                $user = $_ENV['MYSQL'][$index]['user'];
                $pass = $_ENV['MYSQL'][$index]['password'];

                $this->_CONN = mssql_connect($server, $user, $pass) or die("Connect Error server");
                mssql_select_db($db, $this->_CONN) or die("Problemas al  seleccionar la base de datos " . $db);
            } else {
                throw new Exception("No existe el fichero: " . $file_name);
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    /** CONSULTA */
    public function db_consulta($strQuery)
    {
        $resultado = mssql_query($strQuery);
        if (!$resultado) {
            print "<pre>Ha ocurrido un error intente nuevamente:  <br> Query:  <br>" . $strQuery . " <br> Error: <br>" . mssql_error() . "</pre>";
            return null;
        } else {
            return $resultado;
        }
    }

    /** PROCEDIMIENTO ALMACENADO */
    public function db_procedure($strQuery)
    {
        $resultado = mssql_query($strQuery);
        if (!$resultado) {
            print "<pre>Ha ocurrido un error intente nuevamente:  <br> Query:  <br>" . $strQuery . " <br> Error: <br>" . mssql_error() . "</pre>";
            return null;
        } else {
            return $resultado;
        }
    }

    /** RETORNA UN ARRAY ASOCIATIVO CORRESPONDIENTE A LA FILA OBTENIDA O NULL SI NO HUBIRA MAS FILAS */
    public function db_fetch_assoc($qTmp)
    {
        if ($qTmp != null) {
            return mssql_fetch_assoc($qTmp);
        } else {
            return null;
        }
    }

    /** DEVUELVE LA FILA ACTUAL DE UN CONJUNTO DE RESULTADOS COMO UN OBJETO */
    public function db_fetch_object($qTmp)
    {
        if ($qTmp != null) {
            return mssql_fetch_object($qTmp);
        } else {
            return null;
        }
    }

    /** CIERRA LA _CONN */
    public function db_close()
    {
        mssql_close($this->_CONN);
    }

    public function db_num_rows($qTmp)
    {
        return mssql_num_rows($qTmp);
    }

    public function db_last_id()
    {
        $strQuery = "SELECT @@IDENTITY AS ID";
        $qTmp = $this->db_consulta($strQuery);
        $rTmp = $this->db_fetch_assoc($qTmp);
        return $rTmp['ID'];
    }
}

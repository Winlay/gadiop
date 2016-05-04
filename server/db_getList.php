<?php

function ajouter($table, $params = array()) {
    $tab_keys = array();
    $tab_values = array();
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            if ($value != "") {
                $tab_keys[] = $key;
                $tab_values[] = "'" . str_replace("'", "\'", strip_tags($value)) . "'";
            }
        }
    }
    $sql = "insert into " . $table . " ";
    $sql.='(' . implode(',', $tab_keys) . ')';
    $sql.=' values (' . implode(',', $tab_values) . ')';

    $resultat = mysql_query($sql) or die(mysql_error());
    $id = mysql_insert_id();
    return $id;
}

function ajouterParcelle($params = array()) {
    $tab_keys = array();
    $polygone = $params['POLYGONE'];
    unset($params['POLYGONE']);
    $tab_values = array();
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            if ($value != "") {
                $tab_keys[] = $key;
                $tab_values[] = "'" . str_replace("'", "\'", strip_tags($value)) . "'";
            }
        }
    }
    $sql = "INSERT INTO TB_PARCELLE_CULTIVEE ";
    $sql.='(' . implode(',', $tab_keys) . ')';
    $sql.=' values (' . implode(',', $tab_values) . ')';
    $resultat = mysql_query($sql) or die(mysql_error());
    $id = mysql_insert_id();
    $cords = explode('|', $polygone);



    if (count($cords) > 1) {
        $reqValues = "";
        foreach ($cords as $value) {
            if ($value != "") {
                $reqValues.="(" . $id . "," . $value . "),";
            }
        }
        $reqInsertCord = "INSERT INTO TB_GPS_PCLE_CLT (ID_PCLE_CLT,LATITUDE,LONGITUDE) values " . rtrim($reqValues, ",");
        $resCords = mysql_query($reqInsertCord) or die(mysql_error());
    }

    return $id;
}

function updateParcelle($params = array()) {
    $polygone = $params['POLYGONE'];
    $ID_PCLE_CLT = $params['ID_PCLE_CLT'];
    unset($params['POLYGONE']);
    unset($params['ID_PCLE_CLT']);
    updatePCLE("TB_PARCELLE_CULTIVEE", $ID_PCLE_CLT, $params);

    //REquest del old cords
    $reqDel = "DELETE FROM TB_GPS_PCLE_CLT WHERE ID_PCLE_CLT=" . $ID_PCLE_CLT;
    mysql_query($reqDel) or die(mysql_error());
    //Request del old cords

    $cords = explode('|', $polygone);
    if (count($cords) > 1) {
        $reqValues = "";
        foreach ($cords as $value) {
            if ($value != "") {
                $reqValues.="(" . $id . "," . $value . "),";
            }
        }
        $reqInsertCord = "INSERT INTO TB_GPS_PCLE_CLT (ID_PCLE_CLT,LATITUDE,LONGITUDE) values " . rtrim($reqValues, ",");
        $resCords = mysql_query($reqInsertCord) or die(mysql_error());
    }

    return $id;
}

function deleteParcelle($ID_PCLE_CLT) {
    //REquest del old cords
    $reqDel = "DELETE FROM TB_PARCELLE_CULTIVEE WHERE ID_PCLE_CLT=" . $ID_PCLE_CLT;
    mysql_query($reqDel) or die(mysql_error());

    //REquest del old cords
    $reqDel = "DELETE FROM TB_GPS_PCLE_CLT WHERE ID_PCLE_CLT=" . $ID_PCLE_CLT;
    mysql_query($reqDel) or die(mysql_error());
    //Request del old cords
}

function listeAlerte($params = array()) {
    $sql = "select * from alertes a where 1=1 ";
    if ($params['parcelle_id'] && $params['parcelle_id'] != '') {
        $sql = "select a.*, p.NOM as parcelle from alertes a, parcelles p  where a.parcelle_id=p.id AND p.id=" . $params['parcelle_id'];
    }
    if (is_array($params) && count($params) > 0) {

        if ($params['map'] && $params['map'] == 'map') {
            $sql.= " AND  a.latitude <> 0 AND a.longitude <> 0";
        }


//        if ($params['user_id']) {
//            $sql.= " AND  p.ID IN (select parcelle_id from affectation_parcelle where user_id=" . $params['user_id'] . ")";
//        }
        $sql.= " ORDER BY a.id DESC ";
    }
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    if (count($list) > 0) {
        return $list;
    }
    return NULL;
}

function parametres() {
    $parameters = array();


// DAC
    $sql = "select *  from TB_DAC where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['DAC'] = $list;

// TYPE  FONCIER
    $sql = "select *  from TB_TYPE_FONCIER where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['TYPEFONCIER'] = $list;


// TYPE  IRRIGATION
    $sql = "select *  from TB_TYPE_IRRIGATION where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['TYPEIRRIGATION'] = $list;


// TYPE  AMENAGEMENT
    $sql = "select *  from TB_TYPE_AMENAGEMENT  where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['TYPEAMENAGEMENT'] = $list;

// GEA
    $sql = "select *  from TB_GEA where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['GEA'] = $list;

// CULTURE
    $sql = "select *  from TB_CULTURE where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['CULTURE'] = $list;

// CAMPAGNE
    $sql = "select *  from TB_CAMPAGNE where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['CAMPAGNE'] = $list;

// UAE
    $sql = "select * from TB_UAE where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['UAE'] = $list;

// DETAIL_CAMPAGNE
    $sql = "select * from TB_DETAIL_CAMPAGNE where 1=1 ";
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    $parameters['DETAILCAMPAGNE'] = $list;


    return $parameters;
}

function searchZone($params = array()) {
    $sql = "select p.* from TB_PARCELLE_CULTIVEE p where 1=1 ";
    if (is_array($params) && count($params) > 0) {
        if ($params['categorie']) {
            $sql.= " AND  p.NOM_CATEGORIE =" . $params['categorie'] . " ";
        }
        if ($params['parcelle_id']) {
            $sql.= " AND  p.ID_PCLE_CLT =" . $params['parcelle_id'] . " ";
        }
        if ($params['text']) {
            $sql.= " AND  (p.NOM_CA LIKE  '%" . $params['text'] . "%'";
        }

//        if ($params['user_id']) {
//            $sql.= " AND  p.ID IN (select parcelle_id from affectation_parcelle where user_id=" . $params['user_id'] . ")";
//        }
        $sql.= " ORDER BY p.ID_PCLE_CLT DESC ";
    }
    $list = array();
    $resultat = mysql_query($sql) or die(mysql_error());

    while ($result = mysql_fetch_assoc($resultat)) {
        $sqlRecupLatLong= "SELECT LATITUDE as lat, LONGITUDE as lng FROM TB_GPS_PCLE_CLT where ID_PCLE_CLT = " . $result['ID_PCLE_CLT'];
        $cords = array();
        $rCords = mysql_query($sqlRecupLatLong) or die(mysql_error());
        while ($res = mysql_fetch_assoc($rCords)) {
            $cords[] = array("lat" => str_replace('"', '', $res["lat"]), "lng" => str_replace('"', '', $res["lng"]));
        }

        $result['polygone'] = $cords;
        $list[] = $result;
    }

    if (count($list) > 0) {
        return $list;
    }
    return NULL;
}

function getUnique($table, $id) {
    $sql = "select * from " . $table . " where id=" . $id;

    $list = array();

    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    if (count($list) > 0)
        return $list[0];
    return NULL;
}

function synchroniserLine($table, $params = array()) {
    $tab_keys = array();
    $tab_values = array();
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            $tab_keys[] = $key;
            $tab_values[] = "'" . str_replace("'", "\'", strip_tags($value)) . "'";
        }
    }
    $date = date("Y-m-d H:i:s");
    $sql = "insert into " . $table . " ";
    $sql.='(date_synchronisation,' . implode(',', $tab_keys) . ')';
    $sql.="values (now()," . implode(',', $tab_values) . ')';

    $resultat = mysql_query($sql) or die(mysql_error());
    $id = mysql_insert_id();
    return $id;
}

function update($table, $id, $params = array()) {
    $set = " SET ";
    $i = 1;
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            if (is_numeric($value)) {
                $set.=$key . " = " . $value;
            } else {
                $set.=$key . "='" . str_replace("'", "\'", strip_tags($value)) . "'";
            }
            if ($i != count($params))
                $set.=",";
            $i++;
        }
    }
    $sql = "update $table ";

    $sql.= $set . ' where id = ' . $id;
//    print_r($sql);
    $resultat = mysql_query($sql) or die(mysql_error());
    return $resultat;
}
function updatePCLE($table, $id, $params = array()) {
    $set = " SET ";
    $i = 1;
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            if (is_numeric($value)) {
                $set.=$key . " = " . $value;
            } else {
                $set.=$key . "='" . str_replace("'", "\'", strip_tags($value)) . "'";
            }
            if ($i != count($params))
                $set.=",";
            $i++;
        }
    }
    $sql = "update $table ";

    $sql.= $set . ' where ID_PCLE_CLT = ' . $id;
//    print_r($sql);
    $resultat = mysql_query($sql) or die(mysql_error());
    return $resultat;
}

function getList($table, $params = array(), $orderBy = "") {
    $sql = "select * from " . $table . " where 1=1 ";
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            $sql.= " AND " . $key . "='" . $value . "' ";
        }
    }

    $list = array();

    if (isset($orderBy) && $orderBy != "")
        $sql.=" ORDER BY " . $orderBy . " DESC";

    $resultat = mysql_query($sql) or die(mysql_error());
    while ($result = mysql_fetch_assoc($resultat)) {
        $list[] = $result;
    }
    return $list;
}

function delete($table, $params = array()) {
    $sql = "delete  from " . $table . "  where 1=1 ";
    if (is_array($params) && count($params) > 0) {
        foreach ($params as $key => $value) {
            if (isset($value) && $value != "") {
                $good = true;
                if (is_array($value)) {
                    $sql.= " AND " . $key . "  IN (" . implode(",", $value) . ") ";
                } elseif (is_numeric($value)) {
                    $sql.= " AND " . $key . "=" . $value . " ";
                } else {
                    $sql.= " AND (" . $key . " like '%" . $value . "%' OR " . $key . ' = ' . $value . ') ';
                }
            }
        }
        $resultat = mysql_query($sql) or die(mysql_error());
        return $resultat;
    }
    return NULL;
}

function nbJours($debut, $fin) {
    //60 secondes X 60 minutes X 24 heures dans une journée
    $nbSecondes = 60 * 60 * 24;

    $debut_ts = strtotime($debut);
    $fin_ts = strtotime($fin);
    $diff = $fin_ts - $debut_ts;
    return round($diff / $nbSecondes);
}

function truncate($string, $limit, $break = "", $pad = "...") {
    // return with no change if string is shorter than $limit 
    if (strlen($string) <= $limit)
        return $string; // is $break present between $limit and the end of the string? 
    else {
        $string = substr($string, 0, $limit) . $pad;
    }
    return $string;
}

function get_index_by_value($tab, $value) {
    if (!is_array($tab) || count($tab) == 0)
        return "";
    foreach ($tab as $key => $val) {
        if ($val == $value)
            return$key;
    }
    return "";
}

$listeMois = array(1 => "Janvier", 2 => "Fevrier", 3 => "Mars", 4 => "Avril", 5 => "Mai", 6 => "Juin", 7 => "Juillet", 8 => "Aout", 9 => "Septembre", 10 => "Octobre", 11 => "Novembre", 12 => "Décembre");
?>
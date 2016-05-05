// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
var DB;
var LOGINUSER;
var PASSWORDUSER;
var NOMUSER;
var NOM_DAC;
var PRENOMUSER;
var IDUser;
var ID_USER;
var SQLCREATETABLE =
        'CREATE TABLE TB_USER ('
        + 'IDUser integer PRIMARY KEY,'
        + 'ID_USER integer ,'
        + 'MOTPASSE TEXT,'
        + 'LOGIN TEXT,'
        + 'NOMUSER TEXT,'
        + 'PRENOMUSER TEXT,'
        + 'NOM_DAC TEXT,'
        + 'ID_DAC integer,'
        + ')';

// Cordova is ready
function testDBandCreate() {

    DB.transaction(function (tx) {
        alert("SQLCREATETABLE==>" + SQLCREATETABLE);
        tx.executeSql('DROP TABLE IF EXISTS TB_USER');
        tx.executeSql(SQLCREATETABLE);
        var reqInsert = "INSERT INTO TB_USER (IDUser,ID_USER,LOGIN,MOTPASSE,PRENOMUSER,NOMUSER) VALUES (" + IDUser + "," + ID_USER + ",'" + LOGINUSER + "','" + PASSWORDUSER + "','" + PRENOMUSER + "','" + NOMUSER + "')";
        tx.executeSql(reqInsert);

        DB.transaction(function (tx) {
            tx.executeSql("select * from TB_USER;", [], function (tx, res) {
                alert("res.rows.length: " + res.rows.length);
                alert("res.rows.item(0).NOM: " + res.rows.item(0).NOM);
            });
        });
    });
}

function onDeviceReady() {
    DB = window.sqlitePlugin.openDatabase({name: "my.db"});
}

function connexion(login, password) {
    LOGINUSER = login;
    PASSWORDUSER = password;

    getInfosOnline();



}


function createTableUser(tx) {
    tx.executeSql('DROP TABLE IF EXISTS TB_USER');
    var sql =
            "CREATE TABLE IF NOT EXISTS `TB_USER` ("
            + "`LOGIN` varchar(255) NOT NULL,"
            + "`NOMUSER` varchar(255) NOT NULL,"
            + "`PRENOMUSER` varchar(255) NOT NULL,"
            + "`MOTPASSE` varchar(50) NOT NULL,"
            + "`SUPERVISEUR` tinyint(4) NOT NULL DEFAULT '0',"
            + "`MOTPASSASAISIR` tinyint(4) NOT NULL DEFAULT '1',"
            + "`ID_USER` int(11) NOT NULL DEFAULT '0',"
            + "`PHOTO` longblob NOT NULL,"
            + "`TEL` varchar(50) NOT NULL,"
            + "`MATRICULE` varchar(50) NOT NULL,"
            + "`DATEHEURECONNEXION` varchar(50) NOT NULL,"
            + "`ESTMEMORISE` tinyint(4) NOT NULL DEFAULT '0',"
            + "`NOM_DAC` varchar(50) NOT NULL,"
            + "`IDDAC` int(11) NOT NULL DEFAULT '0',"
            + "`ID_DAC` int(11) NOT NULL,"
            + "`IDUser` int(11) NOT NULL,"
            + "PRIMARY KEY (`IDUser`)"
            + ")";
    tx.executeSql(sql, function () {

    });
}

function getInfosOnline() {
    alert('LOGINUSER:' + LOGINUSER + '/PASSWORDUSER' + PASSWORDUSER);
    jQuery.ajax({
        'type': 'GET',
        'url': "http://geoland.noflay.com/server/connexion.php",
        'data': {'login': LOGINUSER, 'password': PASSWORDUSER},
        'dataType': 'JSON',
        'success': function (resultat) {
            LOGINUSER = resultat[0].LOGIN;
            PASSWORDUSER = resultat[0].MOTPASSE;
            NOMUSER = resultat[0].NOMUSER;
            PRENOMUSER = resultat[0].PRENOMUSER;
            ID_USER = resultat[0].ID_USER;
            IDUser = resultat[0].IDUser;
            alert('LOGINUSER:' + LOGINUSER + '/PASSWORDUSER' + PASSWORDUSER + '/PRENOMUSER:' + PRENOMUSER);
            testDBandCreate();
        },
        'error': function (error) {
            alert('une erreur est survenue lors de la recupération des informations de l\'utilisateur en ligne');
        }
    });
}
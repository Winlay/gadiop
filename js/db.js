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
        + 'ID_USER integer PRIMARY KEY,'
        + 'MOTPASSE TEXT,'
        + 'LOGIN TEXT,'
        + 'NOMUSER TEXT,'
        + 'PRENOMUSER TEXT,'
        + 'NOM_DAC TEXT,'
        + 'ID_DAC integer,'
        + ')';

function onDeviceReady() {
    DB = window.sqlitePlugin.openDatabase({name: "my.db"});
}
// Cordova is ready
function CreateDB() {

    DB.transaction(function (transaction) {
        transaction.executeSql(SQLCREATETABLE, [],
                function (tx, result) {
                    alert('table embed créée avec succes');
                },
                function (error) {
                    alert('erreur création embed table');
                });
    });
}
// Cordova is ready
function selectUser() {
    DB.transaction(function (transaction) {
        var reqInsert = "SELECT * FROM TB_USER;";
        transaction.executeSql(reqInsert, [],
                function (tx, result) {
                    var len = result.rows.length, i;
                    for (i = 0; i < len; i++) {
                        alert( 'RESULT=>' +result.rows.item(i).PRENOM+' '+result.rows.item(i).NOM);
                    }
                },
                function (error) {
                    alert('erreur select utilisateur');
                });
    });
}
// Cordova is ready
function insertUser() {
    DB.transaction(function (transaction) {
        var reqInsert = "INSERT INTO TB_USER (ID_USER,LOGIN,MOTPASSE,PRENOMUSER,NOMUSER,NOM_DAC,ID_DAC) VALUES (?,?,?,?,?,?,?);";
        transaction.executeSql(reqInsert, [ID_USER, LOGINUSER, PASSWORDUSER, PRENOMUSER, NOMUSER, 'KEUR SAMBA KANE', 1],
                function (tx, result) {
                    alert('succes insertion utilisateur');
                },
                function (error) {
                    alert('erreur insertion utilisateur');
                });
    });
}



function connexion(login, password) {
    LOGINUSER = login;
    PASSWORDUSER = password;
    getInfosOnline();
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
            CreateDB();
            insertUser();
            selectUser();
        },
        'error': function (error) {
            alert('une erreur est survenue lors de la recupération des informations de l\'utilisateur en ligne');
        }
    });
}
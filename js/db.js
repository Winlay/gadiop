// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
//var DB;
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

// Cordova is ready
function onDeviceReady() {
      var DB = window.sqlitePlugin.openDatabase({name: "my.db"}, 
    function() {
        window.plugins.toast.showLongCenter('Connected');
    },
    function(err) {
        window.plugins.toast.showLongCenter('Error Connexion');
    });
    
    window.plugins.toast.show('DEBUT DROP TABLE', 'long', 'center');
    DB.transaction(function (tx) {
        tx.executeSql('DROP TABLE TB_USER', [],
                function (tx, result) {
                    window.plugins.toast.show('DROP TABLE OK', 'long', 'center');
                },
                function (error) {
                    window.plugins.toast.show('ERREUR DROP TABLE', 'long', 'center');
                });
    });
    // ...
}
// Cordova is ready
function createDB() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        tx.executeSql(SQLCREATETABLE, [],
                function (tx, result) {
                    window.plugins.toast.show('table embed créée avec succes', 'long', 'center');
                },
                function (error) {
                    window.plugins.toast.show('erreur création embed table', 'long', 'center');
                });
    });
}
// Cordova is ready
function selectUser() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        var reqInsert = "SELECT * FROM TB_USER;";
        tx.executeSql(reqInsert, [],
                function (tx, result) {
                    var len = result.rows.length, i;
                    for (i = 0; i < len; i++) {
                        window.plugins.toast.show('RESULT=>' + result.rows.item(i).PRENOM + ' ' + result.rows.item(i).NOM, 'long', 'center');
                    }
                },
                function (error) {
                    window.plugins.toast.show('erreur select utilisateur', 'long', 'center');
                });
    });
}
// Cordova is ready
function insertUser() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        var reqInsert = "INSERT INTO TB_USER (ID_USER,LOGIN,MOTPASSE,PRENOMUSER,NOMUSER,NOM_DAC,ID_DAC) VALUES (?,?,?,?,?,?,?);";
        tx.executeSql(reqInsert, [ID_USER, LOGINUSER, PASSWORDUSER, PRENOMUSER, NOMUSER, 'KEUR SAMBA KANE', 1],
                function (tx, result) {
                    window.plugins.toast.show('succes insertion utilisateur', 'long', 'center');
                },
                function (error) {
                    window.plugins.toast.show('erreur insertion utilisateu', 'long', 'center');
                });
    });
}



function connexion(login, password) {
    LOGINUSER = login;
    PASSWORDUSER = password;
    getInfosOnline();
}


function getInfosOnline() {
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
            window.plugins.toast.show('LOGINUSER:' + LOGINUSER + '/PASSWORDUSER' + PASSWORDUSER + '/PRENOMUSER:' + PRENOMUSER, 'long', 'center');
            createDB();
            insertUser();
            selectUser();
        },
        'error': function (error) {
            window.plugins.toast.show('une erreur est survenue lors de la recupération des informations de l\'utilisateur en ligne', 'long', 'center');
        }
    });
}
// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
//var DB;
var LOGINUSER;
var PASSWORDUSER;
var NOMUSER;
var NOM_DAC;
var ID_DAC;
var PRENOMUSER;
var IDUser;
var ID_USER;
var SQLCREATETABLE = 'CREATE TABLE tb_user (ID_USER integer PRIMARY KEY,MOTPASSE text,LOGIN text,NOMUSER text,PRENOMUSER text,NOM_DAC text,ID_DAC integer)';
// Cordova is ready
function onDeviceReady() {
    selectUser();
}

function selectUser() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        var reqInsert = "SELECT * FROM tb_user;";
        tx.executeSql(reqInsert, [],
                function (tx, result) {
                    window.plugins.toast.showLongCenter(' Bienvenu ' + result.rows.item(0).PRENOMUSER + ' ' + result.rows.item(0).NOMUSER);
                    window.location = "accueil.html";
                },
                function (error) {
                    window.plugins.toast.showLongCenter('erreur select utilisateur' + error);
                });
    });
}
// Cordova is ready
function createDB() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        tx.executeSql(SQLCREATETABLE, [],
                function (tx, result) {
                    window.plugins.toast.showLongCenter('table utilisateur créée avec succes');
                },
                function (error) {
                    window.plugins.toast.showLongCenter('erreur création embed table' + error);
                });
    });
}
// Cordova is ready
// Cordova is ready
function insertUser() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        var reqInsert = "INSERT INTO tb_user (ID_USER,LOGIN,MOTPASSE,PRENOMUSER,NOMUSER,NOM_DAC,ID_DAC) VALUES (?,?,?,?,?,?,?);";
        tx.executeSql(reqInsert, [ID_USER, LOGINUSER, PASSWORDUSER, PRENOMUSER, NOMUSER, NOM_DAC, ID_DAC],
                function (tx, result) {
                    window.plugins.toast.showLongCenter('utilisateur initialisé avec succes');
                },
                function (error) {
                    window.plugins.toast.showLongCenter('erreur initialisation utilisateur' + error.message);
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
            NOM_DAC = resultat[0].NOM_DAC;
            ID_DAC = resultat[0].ID_DAC;
//            window.plugins.toast.showLongCenter('LOGINUSER:' + LOGINUSER + '/PASSWORDUSER' + PASSWORDUSER + '/PRENOMUSER:' + PRENOMUSER);
            createDB();
            insertUser();
            selectUser();
        },
        'error': function (error) {
            window.plugins.toast.showLongCenter('une erreur est survenue lors de la recupération des informations de l\'utilisateur en ligne');
        }
    });
}
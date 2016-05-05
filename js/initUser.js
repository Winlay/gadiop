document.addEventListener("deviceready", onDeviceReady, false);
//var DB;
var LOGINUSER;
var PASSWORDUSER;
var NOMUSER;
var NOM_DAC;
var PRENOMUSER;
var IDUser;
var ID_USER;
// Cordova is ready
function onDeviceReady() {
    var DB = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
    DB.transaction(function (tx) {
        var reqInsert = "SELECT * FROM tb_user;";
        tx.executeSql(reqInsert, [],
                function (tx, result) {
                    LOGINUSER = result.rows.item(0).LOGIN;
                    PASSWORDUSER = result.rows.item(0).MOTPASSE;
                    NOMUSER = result.rows.item(0).PRENOMUSER;
                    PRENOMUSER = result.rows.item(0).PRENOMUSER;
                    ID_USER = result.rows.item(0).ID_USER;
                    IDUser = result.rows.item(0).IDUser;
                    NOM_DAC = result.rows.item(0).NOM_DAC;
                    jQuery('#nomdac').html(NOM_DAC);
                },
                function (error) {
                    window.plugins.toast.showLongCenter('erreur select utilisateur' + error);
                });
    });
}
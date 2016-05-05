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
                console.log("res.rows.length: " + res.rows.length );
                console.log("res.rows.item(0).cnt: " + res.rows.item(0).NOM);
            });
        });
        
        /*       tx.executeSql(reqInsert, [], function (tx, res) {
         alert("insertId: " + res.insertId + " -- probably 1");
         alert("rowsAffected: " + res.rowsAffected + " -- should be 1");
         
         DB.transaction(function (tx) {
         tx.executeSql("select * FROM TB_USER", [], function (tx, res) {
         alert("res.rows.length: " + res.rows.length + " -- should be 1");
         alert("res.rows.item(0).PRENOMUSER: " + res.rows.item(0).PRENOMUSER + " ");
         });
         });
         
         }, function (e) {
         alert("ERROR: " + e.message);
         });
         */
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


function transaction_error(tx, error) {
    alert("Database Error: " + error);
}


function populateDB_success() {
    DBCreated = true;
    DB.transaction(getEmployees, transaction_error);
}

function getEmployees(tx) {
    var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " +
            "from employee e left join employee r on r.managerId = e.id " +
            "group by e.id order by e.lastName, e.firstName";
    tx.executeSql(sql, [], getEmployees_success);
}

function getEmployees_success(tx, results) {
    $('#ajax-content').hide();
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var employee = results.rows.item(i);
        $('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
                '<img src="pics/' + employee.picture + '" class="list-icon"/>' +
                '<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
                '<p class="line2">' + employee.title + '</p>' +
                '<span class="bubble">' + employee.reportCount + '</span></a></li>');
    }
    setTimeout(function () {
        scroll.refresh();
    }, 100);
    DB = null;
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
            alert('une erreur est survenue lors de la recupération des informations de l\'utilisateur: ' + error.message);
        }
    });
}
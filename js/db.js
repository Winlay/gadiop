// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
var USERLOGIN;
var USERPASSWORD;
// Cordova is ready
function onDeviceReady() {
    var db = window.sqlitePlugin.openDatabase({name: "my.db"});
    db.transaction(function (tx) {
        var sqlCreateTable =
                "CREATE TABLE `TB_USER` ("
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
        tx.executeSql(sqlCreateTable, ["test", 100], function () {
            alert('base de donées créée avec succes');
        }, function (e) {
            console.log("ERROR: " + e.message);
            alert('base de donnée initialisée');
        });
    });
}

function connexion(login, password) {
    var db = window.sqlitePlugin.openDatabase({name: "my.db"});
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM TB_USER WHERE LOGIN='" + login + "' AND PASSWORD = '" + password + "';", [], function (tx, res) {
            USERLOGIN = res.rows.item(0).LOGIN;
            USERPASSWORD = res.rows.item(0).MOTPASSE;
            alert("PRENOM : " + res.rows.item(0).PRENOMUSER + " ");
            document.location.href = "accueil.html";
        }, function (tx) {
            jQuery.ajax({
                'type': 'GET',
                'url': "http://geoland.noflay.com/server/connexion.php",
                'data': {'login': login, 'password': password},
                'dataType': 'JSON',
                'success': function (resultat) {
                    USERLOGIN = resultat[0].LOGIN;
                    USERPASSWORD = resultat[0].MOTPASSE;
                    tx.executeSql("INSERT INTO TB_USER ('IDUser','ID_USER','LOGIN','MOTPASSE','PRENOMUSER','NOMUSER') VALUES ('" + resultat[0].IDUser + "','" + resultat[0].ID_USER + "','" + resultat[0].LOGIN + "','" + resultat[0].MOTPASSE + "','" + resultat[0].PRENOMUSER + "','" + resultat[0].NOMUSER + "')", ["test", 100], function (tx, res) {
                        alert("insertId: " + res.insertId);
                        tx.executeSql("select count(*) as cnt from TB_USER", [], function (tx, res) {
                            alert("NB USER: " + res.rows.item(0).cnt);
                        });
                        document.location.href = "accueil.html";
                    }, function (e) {
                        alert("ERROR: " + e.message);
                    });
                },
                'error': function () {
                    alert('une erreur est survenues lors de la recupération des informations de l\'utilisateur en ligne');
                }
            },
                    function () {
                        alert('echec de la création de la base de données');
                    });
        });
    });
}


function transaction_error(tx, error) {
    alert("Database Error: " + error);
}

function populateDB_success() {
    dbCreated = true;
    db.transaction(getEmployees, transaction_error);
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
    db = null;
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

/*
 jQuery.ajax({
 'type': 'GET',
 'url': "http://geoland.noflay.com/server/connexion.php",
 'data': {'login': login, 'password': password},
 'dataType': 'JSON',
 'success': function (resultat) {
 USERLOGIN = resultat[0].LOGIN;
 USERPASSWORD = resultat[0].MOTPASSE;
 tx.executeSql("INSERT INTO TB_USER ('IDUser','ID_USER','LOGIN','MOTPASSE','PRENOMUSER','NOMUSER') VALUES ('" + resultat[0].IDUser + "','" + resultat[0].ID_USER + "','" + resultat[0].LOGIN + "','" + resultat[0].MOTPASSE + "','" + resultat[0].PRENOMUSER + "','" + resultat[0].NOMUSER + "')", ["test", 100], function (tx, res) {
 alert("insertId: " + res.insertId);
 tx.executeSql("select count(*) as cnt from TB_USER", [], function (tx, res) {
 alert("NB USER: " + res.rows.item(0).cnt);
 });
 document.location.href = "accueil.html";
 }, function (e) {
 alert("ERROR: " + e.message);
 });
 },
 'error': function () {
 alert('une erreur est survenues lors de la recupération des informations de l\'utilisateur en ligne');
 }
 },
 function () {
 alert('echec de la création de la base de données');
 });
 
 */
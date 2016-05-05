// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
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
    var db = window.sqlitePlugin.openDatabase({name: "my.db"});
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS TB_USER');
        tx.executeSql(SQLCREATETABLE);

        var reqInsert = "INSERT INTO TB_USER (IDUser,ID_USER,LOGIN,MOTPASSE,PRENOMUSER,NOMUSER) VALUES (" + IDUser + "," + ID_USER + ",'" + LOGINUSER + "','" + PASSWORDUSER + "','" + PRENOMUSER + "','" + NOMUSER + "')";
        tx.executeSql(reqInsert, ["test", 100], function (tx, res) {
            alert("insertId: " + res.insertId + " -- probably 1");
            alert("rowsAffected: " + res.rowsAffected + " -- should be 1");

            db.transaction(function (tx) {
                tx.executeSql("select * FROM TB_USER", [], function (tx, res) {
                    alert("res.rows.length: " + res.rows.length + " -- should be 1");
                    alert("res.rows.item(0).PRENOMUSER: " + res.rows.item(0).PRENOMUSER + " ");
                });
            });

        }, function (e) {
            alert("ERROR: " + e.message);
        });
    });

//    db.transaction(function (tx) {
//
//        tx.executeSql(sqlCreateTable, ["test", 100], function () {
//            alert('base de donées créée avec succes');
//        }, function (e) {
//            alert("ERROR: " + e.message);
//            alert('base de données chargée');
//        });
//    });
}

function onDeviceReady() {
   
}

function connexion(login, password) {
    LOGINUSER = login;
    PASSWORDUSER = password;
   
   getInfosOnline();
   
   alert('debut create embed DB');
    testDBandCreate();
   
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
            alert('LOGINUSER:' + LOGINUSER + '/PASSWORDUSER' + PASSWORDUSER + '/PRENOMUSER:' + PRENOMUSER);
        },
        'error': function () {
            alert('une erreur est survenues lors de la recupération des informations de l\'utilisateur en ligne');
        }
    });
}
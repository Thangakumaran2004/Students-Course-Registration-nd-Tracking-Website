const db = require('../../databaseConnection');

const checkAdmin = async (username)=>{

    let checkAdminQuery = `SELECT cast(name as char) as adminName, cast(password as char) as adminPassword, cast(dept as char) as dept from admins where name = ?`;
    return new Promise((resolve,reject)=>{
        db.query(checkAdminQuery,username,(err,res)=>{
            if(err){
                console.log("Error occured while querying for username and password in admins table in admin login page. ",err);
                reject("Server busy");
            }else{
                //console.log("The result of checkAdmin Query in admin login page is : ",res);
                if(res.length == 1){
                    let response = {
                        status:"username found",
                        password: res[0].adminPassword,
                        dept: res[0].dept
                    };
                    resolve(response);
                }else{
                    console.log("Invalid admin. username not found in admins table in admin login page.");
                    resolve("username not found");
                }
            }
        })
    }).then(res=>res).catch(err=>err);
};

module.exports = {checkAdmin};
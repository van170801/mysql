import e from 'express';
import db from '../models/index'
import CRUDService from "../services/CRUDService";
// test web
let getHomePage = async (req, res) =>{
    try{
        let data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch{
        console.log(e)
    }
}

let getCrud = (req, res) => {
    return res.render('crud.ejs')
}
// trang register
let postCrud = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    console.log(req.body);
    return res.send('post server crud')
}
// xem user
let displayGetCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('----------')
    console.log(data)
    console.log('----------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
    
}

let getEditCrud = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        
        return res.render('editCRUD.ejs', {
            userData: userData
        })
    }
    else{
        return res.send('Users not Found!');
    }
    
}

let putCrud = async (req, res) =>{
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    displayGetCrud: displayGetCrud,
    getEditCrud: getEditCrud,
    putCrud: putCrud,
}
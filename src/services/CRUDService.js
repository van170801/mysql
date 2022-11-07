const bcrypt = require('bcrypt');
import e from 'express';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);
// tao user
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                username: data.username,
                password: hashPasswordFromBcrypt,
                email: data.email
            })

            resolve('ok create a new user succeed')

        }catch(e){
            reject(e);
        }
    })
}
// ma hoa password
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let hashPassword =await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch{
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) =>{
        try{
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject)=>{
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })

            if(user){
                resolve(user)
            }
            else{
                resolve([])
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let userData = await db.User.findOne({
                where: {id: data.id}

            })
            if(userData){
                userData.username = data.username;
                userData.email = data.email;
                userData.password = data.password;

                await userData.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
                resolve();
            }else{
                resolve();
            }
            
        }catch(e){
            reject(e);
        }
        
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
}
import express from "express";
import homecontroller from "../controllers/homeController";
//import logincontroller from "../controllers/loginController";
let router = express.Router();

let initWebRouters = (app) => {
    // chuyen trang den homecontroller
    router.get('/', homecontroller.getHomePage);

    router.get('/hoidanit', (req, res)=>{
        return res.send('hello word hoidanit')
    })

    //router.get('/login', logincontroller.getLogin);
    //router.get('/login', logincontroller.getLogin);

    router.get('/crud', homecontroller.getCrud);
    // register
    router.post('/post-crud', homecontroller.postCrud);
    router.get('/get-crud', homecontroller.displayGetCrud);
    router.get('/edit-crud', homecontroller.getEditCrud);
    router.post('/put-crud',homecontroller.putCrud );
    return app.use("/", router);
}

module.exports = initWebRouters;
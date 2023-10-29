import userRouter from "./userRouter.js";
import { PREFIX_URL } from '../utils/constants.js'

function route (app){
    app.use(PREFIX_URL + "/user", userRouter);
};

export default route;

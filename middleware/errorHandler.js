//this error handling function alllows us to ctaxh error even if we dont have error parameter in our handler functions
import { constants } from "../errorConstants.js";

const erroHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                Title: "Validation failed",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                Title: "Not found",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                Title: "Unauthorised",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                Title: "FORBIDDEN",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                Title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            })
            break;


        default:
            console.log("NO ERROR ALL GOOD!!");
            break;
    }

}

export default erroHandler
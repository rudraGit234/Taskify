import express from "express"
const router = express.Router()
import { registerUser, loginUser, currentUser } from "../controllers/userController.js"
import validateToken from "../middleware/validateTokenHandler.js"


router.post("/register", registerUser)


router.post("/login", loginUser)


router.get("/current", validateToken, currentUser)

export default router


// "_id": {
//     "$oid": "64a2d369f6e37e1f408f8ee9"
//   },
//   "user_id": {
//     "$oid": "64a2ceffd24cfd7c3ab8cf82"

// 64a2ceffd24cfd7c3ab8cf82
//   },








const userModel = require("./model");
const constants = require("../../utilities/constants");
const bcrypt = require("bcrypt");
const { customResponse } = require("../../utilities/helper");

const registerUser = async (req, res) => {
    let code, message, data;
    let success = false;
    try {
        let { firstName, lastName, email, gender, username, password } =
            req.body;
        email = email.toLowerCase();

        const existingUser = await userModel.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (existingUser) {
            if (existingUser.email === email) {
                throw { message: constants.USER_EXIST_WITH_EMAIL };
            }

            if (existingUser.username === username) {
                throw {
                    message: constants.USER_EXIST_WITH_USERNAME,
                };
            }
        }

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            username,
            gender,
            password: await bcrypt.hash(password, 10),
        });

        newUser.save();
        code = constants.HTTP_201_CODE;
        message = constants.USER_REGISTER_SUCCESS_MSG;
        data = newUser;
        success = true;
        const resData = customResponse({ code, message, data, success });
        return res.status(code).send(resData);
    } catch (error) {
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
            code,
            message,
            err: error.message,
        });
        return res.status(code).send(resData);
    }
}
const login = () => { }
const logout = () => { }

module.exports = { registerUser, login, logout }
import validator from "./validator.js";
import User from "../models/user.js";
import { Op } from "sequelize";
import _ from "lodash";

const userValidator = {
    validateCreateUser: async function (req, res, next) {
        const userData = req.body;
        const validationRule = {
            email: "required|string|email",
            username: "required|string",
            password: "required|string|min:1|confirmed", // Min is 1 to ease for testing
            password_confirmation: "required",
        };

        await validator(userData, validationRule, {}, (err, status) => {
            if (!status) {
                res.status(412).send({
                    error: "VALIDATION_FAILED",
                    data: err,
                });
                res.end();
                return;
            } else {
                next();
            }
        }).catch((err) => console.log(err));
    },

    validateUniqueUser: async function (req, res, next) {
        const userData = req.body;
        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        {
                            username: {
                                [Op.eq]: userData.username,
                            },
                        },
                        {
                            email: {
                                [Op.eq]: userData.email,
                            },
                        },
                    ],
                },
            });

            const error_msg = {};

            if (user && user.email == userData.email && user.id != userData.id) {
                error_msg["email"] = ["Email is duplicated with another user."];
            }
            if (user && user.username == userData.username && user.id != userData.id) {
                error_msg["email"] = ["Usrename is duplicated with another user."];
            }

            if (!_.isEmpty(error_msg)) {
                res.status(412).send({
                    error: "VALIDATION_FAILED",
                    data: { errors: { ...error_msg } },
                });
                res.end();
            } else {
                next();
            }
        } catch (error) {
            console.error(error);
        }
    },
};

export default userValidator;

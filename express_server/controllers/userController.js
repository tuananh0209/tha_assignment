import User from "../models/user.js";
import _ from "lodash";
import md5 from "md5";

const userController = {
    getUser: async function (req, res) {
        const id = parseInt(req.query?.id);
        let result;
        try {
            result = await User.findOne({
                where: {
                    id: id,
                },
                attributes: [
                    "id",
                    "username",
                    // "last_name",
                    // "first_name",
                    "email",
                    "is_superuser",
                    "is_staff",
                    "is_active",
                    "date_joined",
                ],
            });
        } catch {
            res.status(500).json({ error: "INTERNAL" });
            return;
        }
        if (_.isEmpty(result)) res.status(204).json({ error: "NOT_FOUND" });
        else res.status(200).json({ user: result });
    },

    getAllUser: async function (req, res) {
        let result;
        try {
            result = await User.findAll({
                attributes: [
                    "id",
                    "username",
                    "last_name",
                    "first_name",
                    "email",
                    "is_superuser",
                    "is_staff",
                    "is_active",
                    "date_joined",
                ],
            });
        } catch {
            res.status(500).json({ error: "INTERNAL" });
            return;
        }
        res.status(200).json({ users: result });
    },

    createUser: async function (req, res) {
        const data = req.body;
        try {
            // Hash password by md5.
            let { password } = data;
            data.password = md5(password);

            await User.create({ ...data });
            res.status(200).json({ result: "OK" });
        } catch (err) {
            res.status(500).json({ error: "INTERNAL" });
        }
    },

    updateUser: async function (req, res) {
        const data = req.body;
        try {
            // Find user.
            const user = await User.findByPk(data.id);
            if (_.isEmpty(user)) {
                res.status(204).json({ error: "NOT_FOUND" });
                return;
            }
            //  Remove id from data.
            delete data.id;
            // Update user data.
            await user.update(data);
            res.status(200).json({ result: "OK", user });
        } catch {
            res.status(500).json({ error: "INTERNAL" });
        }
    },

    deleteUser: async function (req, res) {
        const id = parseInt(req.query.id);
        try {
            await User.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).json({ result: "OK" });
        } catch {
            res.status(500).json({ error: "INTERNAL" });
        }
    },
};

export default userController;

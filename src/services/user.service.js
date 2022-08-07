const userSchema = require('../schema/user.schema');
const mongoService = require('./shared/mongo.service');
const jwt = require('jsonwebtoken');

class UserService {
    async createUser(newUser) {
        try {
            // Generate _id as random number
            newUser['_id'] = Math.floor(Math.random() * 10000000);

            // schema validation for user
            const validatedUser = await userSchema.validate(newUser);
            await mongoService.insert("Users", validatedUser.value)
            return validatedUser;
        } catch (err) {
            throw err;
        }
    }

    async login(user) {
        if (!user.username || !user.password) throw Error('No username/password entered!!');
        const query = {
            username: user.username,
            password: user.password
        };

        console.log("Login query: ", query);

        const mongoUser = await mongoService.findOne("Users", query);
        console.log("Mongo User: ", mongoUser);

        // if user exists generate token and return
        if (mongoUser) {
            const token = jwt.sign({
                data: mongoUser
            }, 'my-secret', {
                expiresIn: 60 * 60  // token expires in 1 hour
            });

            return token;
        }
        // if user doesn't exist return error
        else {
            throw Error('Invalid username/password');
        }
    }

    async verifyToken(req, res, next) {
        const token = req.headers['authorization'];

        console.log("Got token: ", token);

        jwt.verify(token, 'my-secret', (err, authData) => {
            if (err) {
                console.log("Error occured!!");
                res.json({ message: "Invalid Token!!" });
            } else {
                console.log("Successfully verified: ", authData);

                //Set into req object
                req.user = authData.data;
                next();
            }
        });
    }
}

module.exports = new UserService();
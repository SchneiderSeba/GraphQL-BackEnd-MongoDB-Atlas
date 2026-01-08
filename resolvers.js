import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { UserInputError } from 'apollo-server';
import User from './Models/models.js';

const resolvers = {
    Query: {
        usersCount: async () => {
            try {
                const users = await User.find();
                return users.length;
            } catch (error) {
                console.error('Error fetching users:', error);
                return 0;
            }
        },
        allPersons: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        },
        findUser: async (_, { username }) => {
            try {
                const users = await User.find();
                return users.find(user => user.username === username);
            } catch (error) {
                console.error('Error fetching users:', error);
                return null;
            }
        },
        first2Users: async () => {
            try {
                const users = await User.find().limit(2);
                return users;
            } catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        }
    }, 
    Mutation: {

        // DONE to Mongo DB
        addUser: async (_, { username, name, email }) => {
            try {
                const newUser = new User({
                    id: uuid(),
                    username,
                    name,
                    email,
                    blogs: [],
                    comments: []
                });
                await newUser.save();
                return newUser;
            } catch (error) {
                throw new UserInputError("Error creating user", {
                    invalidArgs: username
                });
            }
        },
        editUser: async (_, { id, user }) => {
            try {
                // Buscar y actualizar por _id de MongoDB
                const updatedUser = await User.findOneAndUpdate(
                    { id },
                    {
                        // ...(username && { username }),
                        // ...(name && { name }),
                        // ...(email && { email })
                        $set: user
                    },
                    { new: true }
                );
                if (!updatedUser) {
                    throw new UserInputError("User not found", {
                        invalidArgs: id
                    });
                }
                return updatedUser;
            } catch (error) {
                throw new UserInputError("Error updating user", {
                    invalidArgs: id
                });
            }
        },

        deleteAllUsers: async () => {
            try {
                const result = await User.deleteMany({});
                return result.deletedCount;
            } catch (error) {
                throw new Error("Error deleting users");
            }
        },

        deleteUserById: async (_, { id }) => {
            try {
                // Eliminar por el campo id (uuid)
                const result = await User.findOneAndDelete({ id });
                if (!result) {
                    throw new UserInputError("User not found", {
                        invalidArgs: id
                    });
                }
                return result;
            } catch (error) {
                throw new UserInputError("Error deleting user", {
                    invalidArgs: id
                });
            }
        }
    }
}
;

export default resolvers;
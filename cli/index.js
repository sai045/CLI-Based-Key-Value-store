#!/usr/bin/env node
const { program } = require('commander');
const { prompt } = require('inquirer');
const { setToken, getToken, clearToken } = require("./tokenFile")

const authQuestions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter username: '
    },
    {
        type: 'input',
        name: 'password',
        message: 'Enter password: '
    }
]

const keyQuestions = [
    {
        type: 'input',
        name: 'key',
        message: 'Enter key: '
    },
    {
        type: 'input',
        name: 'value',
        message: 'Enter value: '
    }
]

const getKeyQuestions = [
    {
        type: 'input',
        name: 'key',
        message: 'Enter key: '
    }
]

program.version("1.0.0")


program
    .command('register')
    .description('Add a User')
    .action(() => {
        prompt(authQuestions).then(async (answers) => {
            const { username, password } = answers
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            })
            const responseData = await response.json()
            console.log(responseData)
        });
    });

program
    .command('login')
    .description('Login a User')
    .action(() => {
        prompt(authQuestions).then(async (answers) => {
            const { username, password } = answers
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            })
            const responseData = await response.json()
            setToken(responseData.token)
        });
    });


program
    .command('addkey')
    .description('Add a Key')
    .action(() => {
        prompt(keyQuestions).then(async (answers) => {
            const { key, value } = answers
            const response = await fetch("http://localhost:3000/key-value", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                },
                body: JSON.stringify({
                    key,
                    value
                }),
            })
            const responseData = await response.json()
            console.log(responseData)
        });
    });

program
    .command('retrievekey')
    .description('Get a Key')
    .action(() => {
        prompt(getKeyQuestions).then(async (answers) => {
            const { key } = answers
            const response = await fetch(`http://localhost:3000/key-value/${key}`, {
                headers: {
                    "authorization": getToken()
                }
            })
            const responseData = await response.json()
            console.log(responseData)
        });
    });

program
    .command('updatekey')
    .description('Update a Key')
    .action(() => {
        prompt(keyQuestions).then(async (answers) => {
            const { key, value } = answers
            const response = await fetch(`http://localhost:3000/key-value/${key}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                },
                body: JSON.stringify({
                    key,
                    value
                }),
            })
            const responseData = await response.json()
            console.log(responseData)
        });
    });

program
    .command('deletekey')
    .description('Delete a Key')
    .action(() => {
        prompt(getKeyQuestions).then(async (answers) => {
            const { key } = answers
            const response = await fetch(`http://localhost:3000/key-value/${key}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                },
                body: JSON.stringify({
                    key
                }),
            })
            const responseData = await response.json()
            console.log(responseData)
        });
    });


program
    .command("logout")
    .action(() => {
        clearToken()
        console.log("Logged Out successfully")
    })

program.parse(process.argv)
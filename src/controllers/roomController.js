const { open } = require('sqlite')
const Database = require('../db/config')

module.exports = {
    async create(req, res){

        const db = await Database()
        const pass = req.body.password.toString()
        console.log(pass)
        let roomId
        let isRoom = true

        while (isRoom) {
            for(var i = 0 ; i < 6; i++){
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
            roomId += Math.floor(Math.random() * 10).toString()
        }
        const roomsExist = await db.all(`SELECT id FROM rooms`)
        isRoom = roomsExist.some(roomsExist => roomsExist === roomId)
        if(!isRoom){
            await db.run(`INSERT INTO rooms (id,pass) VALUES (${parseInt(roomId)},'${pass}')`)
        }
    }
        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){

        const db = await Database()
        
        const roomId = req.params.room

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead == 0){
                isNoQuestions = true
            }   
        }
        res.render('room', { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
        await db.close()
    }, 

    async enter(req, res){

        const roomId = req.body.roomId

        const db = await Database()

        const rooms = await db.get(`SELECT id FROM rooms WHERE id = ${roomId}`)

        await db.close()

        if(rooms !== undefined) {
            res.redirect(`/room/${roomId}`)
        } else {
            res.redirect(`/create-pass`)
        }        
    }

}
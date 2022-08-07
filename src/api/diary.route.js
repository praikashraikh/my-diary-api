const express = require('express');
const router = express.Router();
const diaryService = require('../services/diary.service');
const userService = require('../services/user.service');


async function getDiaries(req, res, next) {
    try {
        const diaries = await diaryService.getDiaries();
        res.status(200).json(diaries);
    } catch (err) {
        res.status(500).json({ message: 'Failed getting diaries.'})
    }
}

async function getDiary(req, res, next) {
    try {
        const _id = req.params._id;
        const diary = await diaryService.getDiary(_id);
        res.status(200).json(diary);
    } catch(err) {
        res.status(500).json({ message: "Failed getting diary."})
    }
}

async function deleteDiary(req, res, next) {
    try {
        const _id = req.params._id;
        await diaryService.deleteDiary(_id);
        res.status(200).json({ message: 'Successfully deleted diary!!' });
    } catch(err) {
        res.status(500).json({ message: "Failed deleting diary."})
    }
}

async function postDiary(req, res, next) {
    try {
        const newDiary = req.body || {};
        newDiary['createdBy'] = req.user.username;
        console.log("New Diary: ", newDiary);
        const createdDiary = await diaryService.postDiary(newDiary);
        res.status(200).json(createdDiary);
    } catch(err) {
        res.status(500).json({ message: "Failed getting diary."})
    }
}

async function updateDiary(req, res, next) {
    try {
        const _id = req.params._id;
        const diary = req.body || {};
        const updateDiary = await diaryService.updateDiary(_id, diary);
        res.status(200).json(updateDiary);
    } catch(err) {
        console.log("Failed updating diary: ", err)
        res.status(500).json({ message: "Failed updating diary."})
    }
}

router.get('/diaries', getDiaries);
router.get('/diary/:_id', getDiary);
router.delete('/diary/:_id', deleteDiary);
router.post('/diary', userService.verifyToken, postDiary);
router.patch('/diary/:_id', userService.verifyToken, updateDiary);

module.exports = router;
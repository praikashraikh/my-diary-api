const diarySchema = require('../schema/diary.schema');
const mongoService = require('./shared/mongo.service');

class DiaryService {
    async getDiaries() {
        const query = {};
        const diaries = await mongoService.find("Diaries", query);
        return diaries;
    }

    async getDiary(_id) {
        const query = {
            _id: Number(_id)
        };
        console.log("Query: ", query);
        const diary = await mongoService.findOne("Diaries", query);
        return diary;
    }

    async deleteDiary(_id) {
        const query = {
            _id: Number(_id)
        };
        console.log("Query: ", query);
        await mongoService.remove("Diaries", query);
    }

    async postDiary(newDiary) {
        newDiary['_id'] = Math.floor(Math.random() * 10000000);
        const validatedDiary = await diarySchema.validate(newDiary);
        await mongoService.insert("Diaries", validatedDiary.value)
        return validatedDiary.value;
    }

    async updateDiary(_id, diary) {
        const selectQuery = { _id: Number(_id) };
        
        const validatedDiary = await diarySchema.validate(diary);
        const updateQuery = { $set: validatedDiary.value };
        await mongoService.update("Diaries", selectQuery, updateQuery)
        return validatedDiary.value;
    }
}

module.exports = new DiaryService();
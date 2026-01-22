const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URL).then(async () => {
    const doc = await mongoose.connection.db.collection('nepsyllabuses').findOne({
        $or: [
            { course: /Data Science/i },
            { program: /Data Science/i }
        ]
    });

    if (doc) {
        let summary = `Found document: ${doc._id}\n`;
        if (doc.semesters) {
            doc.semesters.forEach(year => {
                summary += `Year: ${year.year}\n`;
                year.sems.forEach(sem => {
                    summary += `  Semester: ${sem.semester}\n`;
                    sem.categories.forEach(cat => {
                        summary += `    Category: ${cat.categoryName}\n`;
                    });
                });
            });
        }
        fs.writeFileSync('ds_categories_dump.txt', summary);
        console.log('Summary written to ds_categories_dump.txt');
    } else {
        console.log('No DS document found');
    }
    process.exit(0);
});

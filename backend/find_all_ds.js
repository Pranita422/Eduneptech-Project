const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URL).then(async () => {
    const allDocs = await mongoose.connection.db.collection('nepsyllabuses').find({}).toArray();
    console.log(`Total documents: ${allDocs.length}`);
    allDocs.forEach((doc, i) => {
        const docStr = JSON.stringify(doc);
        if (docStr.includes('Data Science')) {
            console.log(`\n--- Match ${i} ---`);
            console.log(`ID: ${doc._id}`);
            console.log(`Course: ${doc.course}`);
            console.log(`Program: ${doc.program}`);
            if (doc.year) console.log(`Year: ${doc.year}`);
            if (doc.semester) console.log(`Semester: ${doc.semester}`);

            // Check top-level categories
            if (doc.categories) {
                console.log(`Categories found at TOP LEVEL (${doc.categories.length})`);
                doc.categories.forEach(c => console.log(`  - ${c.categoryName}`));
            }

            // Check nested semesters
            if (doc.semesters) {
                console.log('Semesters found in document.');
                doc.semesters.forEach(y => {
                    console.log(`  Year: ${y.year}`);
                    y.sems.forEach(s => {
                        console.log(`    Sem: ${s.semester}`);
                        s.categories.forEach(c => console.log(`      - ${c.categoryName}`));
                    });
                });
            }

            // Check nested sems (like in IT/CS)
            if (doc.sems) {
                console.log('Sems found in document.');
                doc.sems.forEach(s => {
                    console.log(`    Sem: ${s.semester}`);
                    s.categories.forEach(c => console.log(`      - ${c.categoryName}`));
                });
            }
        }
    });
    process.exit(0);
});

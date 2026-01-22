/*const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URL).then(async () => {
    const docs = await mongoose.connection.db.collection('nepsyllabuses').find({
        $or: [
            { course: /Data Science/i },
            { program: /Data Science/i }
        ]
    }).toArray();

    fs.writeFileSync('ds_full_docs.json', JSON.stringify(docs, (k, v) => k === 'topics' ? '[...]' : v, 2));
    console.log(`Dumped ${docs.length} documents to ds_full_docs.json`);
    process.exit(0);
});
*/
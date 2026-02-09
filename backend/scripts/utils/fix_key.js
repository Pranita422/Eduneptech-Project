const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, 'serviceAccountKey.json');

try {
    const content = fs.readFileSync(keyPath, 'utf8');
    const data = JSON.parse(content);

    // Ensure private_key has actual newlines in it when parsed
    let pk = data.private_key;

    // Sometimes keys get double escaped like \\n instead of \n
    // Or they might have literal newlines if corrupted
    pk = pk.replace(/\\n/g, '\n');

    // Standard PEM format starts with -----BEGIN PRIVATE KEY-----
    // and ends with -----END PRIVATE KEY-----
    // and should have actual newlines between lines.

    data.private_key = pk;

    fs.writeFileSync(keyPath, JSON.stringify(data, null, 2), 'utf8');
    console.log("Successfully fixed serviceAccountKey.json formatting.");
} catch (error) {
    console.error("Error fixing serviceAccountKey.json:", error.message);
}

const fs = require('fs');

// Replace 'your-collection-file.json' with the path to your Postman collection JSON file
const collectionFilePath = 'TTUMProcessor Service.postman_collection 1.json';

// Read the Postman collection JSON file
fs.readFile(collectionFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    // Parse the JSON data
    const collection = JSON.parse(data);

    // Function to recursively count requests in the collection
    function countRequests(item) {
        let count = 0;

        if (item.item) {
            item.item.forEach(subItem => {
                count += countRequests(subItem);
            });
        } else if (item.request) {
            count += 1;
        }

        return count;
    }

    // Start counting from the root of the collection
    const totalRequests = countRequests(collection);

    console.log(`Total API requests in the collection: ${totalRequests}`);
});

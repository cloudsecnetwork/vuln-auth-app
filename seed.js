const User = require("./models/User");
const Transaction = require("./models/Transaction");
const readline = require('readline');

// Import connectDB and closeDB functions from db.js
const { connectDB, closeDB } = require('./db');
// Import the products array
const products = require('./data/products');
// Import the locations array
const locations = require('./data/locations');


// Create interface to read from stdin and write to stdout
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user and wait for response
function prompt(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer.trim().toLowerCase());
        });
    });
}

// Function to generate random password
function generatePassword() {
    const characters = 'abcdefghjkmnpqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

// Function to generate a random date of birth between 1980 and 2000
function generateRandomDOB() {
    const start = new Date(1980, 0, 1);
    const end = new Date(2000, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to perform database cleanup
async function cleanupDatabase() {
    try {
        // Connect to MongoDB database
        await connectDB();

        // Prompt user for confirmation
        const response = await prompt("You are about to initiate a database seeding process. This action will delete all existing records. Proceed? (yes/no): ");
        if (response !== "yes") {
            console.log("Database cleanup aborted.");
            process.exit(0); // Abort the program
        }

        // Delete all existing documents from the User and Transaction collections
        await User.deleteMany({});
        await Transaction.deleteMany({});

        console.log("Database cleanup completed!");
    } catch (error) {
        console.error("Error cleaning up database:", error);
    } finally {
        // Close database connection
        closeDB();
    }
}

// Function to seed the database with new data
async function seedDatabase() {
    try {
        // Connect to MongoDB database
        await connectDB();

        let transactionReference = 10;

        // Create 10 users with usernames like user1, user2, ..., user10
        for (let i = 1; i <= 10; i++) {
            const username = `user${i}`;
            const password = generatePassword();

            // Randomly select an address from the locations array
            const address = locations[Math.floor(Math.random() * locations.length)];

            // Generate random date of birth
            const dateOfBirth = generateRandomDOB();

            // Generate random balance between 1000 and 5000
            const accountBalance = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

            // Create user document
            const user = await User.create({ username, password, address, dateOfBirth, accountBalance });
            console.log(`-|-|- ${username} created!`);

            // Create 5 transaction records for each user
            for (let j = 0; j < 5; j++) {
                // Randomly select a product from the products array
                const product = products[Math.floor(Math.random() * products.length)];
                const description = `Payment for ${product}`;

                // Randomly select a channel from the channels array
                const channels = ['pos', 'web', 'atm'];
                const channel = channels[Math.floor(Math.random() * channels.length)];

                // Initialize cardType and terminalID variables
                let cardType = null;
                let terminalID = null;

                // If channel is 'pos' or 'atm', assign a random cardType and terminalID
                if (channel === 'pos' || channel === 'atm') {
                    const cardTypes = ['VISA', 'MasterCard', 'Verve'];
                    cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
                    terminalID = `Terminal${Math.floor(Math.random() * 1000)}`;
                }

                // Create transaction record and associate it with the user
                await Transaction.create({
                    reference: transactionReference++,
                    amount: Math.floor(Math.random() * 1000) + 1,
                    type: Math.random() < 0.5 ? 'debit' : 'credit',
                    description,
                    channel,
                    cardType, // Include cardType in the transaction
                    terminalID, // Include terminalID in the transaction
                    userId: user._id, // Associate transaction with user
                });
            }
            console.log(`-|-|- Transactions created for ${username}`);
        }
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        // Close database connection
        closeDB();
    }
}

// Call the cleanupDatabase function to perform cleanup before seeding
cleanupDatabase()
    .then(() => {
        // After cleanup, seed the database with new data
        seedDatabase();
    })
    .catch(error => {
        console.error("An error occurred:", error);
    })
    .finally(() => {
        // Close readline interface
        rl.close();
    });

const dns = require('dns');
dns.setServers(['8.8.8.8']);
const mongoose = require('mongoose');
const fs = require('fs');
const Player = require('./models/Player');
require('dotenv').config();

const exportData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin1:admin123@cluster0.admue97.mongodb.net/cricket");
    console.log('Connected to MongoDB');
    
    const players = await Player.find().lean();
    console.log(`Found ${players.length} players`);
    
    // Remove photoBase64 from JSON if it's too large, but user didn't specify. I'll include it in JSON but exclude from CSV.
    fs.writeFileSync('../players.json', JSON.stringify(players, null, 2));
    console.log('Written players.json');
    
    // Write CSV
    if (players.length > 0) {
      const headers = ['fullName', 'mobileNumber', 'playingRole', 'battingStyle', 'bowlingStyle', 'jerseyNumber', 'jerseySize', 'registeredAt'];
      const csvRows = [];
      csvRows.push(headers.join(',')); // Add headers
      
      for (const player of players) {
        const values = headers.map(header => {
          let val = player[header] || '';
          if (val instanceof Date) {
            val = val.toISOString();
          }
          if (typeof val === 'string') {
             val = val.replace(/"/g, '""');
             return `"${val}"`;
          }
          return val;
        });
        csvRows.push(values.join(','));
      }
      
      fs.writeFileSync('../players.csv', csvRows.join('\n'));
      console.log('Written players.csv');
    }
    
    console.log('Data exported successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
};

exportData();

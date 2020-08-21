const cron = require('node-cron');
const express = require('express');
const { execSync } = require('child_process');

app = express();

// schedule tasks to be run on the server
/*
* * * * * *
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second (optional)
*/
cron.schedule('*/5 * * * *', () => {
    execSync('npm run assign');
});

execSync('npm run assign');

// app.listen('5555');
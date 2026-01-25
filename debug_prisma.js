const { exec } = require('child_process');
console.log('Starting prisma generate debug...');
exec('npx prisma generate', { cwd: __dirname }, (error, stdout, stderr) => {
    console.log('--- STDOUT ---');
    console.log(stdout);
    console.log('--- STDERR ---');
    console.log(stderr);
    if (error) {
        console.log('--- ERROR OBJECT ---');
        console.log(error.message);
    }
});

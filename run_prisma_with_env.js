const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let databaseUrl = '';
const lines = envContent.split('\n');
for (const line of lines) {
    if (line.trim().startsWith('DATABASE_URL=')) {
        // Simple extraction, handles quotes if present
        const value = line.split('=')[1].trim();
        databaseUrl = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
        break;
    }
}

console.log('Found DATABASE_URL length:', databaseUrl.length);

const child = spawn('npx', ['prisma', 'generate'], {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: databaseUrl },
    shell: true
});

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
});

const https = require('https');

const REVALIDATION_URL = 'https://app.contentstack.com/automations-api/run/58412cf3b5f7443586550abeeb8077b4';
const TOTAL_REQUESTS = 1000;
const CONCURRENT_REQUESTS = 10;

let successCount = 0;
let failureCount = 0;
let completedCount = 0;

function makeRequest(requestNumber) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const req = https.get(REVALIDATION_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        completedCount++;
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          successCount++;
          console.log('Request #' + requestNumber + ' - Status: ' + res.statusCode + ' - Duration: ' + duration + 'ms - Progress: ' + completedCount + '/' + TOTAL_REQUESTS);
        } else {
          failureCount++;
          console.log('Request #' + requestNumber + ' - Status: ' + res.statusCode + ' - Duration: ' + duration + 'ms - Progress: ' + completedCount + '/' + TOTAL_REQUESTS);
        }
        resolve({ success: res.statusCode >= 200 && res.statusCode < 300, statusCode: res.statusCode });
      });
    });
    
    req.on('error', (error) => {
      const duration = Date.now() - startTime;
      completedCount++;
      failureCount++;
      console.log('Request #' + requestNumber + ' - Error: ' + error.message + ' - Duration: ' + duration + 'ms - Progress: ' + completedCount + '/' + TOTAL_REQUESTS);
      resolve({ success: false, error: error.message });
    });
    
    req.setTimeout(30000, () => {
      req.destroy();
      completedCount++;
      failureCount++;
      console.log('Request #' + requestNumber + ' - Timeout - Progress: ' + completedCount + '/' + TOTAL_REQUESTS);
      resolve({ success: false, error: 'timeout' });
    });
  });
}

async function runBatch(startIndex, batchSize) {
  const promises = [];
  for (let i = startIndex; i < startIndex + batchSize && i <= TOTAL_REQUESTS; i++) {
    promises.push(makeRequest(i));
  }
  return Promise.all(promises);
}

async function main() {
  console.log('Starting revalidation script...');
  console.log('URL: ' + REVALIDATION_URL);
  console.log('Total requests: ' + TOTAL_REQUESTS);
  console.log('Concurrent requests: ' + CONCURRENT_REQUESTS);
  console.log('----------------------------------------');
  
  const overallStartTime = Date.now();
  
  for (let i = 1; i <= TOTAL_REQUESTS; i += CONCURRENT_REQUESTS) {
    await runBatch(i, CONCURRENT_REQUESTS);
  }
  
  const totalDuration = Date.now() - overallStartTime;
  
  console.log('----------------------------------------');
  console.log('Summary:');
  console.log('  Successful: ' + successCount);
  console.log('  Failed: ' + failureCount);
  console.log('  Total time: ' + (totalDuration / 1000).toFixed(2) + ' seconds');
  console.log('  Average: ' + (totalDuration / TOTAL_REQUESTS).toFixed(2) + 'ms per request');
  console.log('Done!');
}

main().catch(console.error);


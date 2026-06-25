process.on('unhandledRejection', (err) => {
  console.error('=== RAW UNHANDLED REJECTION ===');
  console.error(err && err.stack ? err.stack : err);
  console.error('=== END ===');
});
const path = require('path');
const orig = path.relative;
path.relative = function (from, to) {
  if (typeof to !== 'string' || typeof from !== 'string') {
    console.error('=== path.relative bad args ===', { from, to });
    console.error(new Error('path.relative call site').stack);
  }
  return orig.apply(this, arguments);
};

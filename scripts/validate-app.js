const { exec } = require('child_process');
const { ZAPIER_VALIDATION_CODES_TO_IGNORE } = process.env;
exec('zapier validate --format=json', (err, stdout, stderr) => {
  if (err && stderr) {
    console.error(`An error happened and we don't know what to do about it.`);
    console.error(err);
    console.error(stderr);
    process.exit(err.code);
  }

  const ignorableCodes = (ZAPIER_VALIDATION_CODES_TO_IGNORE || '').split(',');
  // strip the initial `[]`, if one exists. It'll only exist if
  // schema validation passes but formatting validation does not
  const messages = Array.from(JSON.parse(stdout.replace(/^\[\]\s+/g, '')))
    .map((m) => {
      return {
        ...m,
        Code: m.Link.split('#')[1],
      };
    })
    .filter((m) => !ignorableCodes.includes(m.Code));

  if (messages.length) {
    console.log(messages);
    process.exit(1);
  } else {
    console.log('No Zapier Validation issues found.');
    process.exit(0);
  }
});

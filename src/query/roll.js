const { parse, roll } = require('roll-parser');
const { createResultMessage } = require('../text');
const { limit } = require('../limiter');

/*
Matches `roll` command:
`/roll` - command for chat
`/roll@rollrobot` - command in group chat (named command)
*/
const regexp = /^\/(roll)(@rollrobot)?(\s[\s\S]*)*$/;

function reply(notation) {
  const result = roll(limit(parse(notation)));
  return createResultMessage(result);
}

const title = 'Roll';

module.exports = {
  regexp,
  reply,
  title
};

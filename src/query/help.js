const { help } = require('../text');

/*
Matches `start` or `help` commands:
`/start` - command for chat
`/start@rollrobot` - command in group chat (named command)
*/
const regexp = /^\/(start|help)(@rollrobot)?(\s.*)*$/;

const reply = () => help;

module.exports = {
  regexp,
  reply
};

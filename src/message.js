const compact = require( 'lodash' ).compact;

function Message() {
  this.type = {
    start: {
      regexp: /^(\/start){1}(?:\s+\S*)*$/,
      resp: `Roll the dice like no one before. Flexible settings allow you to generate random numbers by the following pattern (x)d(y)+(n), where (x) is number of dices, (y) related to the number of dice edges and (n) is a number that should be added to the randomly generated number.\nBot recognizes and interacts with several commands, such as:\n\n/roll (x) (y) (n) -- 2d10+0, x=2, y=10, n=0 by default.\n/sroll (n) -- 2d6+(n), n=0 by default\n/droll (n) -- 2d20+(n), n=0 by default\n/random (y) -- 1d100+0, y=100 by default\n\nYou can manually modify the pattern by writing command, such as /roll 2 10 5, which meand bot will make roll of 2 10-edged dices and add 5 to the result.\nOther examples:\nroll 1 -- 1d10\nroll 4 6 5 -- 4d6+10\ndroll 3 -- 2d20+3\nrandom -- 1d100\nrandom 300 -- 1d300\n\n\nSimply open the bot's profile and use the 'Add to group' button.\n\nWe wish you have much fun using our Roll Robot in your RPgames.\n\nYour ideas on improvement are welcome: https://github.com/edloidas/rollrobot/issues\n\nRoll Robot team,\n@edloidas and @nartien`,
      options: {
        disable_web_page_preview: true,
      },
    },
    roll: {
      regexp: /^(?:(\/roll){1}((?:\s+\d+){0,3}))(?:\s+\S*)*$/,
      options: {
        parse_mode: 'Markdown',
      },
    },
    sroll: {
      regexp: /^(\/sroll){1}(\s+\d+)?(?:\s+\S*)*$/,
      options: {
        parse_mode: 'Markdown',
      },
    },
    droll: {
      regexp: /^(\/droll){1}(\s+\d+)?(?:\s+\S*)*$/,
      options: {
        parse_mode: 'Markdown',
      },
    },
    random: {
      regexp: /^(\/random){1}(\s+\d+)?(?:\s+\S*)*$/,
      options: {
        parse_mode: 'Markdown',
      },
    },
  };
}

Message.prototype.parse = function parse( msg, type ) {
  switch ( type ) {
    case 'start':
      return [];
    case 'roll':
      return compact( msg.split( ' ' )).map(( value ) => parseInt( value, 10 )) || [];
    case 'sroll':
      return compact([ parseInt( msg, 10 ) ]) || [];
    case 'droll':
      return compact([ parseInt( msg, 10 ) ]) || [];
    case 'random':
      return compact([ parseInt( msg, 10 ) ]) || [];
    default:
      return null;
  }
};

Message.prototype.matchAndParse = function matchAndParse( msg, type ) {
  let match;
  const isRoll = [ 'roll', 'sroll', 'droll', 'random' ].indexOf( type ) !== -1;

  if ( isRoll ) {
    match = msg.match( this.type[ type ].regexp )[ 2 ];
  }

  return this.parse( match, type );
};

module.exports = new Message();

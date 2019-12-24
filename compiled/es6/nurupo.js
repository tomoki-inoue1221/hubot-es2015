'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (robot) {
  robot.respond(/.*(random|抽選|選ぶ).*/, function (msg) {
    var url = 'https://slack.com/api/channels.list?token=xoxb-798159158694-872178173682-kP1Rq8yT9BK5Jl6pA4ACphvT';

    // チャンネル一覧を取得
    (0, _request2.default)(url, function (err, res, body) {
      // msg.message.room で現在の channel 名が取れる
      var channel = findChannel(JSON.parse(body).channels, msg.message.room);
      console.log('Channel found');
      console.log(channel);

      // bot 自身を除外して抽選
      var botId = robot.adapter.self.id;
      var filterdMembers = channel.members.filter(function (member) {
        return member !== botId;
      });
      console.log(filterdMembers);
      var member = msg.random(filterdMembers);

      msg.send('選ばれたのは、 <@' + member + '> でした :tea:');
    });
  });
};

function findChannel(channels, targetName) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var channel = _step.value;

      if (channel.name === targetName) {
        return channel;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};
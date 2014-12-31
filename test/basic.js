var test = require('tape');
var nock = require('nock');

test('riot api setup', function (t) {
    t.plan(1);
    var RiotApi = require('..');
    var key = '';
    var api = new RiotApi(key);

    t.ok(api);
});

test('champions api', function (t) {
    t.plan(2);
    var RiotApi = require('..');
    var key = '';
    var api = new RiotApi(key);

    var expected = [ { active: true, botEnabled: true, botMmEnabled: true, freeToPlay: true, id: 53, rankedPlayEnabled: true }, { active: true, botEnabled: true, botMmEnabled: true, freeToPlay: true, id: 81, rankedPlayEnabled: true }, { active: true, botEnabled: false, botMmEnabled: false, freeToPlay: true, id: 38, rankedPlayEnabled: true }, { active: true, botEnabled: false, botMmEnabled: false, freeToPlay: true, id: 57, rankedPlayEnabled: true }, { active: true, botEnabled: true, botMmEnabled: true, freeToPlay: true, id: 33, rankedPlayEnabled: true }, { active: true, botEnabled: false, botMmEnabled: false, freeToPlay: true, id: 113, rankedPlayEnabled: true }, { active: true, botEnabled: false, botMmEnabled: false, freeToPlay: true, id: 412, rankedPlayEnabled: true }, { active: true, botEnabled: false, botMmEnabled: false, freeToPlay: true, id: 67, rankedPlayEnabled: true }, { active: true, botEnabled: true, botMmEnabled: true, freeToPlay: true, id: 45, rankedPlayEnabled: true }, { active: true, botEnabled: false, botMmEnabled: false, freeToPlay: true, id: 238, rankedPlayEnabled: true } ];
    
    var scope = nock('https://na.api.pvp.net')
    .get('/api/lol/na/v1.2/champion?api_key=')
    .replyWithFile(200, __dirname + '/champions.json');
    
    api.getChampions({
        'region': 'NA',
        'filter': {
            'freeToPlay': true
        }
    }, function(data) {
        t.ok(data);
        t.deepEqual(data, expected);
    });
});

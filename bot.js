function post() {
		var Twit = require('twit');
		var T = new Twit({
				consumer_key: 'BZjJkcThvUM8MXndMPaCqUXQL',
				consumer_secret: '2w1HLvIBVCNVOWHVNJMF7pSX9EO3DwV9IjfMpPsDdIEEr9GC0f',
				access_token: '2837844623-ZM3548SVpuVasKXBQFgTqUSOL8sLB2NOZmSfhza',
				access_token_secret: 'jPyWIKhr3yrju909DNeTXWxGHZ59IixRSkAvx3uWgVlTu'
		});
		T.post('statuses/update', {
				status: 'hello world!'
		}, function (err, data, res) {
				if (err) {
						console.log(err);
				}
		});
}

post();
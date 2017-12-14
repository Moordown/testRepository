const fs = require('fs');
var a = {
	"first": {
		0:0, 1:1, 2:4, 3:9, 4:16
	},
	"second": {
		"-2":-8, "-1":-1, 0:0, 1:1, 2:8
	},
	"third": {
		0:0, 1:1, 2:2^(0.5), 3:3^(0.5), 4:4^(0.5)
	}
}
fs.writeFileSync("data.txt", JSON.stringify(a, "", 2), 'utf-8');

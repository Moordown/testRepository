String.prototype.getSum = function() {
	var sum = 0;
	for(var i=0; i<this.length; i++) {
		sum += +this.charCodeAt(i);
	}
	return sum;
}

String.prototype.getSquareSum = function() {
	var sum = 0;
	for(var i=0; i<this.length; i++) {
		sum += this.charCodeAt(i) * this.charCodeAt(i);	
	}
	return sum;
}

String.prototype.getPositionSum = function(base = 911, posMult = 2) {
	var sum = 0;
	for(var i=0; i<this.length; i++) {
		sum += (this.charCodeAt(i) * (Math.pow(posMult, i)))%base;	
	}
	return sum%base;
}

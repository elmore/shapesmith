// Scheduler.js - Tom Elmore 2014

var Stream = function(arr) {
	
	var _observers = []
	
	var _notifyObservers = function() {
		
		for(var i=0; i<_observers.length; i++) {
			
			_observers[i]();
		}
	};
	
	return {
		
		length : arr.length,
		
		shift : function() {
			
			var retVal = arr.shift();
			
			this.length = arr.length;
			
			_notifyObservers();
			
			return retVal;
		},
		
		push : function(val) {
			
			var retVal = arr.push(val);
			
			this.length = arr.length;
			
			_notifyObservers();
			
			return retVal;
		},
		
		observe : function(f) {
			
			_observers.push(f);
		}
	};
};

var TimedTask = function(arr) {
		
	var _freq;
	var _action;
	var _timer;
	
	this.every = function(milliseconds) {
		
		_freq = milliseconds;
		
		return this;
	};
	
	this.act = function(action) {
		
		_action = action;
		
		return this;
	};
	
	this.run = function() {
		
		_timer = setInterval(function() {
			
			if(arr.length > 0) {
				
				_action(arr.shift());
			}
			
		}, _freq);
		
		return this;
	};
	
	this.stop = function() {
		
		if(_timer != null) {
			
			clearInterval(_timer);
		}
	};
};

var Scheduler = {
				
	emit : function(arr) {
		
		return new TimedTask(arr);
	},
	
	stream : function(arr) {
			
		return new Stream(arr);
	}
};


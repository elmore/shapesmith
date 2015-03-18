// SchedulerSpec.js - Tom Elmore 2014 


describe("Scheduler", function() {
	
	it("exists", function(){

		expect(Scheduler).not.toBeNull();
	});

	it("emits an array of values one at a time", function(done) {
		
		var expected = [1, 2, 3, 4];
		var vals = [1, 2, 3, 4];
		
		var len = vals.length;
		
		var i = 0;
				
		var task = Scheduler.emit(vals).every(100).act(function(el) {
						
			if(i >= len-1) {
				
				task.stop();
				
				done();
				
				return;
			}

			expect(el).toBe(expected[i]);
			
			i++;
		});
		
		task.run();
	});
	
	it("accepts an observable array", function(done) {
		
		var expected = [1, 2, 3, 4];
		var vals = [1, 2, 3, 4];
		
		var stream = Scheduler.stream([]);
		
		var len = vals.length;
		
		var i = 0;
				
		var task = Scheduler.emit(stream).every(100).act(function(el) {
						
			if(i >= len-1) {
				
				task.stop();
				
				done();
				
				return;
			}

			expect(el).toBe(expected[i]);
			
			i++;
		});
		
		task.run();
		
		for(var j = 0; j<=expected.length; j++) {
			
			stream.push(expected[j]);
		}
	});
});


var monitor = require('http-monitor'),
	instapush = require('instapush'),
	last_downtime,
	notify = function(event, last_downtime){
	instapush.notify({"event":event,"trackers":{"last_downtime":last_downtime}},function(err,response){
	console.log(response);
	})
}
//set settings for instapush review Instapush API guide https://instapush.im/developer/rest 
//or https://www.npmjs.org/package/instapush
instapush.settings({
	id: 'xx',
	secret: 'xxx'
});	

//start monitoring
monitor('myappurl.com').on('error',function(){
	  last_downtime = new Date();
	  notify("error", last_downtime);
}).on('recovery',function(){
	  notify("recovery", last_downtime);

});
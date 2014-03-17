var monitor = require('http-monitor'),
	instapush = require('instapush'),
	last_downtime;

var notify = function(event, last_downtime){
	instapush.notify({"event":event,"trackers":{"last_downtime":last_downtime}},function(err,response){
	console.log(response);
	})
}

instapush.settings({
	id: 'ID',
	secret: 'SECRET'
});	

monitor('myurlsadsadasdasdas.com').on('connection-error',function(){
	  last_downtime = new Date();
	  notify("http-error", last_downtime);
}).on('recovery',function(){
	  notify("recovery", last_downtime);

});
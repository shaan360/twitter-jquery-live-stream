TwitterAPI = {
	Statuses: {
		
		search:function(query, count, callback){
			jQuery.getJSON("http://search.twitter.com/search.json?&q=" + query + "&count="+count+"&cb="+Math.random()+"&callback=?", callback);
		}
		
	}
};



window.ify=function(){var entities={'"':'"','&':'&','<':'<','>':'>'};return{"link":function(t){return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,function(m){return'<a href="'+m+'">'+((m.length>25)?m.substr(0,24)+'...':m)+'</a>';});},"at":function(t){return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,function(m,m1,m2){return m1+'@<a href="http://twitter.com/'+m2+'">'+m2+'</a>';});},"hash":function(t){return t.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,function(m,m1,m2){return m1+'#<a href="http://search.twitter.com/search?q=%23'+m2+'">'+m2+'</a>';});},"clean":function(tweet){return this.hash(this.at(this.link(tweet)));}};}();
window.tweet_stream = function(query) {
	TwitterAPI.Statuses.search(query,5,function(json){
		var content = $('#twitter-stream').html();
	
		var ids = new Array()
		$.each(json['results'].reverse(), function(i){
			var tweet = ify.clean(this['text']);
			var d = new Date(this['created_at']);
			var date_show = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
			content = '<li id="'+ this['id'] + '">' + tweet + ' (<date>'+date_show+'</date>)</li>' + content;
			if(! $('#' + this['id']).length)
				ids.push(this['id']);
		});
		$('#twitter-stream').html(content);
		
		$.each(ids, function(id) {
			
			$("#" + ids[id]).show('slow')
		})
	});
	setTimeout(function() { tweet_stream(query); }, 10000);
	
}
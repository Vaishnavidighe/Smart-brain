const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '0abbfb83e29f4ea7ab62efe1919f167a'
});

const handleApiCall = (req,res) =>{
//app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input) latest clarifai syntax 	
	app.models
	//.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req,res,db)=>{
	const {id}= req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(404).json('error getting entries'))

	//iniatl setup
	// let found = false;
	// database.users.forEach(user =>{
	// 	if(user.id === id){
	// 		found = true;
	// 		user.entries++;
	// 		return res.json(user.entries);
	// 	}
	// })
	// if(!found)
	// 	res.status(404).json('no such user');
}

module.exports = {
	handleImage: handleImage, //two ways to write - first
	handleApiCall // second -- cz both args are same
}
const Movie = require('../models/movies')

async function showMovies(req, res) {
    try {
        // Assuming user information (including age) is attached to req.user
        // const { age } = req.user;
        const query = {};

        // Apply filters from query parameters if they exist
        if (req.query.title) {
            query.title = new RegExp(req.query.title, 'i'); 
        }
        if (req.query.director) {
            query.director = new RegExp(req.query.director, 'i'); 
        }
        if (req.query.country) {
            query.country = new RegExp(req.query.country, 'i'); 
        }

        // Exclude R-rated movies for users under 18
        // if (age < 18) {
        //     query.rating = { $ne: 'R' };
        // }

      
        const movies = await Movie.find(query);
        res.json(movies);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function searchMovies(req,res){
    try{
        const {title,cast} = req.query;

        if(!title && !cast){
            return res.status(400).json({message:'Title or cast is required'});
        }
        let query = {}
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        if (cast) {
            query.cast = { $regex: cast, $options: 'i' }; 
        }

        const movies = await Movie.find(query)
        if(movies.length===0){
            return res.status(404).json({message:'No movies found'});
    
        }
        return res.status(200).json(movies);
    }catch(error){
        console.error(error);
        return res.status(500).json({message:'server error'})
    }


}


async function searchMovieById(req,res) {
    try {
        const movieId = req.params.id;

        const movie = await Movie.findById(movieId);
        if(!movie){
            return res.status(404).json({message:"movie not found"})
        }

        res.json(movie)
    } catch (error) {
        console.error('error fetching movie',error)
        res.status(500).json({message:'Server error'})

        
    }
    
}

async function filterItems(req,res){
    try{
        const {type} = req.query;
        if(!type){
            return res.status(400).json({message:"Type paramter missing"})
        }
    
        if (type!== 'Movie' && type!== 'TV Show') {
            return res.status(400).json({ message: 'Invalid type parameter' });
          }

          const media = await Movie.find({ type: type });
          if(media.length===0){
            return res.status(404).json({message:'No Media Found'})
          }

          return res.status(200).json(media);
      

    }catch(error){
        return res.status(500).json({ message: 'Server error' });


    }

}
module.exports ={ searchMovies,filterItems,showMovies,searchMovieById}
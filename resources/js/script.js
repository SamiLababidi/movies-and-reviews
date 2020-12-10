// This function will make an API call to http://www.omdbapi.com to get the search results
function searchMovies() {

	// Retrieve the user input
	let search_text = document.getElementById("search_text").value;
	let url = `https://www.omdbapi.com/?apikey=d2ae3254&s=${search_text}`;


	$.ajax({url:url, dataType:"json"}).then(function(data) {
		
		if (data.Response == "False") {
			document.getElementById('error_message').innerHTML =  ` <br><div class="alert alert-danger col-8" role="alert">
																	  No movies were found. Please try a different name!
																	</div>`; 
			return;
		} else {document.getElementById('error_message').innerHTML = "";}
	    let returned_movies = data.Search;
	    let cards = '';
	    let modals = '';
	    returned_movies.forEach( function(element, index) {
	    let name = element.Title;
	    let poster = element.Poster;
	    let id = element.imdbID;
	    cards += `<div class="col-md-4 col-6" id="card">
				    <div class="card">
				        <img class="card-img-top" src="${poster}">
				        <div class="card-body">
				            <p class="card-text">${name}</p>
				            <a href="#review_modal" class="btn btn-primary btn-sm float-left" data-toggle="modal" onclick="document.getElementById('movie').value = \`${name}\`">Add Review</a>
				        </div>
				    </div>
				  </div>`;

    });
    
    document.getElementById('search_results').innerHTML = cards;

 })
}

$("#search_text").keyup(function(event) { 
            if (event.keyCode === 13) { 
                $("#submit_search").click(); 
            } 
        });











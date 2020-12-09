// This function will make an API call to http://www.omdbapi.com to get the search results
function searchMovies() {

	// Retrieve the user input
	let search_text = document.getElementById("search_text").value;
	if (search_text == '') {window.alert('Please enter a text to search'); return;}
	let url = `http://www.omdbapi.com/?apikey=d2ae3254&s=${search_text}`;


	$.ajax({url:url, dataType:"json"}).then(function(data) {
    let returned_movies = data.Search;
    console.log(data);
    let cards = '';
    let modals = '';
    returned_movies.forEach( function(element, index) {
    var name = element.Title;
    var poster = element.Poster;
    var id = element.imdbID;
    cards += `<div class="col-md-4 col-6" id="card">
			    <div class="card">
			        <img class="card-img-top" src="${poster}">
			        <div class="card-body">
			            <p class="card-text">${name}</p>
			            <a href="#${id}" class="btn btn-primary btn-sm float-left" data-toggle="modal">Add Review</a>
			        </div>
			    </div>
			  </div>`;

	modals += `<div id="${id}" class="modal fade bd-example-modal-lg">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
					    <div class="modal-header">
							<h4 class="modal-title">Add Review</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
					    <div class="modal-body">
					    <form action="/" method="post">
					    	<div class="form-group row">
    							<label for="movie" class="col-sm-4 col-form-label">Movie Name</label>
    							<div class="col-sm-8">
      								<input type="text" readonly class="form-control" name="movie" id="movie" value="${name}">
    							</div>
  							</div>
  							<div class="form-group row">
    							<label for="review" class="col-sm-4 col-form-label">Enter Your Review Here:</label>
    							<div class="col-sm-8">
      								<textarea class="form-control" name="review" id="review" rows="5"></textarea>
    							</div>
  							</div>
  							<button type="submit" class="btn btn-primary btn-sm float-right">Submit</button>
					    </form>
					    <br>
					    </div>
					</div>
				</div>
			 </div>`;
    });

    document.getElementById('search_results').innerHTML = cards + modals


 })
}

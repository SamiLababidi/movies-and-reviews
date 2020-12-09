// This function will make an API call to http://www.omdbapi.com to get the search results
function searchMovies() {

	// Retrieve the user input
	let search_text = document.getElementById("search_text").value;
	if (search_text == '') {window.alert('Please enter a text to search'); return;}
	let url = `https://www.omdbapi.com/?apikey=d2ae3254&s=${search_text}`;


	$.ajax({url:url, dataType:"json"}).then(function(data) {
    let returned_movies = data.Search;
    let cards = '';
    let modals = '';
    returned_movies.forEach( function(element, index) {
    let name = element.Title;
    let fixedName = name.replace("'", "");
    let poster = element.Poster;
    let id = element.imdbID;
    cards += `<div class="col-md-4 col-6" id="card">
			    <div class="card">
			        <img class="card-img-top" src="${poster}">
			        <div class="card-body">
			            <p class="card-text">${name}</p>
			            <a href="#review_modal" class="btn btn-primary btn-sm float-left" data-toggle="modal" onclick="document.getElementById('movie').value = '${fixedName}'">Add Review</a>
			        </div>
			    </div>
			  </div>`;

    });

    document.getElementById('search_results').innerHTML = cards;


 })
}













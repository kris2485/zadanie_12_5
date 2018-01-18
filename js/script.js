// script.js

//Drugi adres do wysyłania tweetów, trzeci do pobierania cytatów
var prefix = "https://cors-anywhere.herokuapp.com/"; //Prefix rozwiązujący problem CORS
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

//Metoda, która pobierze losowy cyctat za pomocą API, w skróconej wersji, w formie funkcji
function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
    $.ajaxSetup({ cache: false }); 
}

//Funkcja tworząca linki z tweetami i podpinająca je pod przycisk do tweetowania
function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
	
	//Instukcja sprawdzająca czy nie przekraczamy max długości znaków
    if (tweetText.length > 280) {
    	getQuote();
    } else {
	    var tweet = tweetLink + encodeURIComponent(tweetText); //Zmienna tweet to złożenie dwóch elementów: linka do generowania nowych tweetów oraz samego tekstu tweeta
	    $('.quote').text(quoteText); //Element, w którym wyświetlamy treść naszego cytatu
	    $('.author').text("Author: " + quoteAuthor); //Element, który pokazuje autora cyctatu
	    $('.tweet').attr('href', tweet); //Wybieramy element z klasą .tweet i modyfikujemy zawartość atrybutu href na URL tweeta, który trzymany jest w zmiennej tweet
	}
}
	$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});
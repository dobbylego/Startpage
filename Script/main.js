function updateTime() {
	
	//leading zero for single digits
	function leadZero(n) {
		if (n < 10) {
		n = "0" + n;}
	return n;}
	
	//Local time
	var c = new Date();
	var hr = leadZero(c.getHours());
	var min = leadZero(c.getMinutes());
	var sec = leadZero(c.getSeconds());
	var hrOut = 0;
	
	var dayH = c.getDay();
	var dateH = c.getDate();
	var monH = c.getMonth();
	var yr = c. getFullYear();
	
	//Substitute date
	var dayN = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	var dateN = [ "0", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st", "wat" ];
    var monN = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var day = dayN[dayH]
	var date = dateN[dateH]
	var mon = monN[monH]
	
	//"World" time
	var utcH = c.getUTCHours();
	var cstH = utcH+8
	var jstH = utcH+9
	
	//Correct time for 12 hour instead of 24
	if (hr > 12){
		hrOut = hr-12;}
	else hrOut = hr;
	
	//Correct time when over 24h
	if (cstH >= 24){
		cstH = cstH-24;}
	
	if (jstH >= 24){
		jstH = jstH-24;}
		
	//Output
	$('#Time').html(hrOut + ":" + min + ":" + sec);
	$('#Week').html(day);
	$('#Date').html(mon + " " + date + " " + yr);
	$('#UTC').html(leadZero(utcH) + ":" + min);
	$('#CST').html(leadZero(cstH) + ":" + min);
	$('#JST').html(leadZero(jstH) + ":" + min);
	
}
setInterval(updateTime, 250);

//Random background on page load
//This could be a lot shorter if they all have the same extension but since this is a startpage so I value aesthetics more than code tidyness...
function randomBG(){
	var images=['Images/1.jpg',
				'Images/2.jpg',
				'Images/3.jpg',
				'Images/4.jpg',
				'Images/5.jpg',
				'Images/6.jpg',
				'Images/7.jpg',
				'Images/8.jpg',
				'Images/9.jpg',
				'Images/10.png',
				'Images/11.jpg',
				'Images/12.jpg',
				'Images/13.jpg',
				'Images/14.jpg',
				'Images/15.jpg',
				'Images/16.jpg',
				'Images/17.jpg'];
	
	$('.BG').css("background", "url("+ images[Math.floor(Math.random() * images.length)] + ") no-repeat center center fixed");
	$('.BG').css("background-size", "cover");
	//Only way to get rid of white borders DO NOT middle click in Firefox or it ruins everything
	$('.BG').css("transform", "scale(1.05)");
}

//Weather, directly copied from simpleWeather.js but with location disabled because firefox asks for permission every time
function getWeather(location, unit) {
	$.simpleWeather({
		location: 'Seattle, WA',
		unit: 'c',
		success: function(weather) {
			$('.Weather-Location').html(weather.city + ', ' + weather.region);
			$('.Weather-TempC').html(weather.temp + weather.units.temp + '&deg;');
			$('.Weather-TempR').html(weather.low + weather.units.temp + '&deg;' + ' ~ ' + weather.high + weather.units.temp + '&deg;');
			$('.Weather-Condition').html(weather.currently);
			$('.Weather-Icon').html('<span class="icon-' + weather.code + '"></span>');
		},
		error: function(error) { $('.Weather-Location').html(error); }
	});
}

//Get public IP address
function getIP(json) {
	document.getElementById('PublicIP').innerHTML = json.ip;
}

//Blur darken / unblur lighten background using HTML DOM events
//WHY THE FUCK DOESN'T CSS HAVE PARENT SELEECTORS ALREADY
function blurBG() {
	$('.BG').css("filter", "blur(5px) brightness(75%)");
}

function unblurBG() {
	$('.BG').css("filter", "none");
}

//Initialize everything
$(document).ready(
	function() {
		randomBG();
		updateTime();
		getWeather();
		getIP(json);
	}
);
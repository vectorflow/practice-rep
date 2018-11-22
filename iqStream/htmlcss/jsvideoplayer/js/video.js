var video, hotLinkURL;

// You are welcome to use my files, but please host them on your own server. Oh, and especially make sure you don't link to the file mint.js - it screws up my stats, and it makes it a lot easier for me to find you >:-(
hotLinkURL = document.location.href;
hotLinkURL = hotLinkURL.indexOf('itjobtrainers.com');
if(hotLinkURL === -1) {
	window.alert('DO NOT HOTLINK MY FILES. YOU ARE WELCOME TO HOST THEM ON YOUR OWN SERVER.');
}

function setValue() {
	video = document.getElementById('video');
	playVid();
}

function checkStatus() {
	video.addEventListener('canplay',playVid,true);
}

function playVid() {
// Create variables for all relevant elements
//	var video = document.getElementById('video');
	var pause =  document.getElementById('pause');
	var play =  document.getElementById('play');
	var timer = document.getElementById('timer');
	var duration = document.getElementById('duration');
	var volume = document.getElementById('volume');
	var vUp = document.getElementById('v-up');
	var vDn = document.getElementById('v-dn');
	var t; // This is for the timer
// Set some initial values in the page
	volume.firstChild.nodeValue = Math.round(video.volume*10);
	duration.firstChild.nodeValue = Math.round(video.duration);
// Function to begin the timer
	function startCount() {
		t = window.setInterval(function() {
			if (video.ended != true) {
				timer.firstChild.nodeValue = Math.round(video.currentTime + 1);
			} else {
				play.firstChild.nodeValue = 'Play';
				window.clearInterval(t);
			}
		},1000);
	}
// Function to pause the timer
	function pauseCount() {
		window.clearInterval(t);
	}
	console.log('I am here');
// Play & pause when the control is clicked
	play.addEventListener('click',playControl,false);
	video.addEventListener('click',playControl,false);
	video.addEventListener('webkitendfullscreen', function (e) {
		console.log('Paused', e.srcElement.currentTime);
	});
	function playControl() {
		if (video.paused == false) {
			video.pause();
			this.firstChild.nodeValue = 'Play';
			pauseCount();
		} else {
			video.play();
			this.firstChild.nodeValue = 'Pause';
			duration.firstChild.nodeValue = Math.round(video.duration);
			startCount();
		}
	}
// Increase the volume
	vUp.addEventListener('click',volUp,false);
	function volUp() {
		if (video.volume < 1) {
			video.volume = Math.round((video.volume + 0.1)*10)/10;
			volume.firstChild.nodeValue = Math.round(video.volume*10);
		}
	}
// Decrease the volume
	vDn.addEventListener('click',volDown,false);
	function volDown() {
		if (video.volume > 0) {
			video.volume = Math.round((video.volume - 0.1)*10)/10;
			volume.firstChild.nodeValue = Math.round(video.volume*10);
		}
	}
}

window.onload = setValue;

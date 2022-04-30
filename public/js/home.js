var slider = document.getElementById("BPM_Range");
var slider_output = document.getElementById("BPM_Val");
var custom_bpm = document.getElementById("BPM_Custom"); 
var checkBox = document.getElementById("vibration_switch");
let vibrateIntervalId = 0;

slider_output.innerHTML = slider.value;

window.addEventListener('load', function() {

	var rangeslider = document.getElementById("BPM_Range");

	if (!("vibrate" in navigator) || !isMobile()) {
		document.getElementById('vibration_switch').checked = false;
	}
	else {
		startVibrate();
	}
	var images = document.getElementById("sliderImages");
  
	rangeslider.addEventListener('input', function() {
	  for (var i = 0; i < images.children.length; i++) {
		images.children[i].style.display = 'none';
	  }
	  i = Number(this.value) - 1;
	  if (rangeslider.value < 2) {
		//tombstone animation
		images.children[0].style.display = 'block';
	  } else if ((rangeslider.value >= 2) && (rangeslider.value <= 35)) {
		//whale animation
		images.children[4].style.display = 'block';
	  } else if ((rangeslider.value > 35) && (rangeslider.value <= 55)) {
		//ant animation
	  	images.children[1].style.display = 'block';
	  }
	  else if((rangeslider.value > 55) && (rangeslider.value <= 100)){
		//resting human heart
		images.children[2].style.display = 'block';
	  } else if((rangeslider.value > 100) && (rangeslider.value <= 180)){
		//exercising human
		images.children[3].style.display = 'block';
	  } else if((rangeslider.value > 750) && (rangeslider.value <= 1200)){
		  //pigmy shrew will go here
	  } else {
		for (var i = 0; i < images.children.length; i++) {
			images.children[i].style.display = 'none';
		}
	  }

	});
});

slider.oninput = function() {
	slider_output.innerHTML = this.value;
	var canVibrate = !document.getElementById('vibration_switch').checked;
	if (canVibrate) { 
		changeVibrate(this.value);
	}
	
}

if (custom_bpm) {
	custom_bpm.addEventListener('change', (event) => {
		changed_value = event.target.value;
		//adding a max of 3000 for the custom bpm becasue of limits of the phone vibration
		if (changed_value > 3000) {
			changed_value = 3000;
			custom_bpm.value = 3000;
		}

		slider_output.innerHTML = changed_value;
		//change the slider value only if the custom value is within the range of the slider
		if (changed_value < 1200)
			slider.value = changed_value;
		console.log('Cusom bpm event with value: ' + changed_value);
	});
}


const startVibrate = () => {
	clearInterval(vibrateIntervalId);
	var val = Math.floor(1000 / (slider.value / 60));
	console.log("Vibrating at: " + slider.value + " BPM");
	vibrateIntervalId = setInterval(() => navigator.vibrate(50), val);
};
const stopVibrate = () => {
    clearInterval(vibrateIntervalId);
	console.log("Stopping Vibrating");
    navigator.vibrate(0);
};

const changeVibrate = (val) => {
	clearInterval(vibrateIntervalId);
	var value = Math.floor(1000 / (val / 60));
	console.log("Changing vibration to: " + val + " BPM");
	vibrateIntervalId = setInterval(() => navigator.vibrate(50), value);
};
document.getElementById('vibration_switch').addEventListener('change', (event) => {
	//event
	var doNotVibrate = event.currentTarget.checked;

	//Cancel event if vibration is not supported
	if (!("vibrate" in navigator) || !isMobile()) {
		if (doNotVibrate === true) {
			//Only alert if they are trying to turn "on" vibrate
			alert("Vibrate not supported!");
			event.currentTarget.checked = false;
		}
		return;
	}

	if (doNotVibrate === false) {
		startVibrate();
	}
	else {
		stopVibrate();
	}
	console.log("Change event: " + event.currentTarget.checked);
});

const isMobile = () => {
    const nav = navigator.userAgent.toLowerCase();
    return (
        nav.match(/iphone/i) || nav.match(/ipod/i) || nav.match(/ipad/i) || nav.match(/android/i)
    );
};

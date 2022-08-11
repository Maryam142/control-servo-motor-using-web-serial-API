var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
 
var Textbox = $("#textarea");
var instructions = $("#instructions");

var Content = "";

recognition.continuous = true;

recognition.onstart= function(){
    instructions.text("Voice recognition is on..");

}

recognition.onspeechend = function() {
  instructions.text("No Activity!")
 }
 
 recognition.onerror = function() {
    instructions.text('No speech was detected. Try again.');  
 }
 

recognition.onresult = function (event) {
    var current = event.resultIndex;
  
    var transcript = event.results[current][0].transcript;
  
    Content += transcript;
    Textbox.val(Content);
  };
  
  $("#start").click(function(event){

    if(Content.length){
      Content+='';
    }

    recognition.start();
  });
   


  Textbox.on('input', function () {
    Content = $(this).val();
  });


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//detect the Web Serial API#
if ("serial" in navigator) {
  // The Web Serial API is supported.
}

//Open a serial port #
  // Prompt user to select any serial port.
  document.querySelector("#button1" ).addEventListener('click', async () => {

   port = await navigator.serial.requestPort();
   await port.open({ baudRate: 9600 });
   
//Read from a serial port#
   const textDecoder=new TextDecoderStream();
   const readableSteamClosed=port.readable.pipeTo(textDecoder.writable);
   const reader = port.readable.getReader();

// Listen to data coming from the serial device.
while (true) {
  const { value, done } = await reader.read();
  if (done) {
    // Allow the serial port to be closed later.
    reader.releaseLock();
    break;
  }
  // value is a Uint8Array.
  console.log(value);

//Write to a serial port#
const textEncoder = new TextEncoderStream();
const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

const writer = textEncoder.writable.getWriter();

await writer.write(Content);
writer.close();
await writableStreamClosed;

}
   
});

//Close a serial port #
await port.close();




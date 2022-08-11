//Definitions section:
#include <Servo.h>
Servo myServo1;
int val=0;

//setup section:
void setup(){
myServo1.attach(9); //define digital servo motor port pwm  number 9
Serial.begin(9600); // Number of bits the arduino can receive per second 115200 bits 
Serial.setTimeout(10); // This is how long the arduino will wait for a message 10 milliseconds
}

//loop section:
void loop() {
String data=Serial.readString();
if (data.indexOf("right")>-1){
  val=0;   
  Serial.println("right");
  
  }elseif(data.indexOf("left")>-1){
     val=180;
     Serial.println("left"); 
 
  }else{
     Serial.write("0");
    }
    
myServo1.write(val);

delay(1000);
  
  

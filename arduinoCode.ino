//Definitions section:
#include <Servo.h>
Servo myServo1;
int val=0;

//setup section:
void setup(){
myServo1.attach(9); //define digital servo motor port pwm  number 9
Serial.begin(115200); // Number of bits the arduino can receive per second 115200 bits 
Serial.setTimeout(10); // This is how long the arduino will wait for a message 10 milliseconds
}

String getValue(String data, char separator, int index){
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

//loop section:
void loop() {
val =  getValue(computerText, '-',0).toInt(); 
val = map (val , 0 , 1023 , 0 , 180) ;
myServo1.write(val);
Serial.println("WORKING");
delay(1000);
}
  
  
  
  
  

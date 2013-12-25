int buttonPin = 5; 			 // pin of button
int laststate = 0;         // variable for reading the pushbutton status

void setup() {
    Spark.variable("laststate", &laststate, INT);
}

void loop() {
 	pinMode(buttonPin, INPUT_PULLDOWN);
	laststate = digitalRead(buttonPin);
	delay(10);
}

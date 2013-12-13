int buttonPin = 5; 			 // pin of button
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {
	Spark.function("laststate", laststate);
}

void loop() {
	pinMode(buttonPin, INPUT_PULLDOWN);
	buttonState = digitalRead(buttonPin);
	delay(250);
}

int laststate(String command)
{
	return buttonState;
}

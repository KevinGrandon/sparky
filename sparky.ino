// This file is a general endpoint for API requests
// It is similar to Tinker, but the goal is to support a much larger
// set of devices and components. Hopefully we can contribute similar
// changes in the future to the core tinker app.


class Component
{
  public:
    Component();
	Component(int pin, String command)
	{
		_command = command;
		_pin = pin;
	}

	int write(String command)
	{
		return 1;
  	}

  	int read(String command)
	{
		return digitalRead(_pin);
	}
  private:
    String _command;
    int _pin;
};

class SparkyButton : public Component
{
  public:
    SparkyButton();
	SparkyButton(int pin, String command)
	{
		_pin = pin;
		pinMode(pin, INPUT_PULLDOWN);
	}
    
	int read()
	{
		return digitalRead(_pin);
	}
  private:
    int _pin;
    int _current = 0;
};

class SparkyServo : public Component
{
  public:
    SparkyServo();
	SparkyServo(int pin, String command)
	{
		_pin = pin;
		_servo.attach(_pin);
	}

	int write(int val)
	{
		_servo.write(val);
		return 1;
  	}
  private:
    Servo _servo;
    int _pin;
};

// Array of components
// Each "component" sits on a pin
Component components[14];

void setup() {
	Spark.function("attach", attach);
	Spark.function("read", read);
	Spark.function("write", write);
}

void loop() {

}

int attach(String command)
{
	char* buf = strdup(command);
	String type = strtok(buf, ",");
	int pin = atoi(strtok(NULL, ","));

	if (type === "servo") {
		components[pin] = new SparkyServo(pin, command);
		return 1;
	} else if (type === "button") {
		components[pin] = new SparkyButton(pin, command);
		return 1;
	}
	return -1;
}

int write(String command)
{
	char* buf = strdup(command);
	int pin = atoi(strtok(buf, ","));
	components[pin].write(command);
	return 1;
}

int read(String command)
{
	char* buf = strdup(command);
	int pin = atoi(strtok(buf, ","));
	components[pin].read(command);
	return 1;
}

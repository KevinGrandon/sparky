// This file is a general endpoint for API requests
// It is similar to Tinker, but the goal is to support a much larger
// set of devices and components. Hopefully we can contribute similar
// changes in the future to the core tinker app.

// Array of components
// Each "component" sits on a pin
Component[14] *components;

void setup() {
	Spark.function("attach", attach);
	Spark.function("read", read);
	Spark.function("write", write);
}

void loop() {

}

int attach(String command)
{
	String type = strtok(command, ",");
	int pin = atoi(strtok(NULL, ","));

	if (type === "servo") {
		components[pin] = new SparkyServo(pin, _command);
		return 1;
	} else if (type === "button") {
		components[pin] = new SparkyButton(pin, _command);
		return 1;
	}
	return -1;
}

int write(String command)
{
	int pin = atoi(strtok(command, ","));
	components[pin] -> write(command);
	return 1;
}

int read(String command)
{
	int pin = atoi(strtok(command, ","));
	components[pin] -> read(command);
}

class Component
{
  public:
    Component();
	Component(int pin, String command)
	{
		_command = command;
		_pin = pin;
	}

	virtual void write()
	{
  	}

  	virtual int read()
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
    
	virtual int read()
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
	SparkyServo(String command)
	{
		_pin = atoi(strtok(NULL, ","));
		_servo.attach(_pin);
	}

	virtual void write(int val)
	{
		_servo.write(val);
  	}
  private:
    Servo _servo;
    int _pin;
};

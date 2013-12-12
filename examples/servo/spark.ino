Servo servo;

void setup() {
    Spark.function("servowrite", servowrite);
    servo.attach(10);
}

void loop() {

}

int servowrite(String command)
{
        //convert ascii to integer
        int pinNumber = command.charAt(1) - '0';
        //Sanity check to see if the pin numbers are within limits
        if (pinNumber< 0 || pinNumber >7) return -1;

        String value = command.substring(3);

        if(command.startsWith("A0"))
        {
            servo.write(value.toInt());
            return 1;
        }
        else return -1;
}

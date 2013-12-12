Servo servo;

void setup() {
    Spark.function("servowrite", servowrite);
    servo.attach(10);
}

void loop() {

}

int servowrite(String command)
{
        if(command.startsWith("A0"))
        {
            String value = command.substring(3);
            servo.write(value.toInt());
            return 1;
        }
        else return -1;
}

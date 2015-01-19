// Equations de vol simplifiées d'un quad-drone en mode manuel


#pragma strict

var powerPosition : float = 0;
var yawPosition : float = 0;
var pitchPosition : float = 0;
var bankPosition : float = 0;

var touchScreenInput : boolean = false;
var sonyPS3Input : boolean = true;
var joystickLeft : Joystick;
var joystickRight : Joystick;

function Start () {

}

function Update () {
	// 1 - Lecture de la position des commandes de vol et de puissance
	if (sonyPS3Input) {
		powerPosition = Input.GetAxis ("Joystick1AxeY");
		yawPosition = Input.GetAxis ("Joystick1AxeX"); 
		pitchPosition = Input.GetAxis ("Joystick2AxeY");
		bankPosition =  Input.GetAxis ("Joystick2AxeX");
		if (powerPosition<0) powerPosition = 0;
	} else if (touchScreenInput) {
		powerPosition = joystickLeft.position.y;
		yawPosition = -joystickLeft.position.x; 
		pitchPosition = joystickRight.position.y;
		bankPosition =  -joystickRight.position.x;
		if (powerPosition<0) powerPosition = 0;
	} else {
		powerPosition = Input.GetAxis ("Vertical1");
		yawPosition = Input.GetAxis ("Horizontal1"); 
		pitchPosition = Input.GetAxis ("Vertical2");
		bankPosition =  Input.GetAxis ("Horizontal2");
		if (powerPosition<0) powerPosition = 0;
	}
	
}
#pragma strict
var joystick : jb_Joystick;

var yRotation : float = 20;

function Start () {
	
}

function Update () {

	transform.eulerAngles = Vector3(0, yRotation, 0);

}
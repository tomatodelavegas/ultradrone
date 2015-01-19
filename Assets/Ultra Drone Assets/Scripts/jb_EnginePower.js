// Equations de vol simplifiées d'un quad-drone en mode manuel


#pragma strict

var force : float = 0.0;
var torque : float = 10.0;
var gainRotation : float = 5.0;
var gainForce : float = 20;
var facteurTorquevsForce : float = 2.0;

var pitchSign : boolean = false;
var bankSign : boolean = false;
var yawSign : boolean = false;


var idMoteur : int = 1; // à modifier en fonction du moteur concerné :-)
// idMoteur represente la position du moteur dans le quad - drone.
//
// (1 et 2) sont à (l'avant gauche et droite),
// (3 et 4) sont à (l'arrière gauche et droite) :
//
// 1 2
// 3 4


var joystick : jb_Stabilizer;

function Start () {

}

function Update () {
	
	// 1 - Lecture de la position des commandes de vol et de puissance
	var joyPower : float = joystick.powerPosition;
	var joyYaw : float = joystick.yawPosition; 
	var joyPitch : float = joystick.pitchPosition;
	var joyBank : float =  joystick.bankPosition;
	
	// 2 - Calcul de la force en fonction de l'id moteur et de la position des gouvernes de Puissance, Tangage, Lacet et Rouli :
	//
	//   Les moteurs 1 et 4 tournent dans le même sens
	//   Les moteurs 2 et 3 tournent dans le même sens, mais contraire à celui de 1 et 4... et donc générent un couple sur l'axe
	//     de lacet inverse à celui de 1 et 4
	//     (les pas des hélices 1 et 4 sont idendiques, et contraires à celui des hélices 2 et 3)
	//
	//
	//   Rotation autour de l'axe de lacet :
	//     On augmente/diminue la vitesse de rotation de (1 et 4) tout en réduisant/augmentant la vitesse de rotation de (2 et 3)
	//
	//   Rotation autour de l'axe de tangage :
	//     On augmente/diminue la vitesse de rotation de (1 et 2) tout en réduisant/augmentant la vitesse de rotation de (3 et 4)
	//
	//   Rotation autour de l'axe de rouli : 
	//     On augmente/diminue la vitesse de rotation de (1 et 3) tout en réduisant/augmentant la vitesse de rotation de (2 et 4)
	//
	//   Montée/Descente
	//     On augmente/diminue toutes les vitesses de rotation
	//
	// ... et on mixe tout ca, ce qui donne :
	
	if (idMoteur==1) {
		force = joyPower * gainForce + (- joyPitch - joyBank - joyYaw) * gainRotation;
		torque = facteurTorquevsForce * force; // hélice sens normal
	}
	else if (idMoteur==2) {
		force = joyPower * gainForce + (- joyPitch + joyBank  + joyYaw) * gainRotation;
		torque = - facteurTorquevsForce * force; // hélice sens inverse
	}
	else if (idMoteur==3) {
		force = joyPower * gainForce + (  joyPitch - joyBank  + joyYaw) * gainRotation;
		torque = - facteurTorquevsForce * force; // hélice sens inverse
	}
	else if (idMoteur==4) {
		force = joyPower * gainForce + (  joyPitch + joyBank - joyYaw) * gainRotation;
		torque = facteurTorquevsForce * force; // hélice sens normal
	}

}

function FixedUpdate () {
	// Application des forces et du torque associé au niveau du moteur... orientés suivant l'axe verticale.
	rigidbody.AddRelativeForce (0, force, 0);
	rigidbody.AddRelativeTorque (0, torque, 0);
}

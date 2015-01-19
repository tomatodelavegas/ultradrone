// Equations de vol simplifiées d'un quad-drone en mode manuel


#pragma strict

// IN : position du joystick et orientation du drone
var joystick : jb_Joystick;
var ahrs : jb_AHRS;

// OUT : position à donner aux commandes de vol (-1,+1)
var pitchPosition : float = 0;
var bankPosition : float = 0;
var yawPosition : float = 0;
var powerPosition : float = 0;

// facteurs des asservissments pour chacun des axes (équivalent aux Kd, Ki...)
var g1Bank : float = -0.1;
var g2Bank : float = -0.1;

var g1Pitch : float = -0.1;
var g2Pitch : float = -0.1;

var g1YawRate : float = -0.01;
var g2YawRate : float = -0.01;

// butée orientation et vitesse de rotation du drone
var maxYawRate : float = 60;
var maxPitch : float = 30;
var maxBank: float = 30;

// autopilots
var autoBank : AutoPilot;
var autoPitch : AutoPilot;
var autoYaw : AutoPilot;

function Start () {
	autoBank = new AutoPilot(g1Bank,g2Bank,-.2,.2);
	autoPitch = new AutoPilot(g1Pitch,g2Pitch,-.2,.2);
	autoYaw = new AutoPilot(g1YawRate,g2YawRate,-1.0,1.0);
}

function Update () {
	var dt : float = Time.deltaTime;

	// 1 - Lecture de la position des commandes de vol et de puissance
	var joyPower : float = joystick.powerPosition;
	var joyYaw : float = joystick.yawPosition; 
	var joyPitch : float = joystick.pitchPosition;
	var joyBank : float =  joystick.bankPosition;

	//2 - Calcul des positions des cdv
	pitchPosition = autoPitch.Compute(dt, -joyPitch * maxPitch - ahrs.pitch());
	bankPosition = autoBank.Compute(dt,-joyBank * maxBank - ahrs.bank());
	yawPosition = autoYaw.Compute(dt, joyYaw * maxYawRate - ahrs.yawRate);
	powerPosition = joystick.powerPosition;
}


public class AutoPilot {

	public var pos : float = 0;
	public var g1 : float = 0;
	public var g2 : float = 0;
	public var minPos : float = -1.0;
	public var maxPos : float = 1.0;

	var oldDelta : float = 0;

	// var myAutopilot : AutoPilot = new AutoPilot(deltaGain,deltaAccelerationGain);
	public function AutoPilot (gain1:float, gain2:float, minPosition:float, maxPosition:float) {
		g1 = gain1;
		g2 = gain2;
		minPos = minPosition;
		maxPos = maxPosition;
	}

	public function Compute(dt : float, delta : float) : float {
		var deltaSpeed = (delta-oldDelta) / dt;
		oldDelta = delta;
		pos = pos + dt * (delta * g1 + deltaSpeed * g2);
		if (pos>maxPos) pos = maxPos;
		if (pos<minPos) pos = minPos;
		return pos;
	}
}
    
    

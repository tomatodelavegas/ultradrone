#pragma strict

var yawRate : float = 0;
var pitchRate : float = 0;
var bankRate : float = 0;

private var oldHeading : float = 0;
private var oldPitch : float = 0;
private var oldBank : float = 0;

function Start () {
}

function Update() {
	var dt : float = Time.deltaTime;

	yawRate = deltaHeading() / dt;
	pitchRate = deltaPitch() / dt;
	bankRate = deltaBank() / dt;	
}

public function heading() : float {
	var heading : float = 90 - Mathf.Atan2(transform.forward.z, transform.forward.x) * Mathf.Rad2Deg;
	if (heading<0) heading+=360;
	return heading;	
}

public function pitch() : float {
	var pos = ProjectPointOnPlane(Vector3.up, Vector3.zero, transform.forward);
	return SignedAngle(transform.forward, pos, transform.right);
}

public function bank() : float {
	var pos = ProjectPointOnPlane(Vector3.up, Vector3.zero, transform.right);
	return SignedAngle(transform.right, pos, transform.forward);
}
 
function deltaHeading() {
	var deltaHeading : float = (heading() - oldHeading);
	oldHeading = heading();
	if (deltaHeading>180.0) deltaHeading -= 360.0;
	if (deltaHeading>180.0) Debug.Log("## AHRS BUG ## yawRate too high !");
	if (deltaHeading<-180.0) deltaHeading += 360.0;
	if (deltaHeading<-180.0) Debug.Log("## AHRS BUG ## yawRate too high !");
	return deltaHeading;
}

function deltaPitch() {
	var deltaPitch : float = (pitch() - oldPitch);
	oldPitch = pitch();
	if (deltaPitch>180.0) deltaPitch -= 360.0;
	if (deltaPitch>180.0) Debug.Log("## AHRS BUG ## pitchRate too high !");
	if (deltaPitch<-180.0) deltaPitch += 360.0;
	if (deltaPitch<-180.0) Debug.Log("## AHRS BUG ## pitchRate too high !");
	return deltaPitch;
}

function deltaBank() {
	var deltaBank : float = (bank() - oldBank);
	oldBank = bank();
	if (deltaBank>180.0) deltaBank -= 360.0;
	if (deltaBank>180.0) Debug.Log("## AHRS BUG ## bankRate too high !");
	if (deltaBank<-180.0) deltaBank += 360.0;
	if (deltaBank<-180.0) Debug.Log("## AHRS BUG ## bankRate too high !");
	return deltaBank;
}

function  SignedAngle(v1 : Vector3,v2 : Vector3, normal : Vector3) : float {
    var perp = Vector3.Cross(normal, v1);
    var angle = Vector3.Angle(v1, v2);
    angle *= Mathf.Sign(Vector3.Dot(perp, v2));
    return angle;
}

function ProjectPointOnPlane(planeNormal : Vector3 , planePoint : Vector3 , point : Vector3 ) : Vector3 {
    planeNormal.Normalize();
    var distance = -Vector3.Dot(planeNormal.normalized, (point - planePoint));
    return point + planeNormal * distance;
}   

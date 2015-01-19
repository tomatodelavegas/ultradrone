#pragma strict

var ahrs : jb_AHRS;
var enableGUI : boolean = true;

function Start () {

}

function Update () {

}
 
function OnGUI() {
	 // print( String.Format("{0} is {1} and thinks pi = {2:F2}", "Dave", 42, 3.14159) );
	if (enableGUI) {
	    GUILayout.Box( "Power A/Q, Yaw W/X, Arrows for pitch/bank");
	    GUILayout.Box( String.Format(" HDG : {0:f1}",ahrs.heading()), GUILayout.Width(200));
	    GUILayout.Box( String.Format(" PITCH : {0:f1}",ahrs.pitch()), GUILayout.Width(200));
	    GUILayout.Box( String.Format(" BANK : {0:f1}",ahrs.bank()), GUILayout.Width(200));
	    GUILayout.Box( String.Format(" SPEED : {0:f1}",rigidbody.velocity.magnitude), GUILayout.Width(200));
	 }
}
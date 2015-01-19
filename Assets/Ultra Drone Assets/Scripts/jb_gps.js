#pragma strict

private var myTextMesh : TextMesh;
var enableGUI : boolean = true;
var fontSize : int = 20;
var GUIWidth : int = 400;

function Start () {
	myTextMesh = GetComponent(TextMesh);
	
    // First, check if user has location service enabled
    myTextMesh.text =  "";
    if (!Input.location.isEnabledByUser) {
        return;
        }
    // Start service before querying location
    Input.location.Start ();
    // Wait until service initializes
    var maxWait : int = 20;
    while (Input.location.status
           == LocationServiceStatus.Initializing && maxWait > 0) {
        yield WaitForSeconds (1);
        maxWait--;
    }
    // Service didn't initialize in 20 seconds
    if (maxWait < 1) {
        print ("Timed out");
        return;
    }
    // Connection has failed
    if (Input.location.status == LocationServiceStatus.Failed) {
        print ("Unable to determine device location");
        return;
    }
    // Access granted and location value could be retrieved
    else {
        print ("Location: " + Input.location.lastData.latitude + " " +
               Input.location.lastData.longitude + " " +
               Input.location.lastData.altitude + " " +
               Input.location.lastData.horizontalAccuracy + " " +
               Input.location.lastData.timestamp);
    }
    // Stop service if there is no need to query location updates continuously
    // Input.location.Stop ();
}

function Update () {

}

function OnGUI() {
	if (enableGUI) {
		 // print( String.Format("{0} is {1} and thinks pi = {2:F2}", "Dave", 42, 3.14159) );
		GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = fontSize;
	    GUILayout.Box( String.Format(" Lat : {0:f9}N",Input.location.lastData.latitude), GUILayout.Width(GUIWidth));
	    GUILayout.Box( String.Format(" Long : {0:f9}W",Input.location.lastData.longitude), GUILayout.Width(GUIWidth));
	    GUILayout.Box( String.Format(" Alt : {0:f9}m",Input.location.lastData.altitude), GUILayout.Width(GUIWidth));
	    GUILayout.Box( String.Format(" Hor accuraty : {0:f9}",Input.location.lastData.horizontalAccuracy), GUILayout.Width(GUIWidth));
		GUILayout.Box( String.Format(" Time : {0:f7}",Input.location.lastData.timestamp), GUILayout.Width(GUIWidth));
	}
}
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//     instructionbox.js                                               version 3.5     //
//     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -     //
//                                                                                     //
//     description:  Dynamically floats a moveable "Instruction Box" over a system     //
//                   screen, thereby providing a UI instructing how to interact w/     //
//                   that screen, without consuming any of screen's real-estate.       //
//     author:       Mike Zimmerman                                                    //
//     contact:      mikezimmerman@users.noreply.github.com                            //
//                                                                                     //
//     Copyright (c) Mike Zimmerman.                                                   //
//     All Rights Reserved.                                                            //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////


////////////////////////
//  global variables  //
////////////////////////

// will hold the instruction box object.

var oInstructions = null;

// path to components.

var	sPath = "../common/";


////////////////////////////////////////
//  function fnDisplayInstructions()  //
////////////////////////////////////////
//
// determines which instructions object to create based on variables on the page, 
// creates it, then calls its render() method.

function fnDisplayInstructions()
{
	// the manual override of the default i.b. left position by a developer is optional.
	// this "try" defines the default position if said manual override is omitted.

	try
	{
		isFinite( xInstructionBoxLeft );
	}
	catch ( oError )
	{
		xInstructionBoxLeft = 75;
	}

	// default box specs (may vary depending on box type).

	var	yTopPosition = 75;
	var lxExteriorWidth = 270;
	var lyExteriorHeight = 320;
	var lyInstructHeight = 140;
	var lySpacingBetween = 5;
	var lyFeedbackHeight = 98;
	var sImageNameSuffix = "fyi";

	// flash audio control specs (used by type "ip" and "mc" only).

	var lxAudioControlWidth = 208;
	var lyAudioControlHeight = 40;
	var yAudioControlDistanceFromBottom = 10;

	// the Points Possible array is used in practice by "mc" only, but, for the sake of
	// reusability, the functionality that uses it is implemented in "gp" (and then inherited
	// by "cyk", "ip", and "mc"), so, for "gp" through "ip", the array is created here if it
	// is not defined on the page. (it does not matter if the "isFinite" method resolves to 
	// true or false: all that matters is the try/catch: if the array does not exist at all,
	// the "try" will fail and the "catch" will error-trap.

	try
	{
		isFinite( asPtsPossiblePerStep );
	}
	catch ( oError )
	{
		asPtsPossiblePerStep = new Array();

		for ( var i = 1; i <= iSteps; ++ i )
		{
			asPtsPossiblePerStep[ i ] = "0";
		}
	}

	// the following "try" concerns an Array object that is used by types "ip" and "mc" only.
	// in the original scenario (Cafe, etc.) the array of strings naming the flash movie files 
	// could be left undefined, in which case the default src attribute of the embed tag (which
	// is a disabled "no audio" placeholder) would get rendered. this "try" accomplishes the 
	// same.

	try
	{
		isFinite( asFlashControls );
	}
	catch ( oError )
	{
		// the LoadMovie() method of the embedded Flash Player ignores any invalid movie-name-string
		// arguments that it receives without throwing an error, so all we have to do to achieve the 
		// desired default effect is loosely define the missing variable.

		asFlashControls = null;
	}

	switch ( sInstructionBoxType )
	{
		////////  for your information  ///////

		case "fyi":

			// update default specs.

			lyExteriorHeight = 480;
			lyInstructHeight = 410;
			lySpacingBetween = 0;
			lyFeedbackHeight = 0;

			// create the oInstructions object as a GuidedPractice Object.

			oInstructions = new ForYourInformation( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );

			break;

		////////  guided practice  ///////

		case "gp":

			// update default specs.

			lyExteriorHeight = 480;
			lyInstructHeight = 322;
			sImageNameSuffix = "gp";

			// create the oInstructions object as a GuidedPractice Object.

			oInstructions = new GuidedPractice( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );

			break;

		////////  check your knowledge  ///////

		case "cyk":

			// update default specs.

			lyInstructHeight = 162;
			sImageNameSuffix = "cyk";

			// create the oInstructions object as a CheckYourKnowledge Object.

			oInstructions = new CheckYourKnowledge( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );

			break;

		////////  independent practice  ///////

		case "ip":

			// update default specs.

			sImageNameSuffix = "ip";

			// create the oInstructions object as a IndependentPractice Object.

			oInstructions = new IndependentPractice( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix, lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls );

			break;

		////////  role play  ///////

		case "rp":

			// update default specs.

			sImageNameSuffix = "rp";

			try
			{
				asObjStateForCorrect;
			}
			catch ( oError )
			{
				asObjStateForCorrect = null;
				asOnEveryGoodAttempt = null;
				asOnSecondBadAttempt = null;
			}

			try
			{
				asFeedbackGood
			}
			catch ( oError )
			{
				asFeedbackGood = null;
				asFeedbackBad1 = null;
				asFeedbackBad2 = null;
				asFbHighlights = null;
			}

			// create the oInstructions object as a IndependentPractice Object.

			oInstructions = new IndependentPractice( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix, lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls );

			break;

		////////  mastery challenge  ///////

		case "mc":

			// update default specs.

			sImageNameSuffix = "mc";

			// in the previous implementation, the scoring calls to the report() method of the Engine that 
			// were hard-coded on the page could include an optional argument representing the name of an 
			// XML file, in order to enable remediation to a page that existed in an XML file outside of 
			// the one that had rendered the current instance of the course. since this scenario is not
			// especially common and therefore the variable that handles the new implementation of this
			// functionality does not need to be defined on every page, the following enables its omission.

			try
			{
				isFinite( sRemediationXmlFile );
			}
			catch ( oError )
			{
				// set it to a self-explanatory string flag, which is checked by interact().

				sRemediationXmlFile = "do not send";
			}

			// create the oInstructions object as a MasteryChallenge Object.

			oInstructions = new MasteryChallenge( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix, lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls, sRemediationText, sRemediationXmlFile, sRemediationPageUrl );

			break;
	}

	// render the object onto the page.

	oInstructions.render();

	// nullify the Array that may have been extraneously defined (such as, if the type is not "ip" or "mc").

	asFlashControls = null;
}


/////////////////////////////////////////////////////////////////////////////////////////
//  FOR YOUR INFORMATION CLASS                                                         //
/////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////
//  constructor method of ForYourInformation Class  //
//////////////////////////////////////////////////////

function ForYourInformation( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix )
{
	this.constructCoreObject( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );
}


////////////////////////////////////////////////////////////////
//  "constructCoreObject" method of ForYourInformation Class  //
////////////////////////////////////////////////////////////////

ForYourInformation.prototype.constructCoreObject = function ( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix )
{
	this.type = sInstructionBoxType;

	this.count = iSteps;
	this.initialQuantityToDisplay = iStepsInitiallyVisible;
	this.numberAdjustment = iStepsAlreadyDisplayed;

	this.currentItem = 1;
	this.currentItemToRender = this.currentItem;
	this.nextItem = this.currentItem + 1;

	this.itemHtmlArray = asInstructions;

	// box positions.

	this.leftPosition = xInstructionBoxLeft;
	this.topPosition = yTopPosition;
	this.exteriorWidth = lxExteriorWidth;
	this.exteriorHeight = lyExteriorHeight;
	this.instructHeight = lyInstructHeight;
	this.spacingBetween = lySpacingBetween;
	this.feedbackHeight = lyFeedbackHeight;

	// used to load the correct instructions box image.

	this.imageNameSuffix = sImageNameSuffix;

	// variables are done being used, so nullify them.

	sInstructionBoxType = null;
	iSteps = null;
	iStepsInitiallyVisible = null;
	iStepsAlreadyDisplayed = null;
	asInstructions = null;
	xInstructionBoxLeft = null;
	yTopPosition = null;
	lxExteriorWidth = null;
	lyExteriorHeight = null;
	lyInstructHeight = null;
	lySpacingBetween = null;
	lyFeedbackHeight = null;
	sImageNameSuffix = null;
}


///////////////////////////////////////////////////
//  "render" method of ForYourInformation Class  //
///////////////////////////////////////////////////

ForYourInformation.prototype.render = function ()
{
	///////  render the instruction box on the page. ///////

	var oInstructionBox = document.createElement( "div" );

		oInstructionBox.id = "divInstructionBox";
		oInstructionBox.style.position = "absolute";
		oInstructionBox.style.left = this.leftPosition + "px";
		oInstructionBox.style.top = this.topPosition + "px";
		oInstructionBox.style.width = this.exteriorWidth + "px";
		oInstructionBox.style.height = this.exteriorHeight + "px";
		oInstructionBox.style.zIndex = "500";

		var sInstructionBoxHtml = "";

			sInstructionBoxHtml += '<img id="imgInstructionBox" src="' + sPath + 'images/instructionbox_' + this.imageNameSuffix + '.gif" style="position: absolute; left: 0px; top: 0px;" onmousedown="oInstructions.drag( this );" ondragstart="return false;" >';

			sInstructionBoxHtml += '<img id="left" src="' + sPath + 'images/left_off.gif" style="position: absolute; left: 8px; top: 10px; cursor: hand;" onmouseover="this.src=' +  "'" + ( sPath + "images/left_on.gif'" ) + ';" onmouseout="this.src=' +  "'" + ( sPath + "images/left_off.gif'" ) + ';" onclick="oInstructions.snap( this );" />';

			sInstructionBoxHtml += '<img id="right" src="' + sPath + 'images/right_off.gif" style="position: absolute; left: 229px; top: 10px; cursor: hand;" onmouseover="this.src=' +  "'" + ( sPath + "images/right_on.gif'" ) + ';" onmouseout="this.src=' +  "'" + ( sPath + "images/right_off.gif'" ) + ';" onclick="oInstructions.snap( this );" />';

			var lyTotalHeight = this.instructHeight + this.spacingBetween + this.feedbackHeight;

			sInstructionBoxHtml += '<div id="divInstructionsAndFeedback" style="position: absolute; left: 9px; top: 50px; width: 252px; height: ' + lyTotalHeight + 'px; overflow: hidden; ">';

			lyTotalHeight = null;

				sInstructionBoxHtml += '<div id="divInstructionsTable" style="position: absolute; left: 0px; top: 0px; width: 100%; height: ' + this.instructHeight + 'px; overflow: auto; overflow-x: hidden; ">';

					sInstructionBoxHtml += '<table id="tableInstructions" style="position: absolute; left: 0px; top: 0px; width: 100%;" >';
						sInstructionBoxHtml += '<tr>';
							sInstructionBoxHtml += '<td id="tdHeader" colspan="2" style="height: 4px;" ></td>';
						sInstructionBoxHtml += '</tr>';
						sInstructionBoxHtml += '<tr>';

							// reduce the width of the first column, and refrain from assigning styles to it, if this is not a Guided Practice.

							var sClassStringOn = ( this.type == "gp" ) ? 'class="texton" ' : '';
							var sClassStringOff = ( this.type == "gp" ) ? 'class="instructiontext" ' : '';
							var lxColumnOneWidth = ( this.type == "gp" ) ? 26 : 2;

							sInstructionBoxHtml += '<td id="tdLabel_1" ' + sClassStringOn + 'align="right" valign="top" style="width: ' + lxColumnOneWidth + 'px;" ></td>';

							sClassStringOn = null;
							lxColumnOneWidth = null;

							sInstructionBoxHtml += '<td id="tdText_1" class="texton" >&nbsp;</td>';
						sInstructionBoxHtml += '</tr>';
						sInstructionBoxHtml += '<tr>';
							sInstructionBoxHtml += '<td id="tdLabel_2" ' + sClassStringOff + 'align="right" valign="top" ></td>';
							sInstructionBoxHtml += '<td id="tdText_2" class="instructiontext" >&nbsp;</td>';
						sInstructionBoxHtml += '</tr>';
						sInstructionBoxHtml += '<tr>';
							sInstructionBoxHtml += '<td id="tdLabel_3" ' + sClassStringOff + 'align="right" valign="top" ></td>';
							sInstructionBoxHtml += '<td id="tdText_3" class="instructiontext" >&nbsp;</td>';
						sInstructionBoxHtml += '</tr>';
						sInstructionBoxHtml += '<tr>';
							sInstructionBoxHtml += '<td id="tdLabel_4" ' + sClassStringOff + 'align="right" valign="top" ></td>';

							sClassStringOff = null;

							sInstructionBoxHtml += '<td id="tdText_4" class="instructiontext" >&nbsp;</td>';
						sInstructionBoxHtml += '</tr>';
					sInstructionBoxHtml += '</table>';
				sInstructionBoxHtml += '</div>';

				var yTopPosition = this.instructHeight + this.spacingBetween;

				sInstructionBoxHtml += '<div id="divFeedback" class="feedback" style="position: absolute; left: 0px; top: ' + yTopPosition + 'px; width: 100%; height: ' + this.feedbackHeight + 'px; overflow: hidden; ">&nbsp;</div>';

			sInstructionBoxHtml += '</div>';

// this section implements the flash audio controller,
// which is not used by the Bankcard Credit course.
/////////////////////////////////////////////////////////////////////////////////////////
// /*
			// if this is an Independent Practice or a Mastery Challenge...

			if ( ( this.type == "ip" ) || ( this.type == "mc" ) )
			{
				// embed the flash audio controller.

				yTopPosition = this.exteriorHeight - ( this.audioControlHeight + this.audioControlDistanceFromBottom );

				sInstructionBoxHtml += '<div id=""divAudioControlContainer" align="center" style="position: absolute; left: 0px; top: ' + yTopPosition + 'px; width: 100%; height: ' + this.audioControlHeight + 'px;" >';

					sInstructionBoxHtml += '<embed id="embFlashAudioControl" ';
						sInstructionBoxHtml += 'type = "application/x-shockwave-flash" ';

						// if the array (of Flash audio-control movies) exists...

						if ( this.flashControlsArray )
						{
							// set the source equal to the first one.

							sInstructionBoxHtml += 'src = "' + this.flashControlsArray[ 1 ] + '" ';
						}
						else // the array doesn't exist...
						{
							// so set the source equal to our default no_audio.

							sInstructionBoxHtml += 'src = "' + sPath + 'flash/no_audio.swf" ';
						}

						sInstructionBoxHtml += 'quality = "high" ';
						sInstructionBoxHtml += 'pluginspage = "http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" ';
						sInstructionBoxHtml += 'style = "width: ' + this.audioControlWidth + 'px; height: ' + this.audioControlHeight + 'px;" ';
						sInstructionBoxHtml += '></embed>';

				sInstructionBoxHtml += '</div>';
			}

			// nullify the variable.

			yTopPosition = null;
// */
/////////////////////////////////////////////////////////////////////////////////////////

		sInstructionBoxHtml += '</div>';

	// append the element to the document body.

	oInstructionBox.innerHTML += sInstructionBoxHtml;

	document.body.appendChild( oInstructionBox );

		oInstructionBox = null;

	///////  display the initial instructions.  ///////

	var iQuantityToDisplay = ( this.initialQuantityToDisplay > 4 ) ? 4 : this.initialQuantityToDisplay;

	for ( var i = 1; i <= iQuantityToDisplay; ++ i )
	{
		// if this is a Guided Practice...

		if ( this.type == "gp" )
		{
			// then number each instruction.

			document.getElementById( "tdLabel_" + i ).innerHTML = this.currentItemToRender + this.numberAdjustment + ".";
		}

		// write the instruction strings into the corresponding datacells.

		document.getElementById( "tdText_" + i ).innerHTML = asInstructions[ i ];

		++ this.currentItemToRender;
	}
	
	// added to eliminate rendering of scrollbars in cases of less-than-four instruction items.

	// if the i.b. is NOT a "gp"...

	if ( this.type != "gp" )
	{
		// remove table rows 2 - 4, as all instruction items will be written to table row 1.

		for ( var k = 2; k < 5; ++ k )
		{
			tableInstructions.deleteRow( 2 );
		}
	}
	else // the i.b. IS a "gp"...
	{
		// so remove unused table rows from row after last item through row four, if applicable.

		for ( var k = ( this.count + 1 ); k < 5; ++ k )
		{
			tableInstructions.deleteRow( this.count + 1 );
		}
	}
}


/////////////////////////////////////////////////////
//  "interact" method of ForYourInformation Class  //
/////////////////////////////////////////////////////
//
// defining an empty interact() method for the ForYourInformation Class allows developers to convert 
// an interactive page (Guided Practice, etc.) to an FYI without having to significantly rework the 
// page by finding and removing all of the calls to oInstructions.interact().

ForYourInformation.prototype.interact = function () {}


/////////////////////////////////////////////////
//  "snap" method of ForYourInformation Class  //
/////////////////////////////////////////////////
//
//  this function is used to "snap" the Instruction Box from to the left or right side of the screen.
//  this function is called in reponse to the onclick event of the left and right arrow images of the
//  instruction box.  (these arrow images send a reference to themselves as the oCallingElement argument).

ForYourInformation.prototype.snap = function ( oCallingElement )
{
	// the two image objects that comprise the left and right arrows of the instruction box 
	// call this function in response to their onclick event.  these two images have been given
	// id attributes of "left" and "right"

	switch ( oCallingElement.id )
	{
		case "left":

			// updates the style object of the parent element, because the assumption is that the calling
			// object is simply an image (of an arrow) that has been place on a greater object, and that
			// it is this greater object that is intended to be moved.

			oCallingElement.parentElement.style.left = "75px";
			oCallingElement.parentElement.style.top = "75px";

			break;

		case "right":

			oCallingElement.parentElement.style.left = "680px";
			oCallingElement.parentElement.style.top = "75px";

			break;
	}
}


/////////////////////////////////////////////////
//  "drag" method of ForYourInformation Class  //
/////////////////////////////////////////////////
//
//  this function is used to enable dragging of the Instruction Box around the screen.

ForYourInformation.prototype.drag = function ( oCallingElement )
{
	// these are the differences between the starting positions of the mouse
	// and the starting positions of the calling object.

	// note that the oCallingElement is the image that forms the instruction box "frame", and its
	// parentElement is the division that contains all of the elements that comprise the instruction box.

	var lxOffset = event.clientX - parseInt( oCallingElement.parentElement.style.left );
	var lyOffset = event.clientY - parseInt( oCallingElement.parentElement.style.top );

	// largest allowable top and left positions, based on width of the instruction box image.

	var xMaximum = document.body.clientWidth - oCallingElement.width;
	var yMaximum = document.body.clientHeight - oCallingElement.height;

	// attach event-listeners.

	document.attachEvent( "onmousemove", fnRepositionObject );
	document.attachEvent( "onmouseup", fnReleaseObject );

	// stop propagation (and any default actions) of the event.

	fnStopEventPropagation();

	///////  function fnRepositionObject  ///////

	function fnRepositionObject()
	{
		var xNew = event.clientX - lxOffset;
		var yNew = event.clientY - lyOffset;

		oCallingElement.parentElement.style.left = xNew + "px";
		oCallingElement.parentElement.style.top = yNew + "px";
		fnStopEventPropagation();
	}

	///////  function fnReleaseObject  ///////

	function fnReleaseObject()
	{
		document.detachEvent( "onmouseup", fnReleaseObject );
		document.detachEvent( "onmousemove", fnRepositionObject );
		fnStopEventPropagation();
		
		if ( parseInt( oCallingElement.parentElement.style.left ) < 0 )
		{
			oCallingElement.parentElement.style.left = "0px";
		}
		else
		{
			if ( parseInt( oCallingElement.parentElement.style.left ) > xMaximum )
			{
				oCallingElement.parentElement.style.left = xMaximum + "px";
			}
		}

		if ( parseInt( oCallingElement.parentElement.style.top ) < 0 )
		{
			oCallingElement.parentElement.style.top = "0px";
		}
		else
		{
			if ( parseInt( oCallingElement.parentElement.style.top ) > yMaximum )
			{
				oCallingElement.parentElement.style.top = yMaximum + "px";
			}
		}

		oCallingElement = null;
	}

	///////  function fnStopEventPropagation  ///////

	function fnStopEventPropagation()
	{
		event.cancelBubble = true;
		event.returnValue = false;
	}
}


/////////////////////////////////////////////////////////////////////////////////////////
//  GUIDED PRACTICE CLASS                                                              //
/////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////
//  constructor method of GuidedPractice Class  //
//////////////////////////////////////////////////

// inherits from ForYourInformation Class.

GuidedPractice.prototype = new ForYourInformation();

function GuidedPractice( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix )
{
	this.constructCoreObject( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );
	this.appendInteractivity( asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt );

	// the checkmark HTML is defined here for ease of reuse.

	this.checkmarkHtmlString = "<span style='font: normal normal bold 10pt Wingdings; color: #009900;' >&uuml;</span>";
}


////////////////////////////////////////////////////////////
//  "appendInteractivity" method of GuidedPractice Class  //
////////////////////////////////////////////////////////////

GuidedPractice.prototype.appendInteractivity = function ( asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt )
{
	this.pointsEarnedArray = new Array();
	this.pointsPossibleArray = new Array();

	if ( asObjStateForCorrect != null )
	{
		this.prepareTestFunctions( asObjStateForCorrect, asPtsPossiblePerStep );
		this.prepareHighlights( asFbHighlights );
	}

	this.goodFeedbackHtmlArray = asFeedbackGood;
	this.badFeedback1HtmlArray = asFeedbackBad1;
	this.badFeedback2HtmlArray = asFeedbackBad2;

		var afnDoOnRight = new Array();
		var afnDoOnWrong = new Array();

		// the following must be inside a "try", because, when the classes that inherit from this class
		// are first prototyping themselves to this class, asOnEveryGoodAttempt has not been parsed yet
		// so asOnEveryGoodAttempt.length throws an error.

		try
		{
			for ( var i = 1; i < asOnEveryGoodAttempt.length; ++ i )
			{
				afnDoOnRight[ i ] = new Function( asOnEveryGoodAttempt[ i ] );
			}

			for ( var i = 1; i < asOnSecondBadAttempt.length; ++ i )
			{
				afnDoOnWrong[ i ] = new Function( asOnSecondBadAttempt[ i ] );
			}
		}
		catch ( oError ) {}

	this.doOnRightMethodsArray = afnDoOnRight;
	this.doOnWrongMethodsArray = afnDoOnWrong;

	// a count of the student's attempts at answering the current instructions item.

	this.currentAttempt = 1;

	// variables are done being used, so nullify them.

	asFeedbackGood = null;
	asFeedbackBad1 = null;
	asFbHighlights = null;
	asObjStateForCorrect = null;
	asPtsPossiblePerStep = null;
	asOnEveryGoodAttempt = null;
	asOnSecondBadAttempt = null;
	afnDoOnRight = null;
	afnDoOnWrong = null;
}


/////////////////////////////////////////////////////////////
//  "prepareTestFunctions" method of GuidedPractice Class  //
/////////////////////////////////////////////////////////////

GuidedPractice.prototype.prepareTestFunctions = function ( asObjStateForCorrect, asPtsPossiblePerStep )
{
	// create a new Array to hold all of the tests functions.

	this.testFunctions = new Array( this.count );

	for ( var iItem = 1; iItem <= this.count; ++ iItem )
	{
		// if the string does NOT contain the JavaScript "Or" operator ( "||" ) 
		// but DOES contain a single pipe ( "|" )...

		if ( ( asObjStateForCorrect[ iItem ].search( /\|\|/ ) < 0 ) && ( asObjStateForCorrect[ iItem ].search( /\|/ ) > -1 ) )
		{
			// convert old format to new format.

			var sTestComponents = asObjStateForCorrect[ iItem ].split( "|" );

			asObjStateForCorrect[ iItem ] = "";

			for ( var k = 0; k < sTestComponents.length; ++ k )
			{
				// split each component at the "=".

				var sNameValuePairs = sTestComponents[ k ].split( "=" );

				// if the current text is the same as that text converted to uppercase...

				if ( sNameValuePairs[ 1 ] == sNameValuePairs[ 1 ].toUpperCase() )
				{
					// the text was meant to be a string.

					sNameValuePairs[ 1 ] = "'" + sNameValuePairs[ 1 ] + "'";
				}

				// compile the old components into the new JavaScript "If" Statement format.

				asObjStateForCorrect[ iItem ] += "( ( " + sNameValuePairs[ 0 ] + ".toString() ).toUpperCase() == ( " + sNameValuePairs[ 1 ] + ".toString() ).toUpperCase() )";

				// add JavaScript "And" Operators ( "&&" ) between each as necessary.

				asObjStateForCorrect[ iItem ] += ( k != ( sTestComponents.length - 1 ) ? " && " : "" );
			}
		}
		else // the string contains no pipes at all...
		{
			// if the string does NOT contain the JavaScript "Equality" operator ( "==" ) and
			// if the string does NOT contain the JavaScript "Inequality" operator ( "!=" ),
			// but DOES contain a single equals sign ( "=" )...

			if ( ( asObjStateForCorrect[ iItem ].search( /\=\=/ ) < 0 ) && ( asObjStateForCorrect[ iItem ].search( /\!\=/ ) < 0 ) && ( asObjStateForCorrect[ iItem ].search( /\=/ ) > -1 ) )
			{
				// split each component at the "=".

				var sNameValuePairs = asObjStateForCorrect[ iItem ].split( "=" );

				// if the current text is the same as that text converted to uppercase...

				if ( sNameValuePairs[ 1 ] == sNameValuePairs[ 1 ].toUpperCase() )
				{
					// the text was meant to be a string.

					sNameValuePairs[ 1 ] = "'" + sNameValuePairs[ 1 ] + "'";
				}

				// compile the old components into the new JavaScript "If" Statement format.
				// the "toUpperCase()" deals with developer's page-level case inconsistencies.

				asObjStateForCorrect[ iItem ] = "( " + sNameValuePairs[ 0 ] + ".toString() ).toUpperCase() == ( " + sNameValuePairs[ 1 ] + ".toString() ).toUpperCase()";
			}
		}

		// split tests so that, if not fully correct, each one will be tested for partial credit.

		var asEachTest = asObjStateForCorrect[ iItem ].split( "&&" );

		if ( this.type == "mc" )
		{
			var aiPointsPossible = asPtsPossiblePerStep[ iItem ].split( "|" );

			// initialize the points possible array element.

			this.pointsPossibleArray[ iItem ] = 0;

			for ( var m = 0; m < aiPointsPossible.length; ++ m )
			{
				// parse an integer value from the string.

				aiPointsPossible[ m ] = parseInt( aiPointsPossible[ m ] );

				// add the points possible to array element.

				this.pointsPossibleArray[ iItem ] += aiPointsPossible[ m ];
			}
		}

		// create the test function.

		var sTestFunction = "";

			sTestFunction += "oInstructions.pointsEarnedArray[ " + iItem + " ] = 0;";

			sTestFunction += "if ( " + asObjStateForCorrect[ iItem ] + " )";

			sTestFunction += "{";

				if ( this.type == "mc" )
				{
					sTestFunction += "oInstructions.pointsEarnedArray[ " + iItem + " ] = " + this.pointsPossibleArray[ iItem ] + ";";
				}

				sTestFunction += "return true;";

			sTestFunction += "}";

			sTestFunction += "else";

			sTestFunction += "{";

				// partial credit.

				if ( ( this.type == "mc" ) && ( asEachTest.length > 1 ) )
				{
					for ( var n = 0; n < asEachTest.length; ++ n )
					{
						sTestFunction += "if ( " + asEachTest[ n ] + " )";

						sTestFunction += "{";

							if ( aiPointsPossible[ n ] === undefined )
							{
								aiPointsPossible[ n ] = "0";
							}

							sTestFunction += "oInstructions.pointsEarnedArray[ " + iItem + " ] += " + parseInt( aiPointsPossible[ n ] ) + ";";

						sTestFunction += "}";
					}
				}

				sTestFunction += "return false;";

			sTestFunction += "}";

		// this "try" permits pages that do no judging to define asObjStateForCorrect[ n ] = "".

		try
		{
			this.testFunctions[ iItem ] = new Function( sTestFunction );
		}
		catch ( oError ) {}

			sTestFunction = null;
	}
}


//////////////////////////////////////////////////////////
//  "prepareHighlights" method of GuidedPractice Class  //
//////////////////////////////////////////////////////////

GuidedPractice.prototype.prepareHighlights = function ( asFbHighlights )
{
	// create a new Object to hold all of the highlights content.

	this.highlightsObjects = new Object();

	for ( var j = 1; j <= this.count; ++ j )
	{
		if ( asFbHighlights[ j ] != "" )
		{
			// split the highlight string of the current item at any and every "|" and define the 
			// object above as the resultant array.

			asFbHighlights[ j ] = asFbHighlights[ j ].split( "|" );

			// create a child object stored as a property that is named after each item number.

			this.highlightsObjects[ j ] = new Object();

				// define its default properties.

				this.highlightsObjects[ j ].length = asFbHighlights[ j ].length;
				this.highlightsObjects[ j ].visibility = "hidden";

			// for each element of the resultant array...

			for ( var i = 0; i < asFbHighlights[ j ].length; ++ i )
			{
				this.highlightsObjects[ j ][ i ] = new Object();

				// if an attempted parsing of an integer from the current highlight substring results in a non-number, 
				// then this highlight substring must NOT be a coordinate set but an HTML element id...

				if ( isNaN( parseInt( asFbHighlights[ j ][ i ] ) ) )
				{
					// define the "id" property of this element as the substring.

					this.highlightsObjects[ j ][ i ].id = asFbHighlights[ j ][ i ];

					// define the "objectType" property of this element as "[html]".

					this.highlightsObjects[ j ][ i ].objectType = "[html]";

					// define the "originalClass" property as that object's class name.

					this.highlightsObjects[ j ][ i ].baseClass = document.getElementById( asFbHighlights[ j ][ i ] ).className;
				}
				else // this highlight substring IS a coordinate set...
				{
					// split the substring at each comma.

					asFbHighlights[ j ][ i ] = asFbHighlights[ j ][ i ].split( "," );

					// compile the HTML of a new highlight division element.

					var oHighlightDiv = document.createElement( "div" );

						oHighlightDiv.id = "divHighlight_" + j + "_" + i;
						oHighlightDiv.className = "highlight";
						oHighlightDiv.style.position = "absolute";
						oHighlightDiv.style.left = asFbHighlights[ j ][ i ][ 0 ] + "px";
						oHighlightDiv.style.top = asFbHighlights[ j ][ i ][ 1 ] + "px";
						oHighlightDiv.style.width = asFbHighlights[ j ][ i ][ 2 ] + "px";
						oHighlightDiv.style.height = asFbHighlights[ j ][ i ][ 3 ] + "px";
						oHighlightDiv.style.visibility = "hidden";

					// append it to the document body.

					document.body.appendChild( oHighlightDiv );

						oHighlightDiv = null;

					// define the "id" property of this element as the id string of the HTML element created above.

					this.highlightsObjects[ j ][ i ].id = "divHighlight_" + j + "_" + i;

					// define the "objectType" property of this element as "[dhtml]".

					this.highlightsObjects[ j ][ i ].objectType = "[dhtml]";
				}
			}
		}
	}
}


/////////////////////////////////////////////////
//  "interact" method of GuidedPractice Class  //
/////////////////////////////////////////////////

GuidedPractice.prototype.interact = function ()
{
	// exit this method if the current-item counter has been incremented past the total item count.

	if ( this.currentItem <= this.count )
	{
		var bIsMc = false;

		if ( this.type == "mc" )
		{
			bIsMc = true;

			// if this is the first attempt...

			if ( this.currentAttempt == 1 )
			{
				// increment the attempts counter.

				++ this.currentAttempt;
			}
		}

		// if the current item's test function returns "true" (indicating correct)...

		if ( this.testFunctions[ this.currentItem ]() )
		{
			// if this is an "mc" and if this is the last item and report() was already called,
			// exit this response so that a student's attempt to correct the final answer is ingnored.

			if (  ( ! bIsMc )  ||  ( ( this.currentItem < this.count ) || ( this.reportMustBeCalled ) )  )
			{
				// display the appropriate feedback.

				this.displayFeedback( "good" );

				// if this is an "mc"...

				if ( bIsMc )
				{
					// if report() has yet to be called...

					if ( this.reportMustBeCalled )
					{
						// call it.

						parent.lesson.currentTopic.report( this.pointsEarnedArray[ this.currentItem ], this.pointsPossibleArray[ this.currentItem ] );

						// update the flag.

						this.reportMustBeCalled = false;
					}

					// append the scoring feedback.

					this.appendScoringFeedback();
				}

				// call the developer-defined custom-response function for this item.

				try
				{
					this.doOnRightMethodsArray[ this.currentItem ]();
				}
				catch ( oError ) {}

				// update the instructions (NOTE: this method is what increments the current-item counter).

				this.update();

				// and reset the attempts counter.

				this.currentAttempt = 1;

				if ( bIsMc )
				{
					// instructions have now been updated, so reset the flag.

					this.reportMustBeCalled = true;
				}

			}
		}
		else // the test returned "false" (indicating incorrect)...
		{
			// display the appropriate feedback.

			this.displayFeedback();

			if ( bIsMc )
			{
				if ( this.reportMustBeCalled )
				{
					if ( this.remediationXmlFileString == "do not send" )
					{
						parent.lesson.currentTopic.report( this.pointsEarnedArray[ this.currentItem ], this.pointsPossibleArray[ this.currentItem ], this.remediationTextString, this.remediationPageUrlString );
					}
					else
					{
						parent.lesson.currentTopic.report( this.pointsEarnedArray[ this.currentItem ], this.pointsPossibleArray[ this.currentItem ], this.remediationTextString, this.remediationXmlFileString, this.remediationPageUrlString );
					}

					this.reportMustBeCalled = false;
				}

				// in every case but the final item, scoring feedback is appended when the question 
				// is answered correctly. in the case of the final item, it is appended immediately.

				if ( this.currentItem == this.count )
				{
					this.appendScoringFeedback();
				}
			}

			// if this was the first attempt...

			if ( this.currentAttempt == 1 )
			{
				// increment the attempts counter.

				++ this.currentAttempt;
			}
			else // this was the second attempt or greater...
			{
				// so call the developer-defined custom-response function.

				try
				{
					this.doOnWrongMethodsArray[ this.currentItem ]();
				}
				catch ( oError ) {}
			}
		}
	}
}


////////////////////////////////////////////////////////
//  "displayFeedback" method of GuidedPractice Class  //
////////////////////////////////////////////////////////

GuidedPractice.prototype.displayFeedback = function ( sType )
{
	switch ( sType )
	{
		case "good":

			// display the CorrectFeedback HTML.

			divFeedback.innerHTML = this.goodFeedbackHtmlArray[ this.currentItem ];

			// if this item's highlightsObject exists...

			if ( this.highlightsObjects[ this.currentItem ] )
			{
				// if this item's highlightsObject is visible...

				if ( this.highlightsObjects[ this.currentItem ].visibility == "visible" )
				{
					// for each highlight element therein...

					for ( var i = 0; i < this.highlightsObjects[ this.currentItem ].length; ++ i )
					{
						// refer to the HTML element whose id matches the current highlight element "id" property.

						var oHtmlElement = document.getElementById( this.highlightsObjects[ this.currentItem ][ i ].id );

						// if the current element is of type [html]...

						if ( this.highlightsObjects[ this.currentItem ][ i ].objectType == "[html]" )
						{
							// restore that element's original class.

							oHtmlElement.className = this.highlightsObjects[ this.currentItem ][ i ].baseClass;
						}
						else // the current element is of type [dhtml]...
						{
							// hide the element.

							oHtmlElement.style.visibility = "hidden";
						}

						// nullify the reference.

						oHtmlElement = null;
					}

					// update the visibility property.

					this.highlightsObjects[ this.currentItem ].visibility = "hidden";
				}
			}

			break;

		default: // bad.

			// display the appropriate level of bad feedback;

			divFeedback.innerHTML = this[ "badFeedback" + this.currentAttempt + "HtmlArray" ][ this.currentItem ];

			// if this is the second attempt...

			if ( this.currentAttempt == 2 )
			{
				// if this item's highlightsObject exists...

				if ( this.highlightsObjects[ this.currentItem ] )
				{
					// if this item's highlightsObject is NOT visible...

					if ( this.highlightsObjects[ this.currentItem ].visibility != "visible" )
					{
						// for each highlight element therein...

						for ( var i = 0; i < this.highlightsObjects[ this.currentItem ].length; ++ i )
						{
							// refer to the HTML element whose id matches the current highlight element "id" property.

							var oHtmlElement = document.getElementById( this.highlightsObjects[ this.currentItem ][ i ].id );

							// if the current element is of type [html]...

							if ( this.highlightsObjects[ this.currentItem ][ i ].objectType == "[html]" )
							{
								// append the "highlight" class to the element's original class.

								oHtmlElement.className += " highlight";
							}
							else // the current element is of type [dhtml]...
							{
								// display the element.

								oHtmlElement.style.visibility = "visible";
							}

							// nullify the reference.

							oHtmlElement = null;
						}

						// update the visibility property.

						this.highlightsObjects[ this.currentItem ].visibility = "visible";
					}
				}
			}

			break;
	}
}


///////////////////////////////////////////////
//  "update" method of GuidedPractice Class  //
///////////////////////////////////////////////

GuidedPractice.prototype.update = function ()
{
	// compile a string of HTML for rendering the checkmarked item number.

	var sCheckmarkedNumber = this.checkmarkHtmlString + ( this.currentItem + this.numberAdjustment ) + ".";

	// if the student's next instructions item is the fourth item or less...

	if ( this.nextItem < 5 )
	{
		// get the tab index of the currently active element of the document, then increment it,
		// as focus will later be returned to the element with this incremented tab index.

		var iTabIndex = document.activeElement.tabIndex;

		++ iTabIndex;

		// then, if the student has not yet completed the last instructions item...

		if ( this.currentItem < this.count )
		{
			// if the student's next instructions item is the item to now render...

			if ( this.nextItem == this.currentItemToRender )
			{
				// then that item has yet to be rendered, so render it,

				document.getElementById( "tdLabel_" + this.currentItemToRender ).innerHTML = this.currentItemToRender + this.numberAdjustment + ".";
				document.getElementById( "tdText_" + this.currentItemToRender ).innerHTML = this.itemHtmlArray[ this.currentItemToRender ];

				// and increment the item-to-render count;

				++ this.currentItemToRender;
			}

			// update the class of the next item's label and text datafields to the current-item style.

			document.getElementById( "tdLabel_" + this.nextItem ).className = "texton";
			document.getElementById( "tdText_" + this.nextItem ).className = "texton";

			// the focus() method will make the next instructions item visible, if it were not visible due to 
			// a verbose current item that consumes the entire visible area of the divInstructionsTable.

			document.getElementById( "tdLabel_" + this.nextItem ).focus();
		}

		// then, checkmark the current item's label datafield,

		document.getElementById( "tdLabel_" + this.currentItem ).innerHTML = sCheckmarkedNumber;

		// update the class of the current item's label and text datafields to the non-current-item style,

		document.getElementById( "tdLabel_" + this.currentItem ).className = "instructiontext";
		document.getElementById( "tdText_" + this.currentItem ).className = "instructiontext";

		// if an element with the appropriate (subsequent) tab index value exists, give focus to it.

		for ( var i = 0; i < document.all.length; ++ i )
		{
			if ( document.all[ i ].tabIndex == iTabIndex )
			{
				try
				{
					document.all[ i ].focus();
				}
				catch ( oError ) {}

				break;
			}
		}
	}
	else // the student's next instructions item is the fifth item or greater...
	{
		// so, first update the innerHTML of the fourth label datafield to the checkmarked number string.

		document.getElementById( "tdLabel_4" ).innerHTML = sCheckmarkedNumber;

		// then, if the student has not yet completed the last instructions item...

		if ( this.currentItem < this.count )
		{
			// for each of items 1 through 3...

			for ( var i = 1; i < 4; ++ i )
			{
				// update this item's label and text datafields with the contents of the subsequent item's;

				document.getElementById( "tdLabel_" + i ).innerHTML = document.getElementById( "tdLabel_" + ( i + 1 ) ).innerHTML;
				document.getElementById( "tdText_" + i ).innerHTML = document.getElementById( "tdText_" + ( i + 1 ) ).innerHTML;
			}

			// then, write the next item's number into the fourth label datafield,

			document.getElementById( "tdLabel_" + i ).innerHTML = this.nextItem + this.numberAdjustment + ".";

			// and write the next item's Html string into the fourth text datafield.

			document.getElementById( "tdText_" + i ).innerHTML = this.itemHtmlArray[ this.nextItem ];
		}
		else // the student has completed the last instructions item...
		{
			// so update the class of the fourth label and text datafields to the non-current-item style.

			document.getElementById( "tdLabel_4" ).className = "instructiontext";
			document.getElementById( "tdText_4" ).className = "instructiontext";
		}
	}

	// increment the current item count to that of the the next item,

	++ this.currentItem;

	// and the next item count to the one after that.

	++ this.nextItem;
}


/////////////////////////////////////////////////////////////////////////////////////////
//  CHECK YOUR KNOWLEDGE CLASS                                                         //
/////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////
//  constructor method of CheckYourKnowledge Class  //
//////////////////////////////////////////////////////

// inherits from GuidedPractice Class.

CheckYourKnowledge.prototype = new GuidedPractice();

function CheckYourKnowledge( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix )
{
	this.constructCoreObject( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );
	this.appendInteractivity( asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt );
}


///////////////////////////////////////////////////
//  "update" method of CheckYourKnowledge Class  //
///////////////////////////////////////////////////
//
//  redefined from the GuidedPractice Class in order to remove all of the numbering and to write subsequent
//  steps into table row 1, instead of to rows 2 - 4 (which by the way have already been dynamically removed).
//  note also that, although it is not used in this Class, but since this is the last class to explicitly 
//  define this method, a call to the LoadMovie() method of the embedded Flash Player has been added to the 
//  end of this method, to be used by the Classes that inherit from this Class (which are, IP and MC).

CheckYourKnowledge.prototype.update = function ()
{
	if ( this.count > 1 )
	{
		if ( this.currentItem < this.count )
		{
			var iTabIndex = document.activeElement.tabIndex;

			++ iTabIndex;

			document.getElementById( "tdText_1" ).innerHTML = this.itemHtmlArray[ this.nextItem ];

			document.getElementById( "tdText_1" ).focus();

			for ( var i = 0; i < document.all.length; ++ i )
			{
				if ( document.all[ i ].tabIndex == iTabIndex )
				{
					try
					{
						document.all[ i ].focus();
					}
					catch ( oError ) {}

					break;
				}
			}
		}

		// if this is an Independent Practice or a Mastery Challenge...

		if ( ( this.type == "ip" ) || ( this.type == "mc" ) )
		{
			// if the array (of Flash audio-control movies) has been defined...

			if ( this.flashControlsArray )
			{
				// if the last item's movie has not yet already been loaded...

				if ( this.nextItem <= this.count )
				{
					// call the LoadMovie() method of the embedded Flash Player in order to play the next Flash movie.

					embFlashAudioControl.LoadMovie( 0, this.flashControlsArray[ this.nextItem ] );
				}
			}
		}
	}

	++ this.currentItem;
	++ this.nextItem;
}


/////////////////////////////////////////////////////////////////////////////////////////
//  INDEPENDENT PRACTICE CLASS                                                         //
/////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////
//  constructor method of IndependentPractice Class  //
///////////////////////////////////////////////////////

// inherits from CheckYourKnowledge Class.

IndependentPractice.prototype = new CheckYourKnowledge();

function IndependentPractice( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix, lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls )
{
	this.constructCoreObject( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );
	this.appendInteractivity( asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt );
	this.appendFlashControls( lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls );
}


/////////////////////////////////////////////////////////////////
//  "appendFlashControls" method of IndependentPractice Class  //
/////////////////////////////////////////////////////////////////

IndependentPractice.prototype.appendFlashControls = function ( lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls )
{
	// flash audio control specs.

	this.audioControlWidth = lxAudioControlWidth;
	this.audioControlHeight = lyAudioControlHeight;
	this.audioControlDistanceFromBottom = yAudioControlDistanceFromBottom;

	// the strings of Flash Movie audio-control names.

	this.flashControlsArray = asFlashControls;

	// variables are done being used, so nullify them.

	lxAudioControlWidth = null;
	lyAudioControlHeight = null;
	yAudioControlDistanceFromBottom = null;
	asFlashControls = null;
}


/////////////////////////////////////////////////////////////////////////////////////////
//  MASTERY CHALLENGE CLASS                                                            //
/////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////
//  constructor method of MasteryChallenge Class  //
////////////////////////////////////////////////////

// inherits from IndependentPractice Class.

MasteryChallenge.prototype = new IndependentPractice();

function MasteryChallenge( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix, lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls, sRemediationText, sRemediationXmlFile, sRemediationPageUrl )
{
	this.constructCoreObject( sInstructionBoxType, iSteps, iStepsInitiallyVisible, iStepsAlreadyDisplayed, asInstructions, xInstructionBoxLeft, yTopPosition, lxExteriorWidth, lyExteriorHeight, lyInstructHeight, lySpacingBetween, lyFeedbackHeight, sImageNameSuffix );
	this.appendInteractivity( asFeedbackGood, asFeedbackBad1, asFeedbackBad2, asFbHighlights, asObjStateForCorrect, asPtsPossiblePerStep, asOnEveryGoodAttempt, asOnSecondBadAttempt );
	this.appendFlashControls( lxAudioControlWidth, lyAudioControlHeight, yAudioControlDistanceFromBottom, asFlashControls );
	this.appendEngineScoring( sRemediationText, sRemediationXmlFile, sRemediationPageUrl );
}


//////////////////////////////////////////////////////////////
//  "appendEngineScoring" method of MasteryChallenge Class  //
//////////////////////////////////////////////////////////////

MasteryChallenge.prototype.appendEngineScoring = function ( sRemediationText, sRemediationXmlFile, sRemediationPageUrl )
{
	// remediation.

	this.remediationTextString = sRemediationText;
	this.remediationXmlFileString = sRemediationXmlFile;
	this.remediationPageUrlString = sRemediationPageUrl;

	this.reportMustBeCalled = true;

	// variables are done being used, so nullify them.

	sRemediationText = null;
	sRemediationXmlFile = null;
	sRemediationPageUrl = null;
}


////////////////////////////////////////////////////////////////
//  "appendScoringFeedback" method of MasteryChallenge Class  //
////////////////////////////////////////////////////////////////
//
//  appends the assessessable-unit level points earned/possible feedback to the developer-defined
//  feedback.  the verbage will become an XML option, but as this functionality is needed before
//  a new release of the Engine can be developed, the following handles for its possible absence
//  and implements a default.

MasteryChallenge.prototype.appendScoringFeedback = function ()
{
	divFeedback.innerHTML += " You have scored ";
	divFeedback.innerHTML += parent.lesson.currentTopic.getPointsEarnedThisQuestion();
	divFeedback.innerHTML += " out of ";
	divFeedback.innerHTML += parent.lesson.currentTopic.getPointsPossibleThisQuestion();
	divFeedback.innerHTML += " points for this step.";

	// the currentItem counter has already been incremented one past, by this.update(),
	// so test against one less to see if we are at the last item.

	if ( ( this.currentItem - 1 ) == this.count )
	{
		divFeedback.innerHTML += "<br /><br />Click Next to continue.";
	}
}

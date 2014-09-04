/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//     jQuery module: instruct-box.                                    version 1.1     //
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



///////  listen for errors to know if any of the below fires them.

window.onerror = function( message, url, lineNumber )
{
	console.log( "Message: " + message );
	console.log( "URL: " + url );
	console.log( "Line: " + lineNumber );
}


///////  import this module's stylesheet.

$( document.head ).append( '<link rel="stylesheet" href="instruct-box/instruct-box-1.1.css" />' );

///////  import the jQuery UI library for draggable.

$( document.head ).append( '<script src="instruct-box/jquery-ui.min.js" ></script>' );



//////////////////////////////////
//  on page load event-handler  //
//////////////////////////////////

$( document ).ready( 

	function() 
	{
		// initialize the instruction box.

		instructBox.init( new oInstructData() );
	}
);


/////////////////////////////////
//  the "instructBox" Object.  //
/////////////////////////////////
// 
// handles all aspects of the displaying of the Instruction Box on the page and all of its interactivity w/ the Learner.
// self-calling/self-intantiating, so that it is available for use upon page load.
// 

var instructBox = function () 
{
	//////////////////////
	//  "global" vars.  //  (still internal to the object, but avail. across all of its methods.
	//////////////////////

	// will refer to the object that contains all of the page-level developer's instructional data, defined by them on the corresponding HTML page.

	var iboxData;

	// tracks the index of the current instructional steps in the steps collection.

	var stepsIndex = 0;
	var attemptsIndex = 0;


	////////////////////////////////////
	//  internal "helper" functions.  //
	////////////////////////////////////

	// implements the current step's event-listeners.

	function prepStep()
	{
		// point to the next Step's data.

		var oStep = iboxData.steps[ stepsIndex ];

		// if there is a next stepp...

		if ( oStep )
		{
			// and it has a list of Elems to be listened to...

			if ( oStep.listenToElements )
			{
				// attach event-listeners to each of them.

				$.each( oStep.listenToElements, 

					function( i, elem )
					{
						$( "#" + elem ).on( "click",  

							function( e )
							{
								// do NOT proceed if the Learner has just clicked on an <input> elem (e.g., to type answer into it, check answer-choice checkbox, etc.)

								if ( ! $( e.target ).is( "input" ) )
								{
									e.preventDefault();

									instructBox.judge( e.target.id );
								}
							}
						);
					}
				);
			}
		}
	}


	function cancelListeners()
	{
		// point to the next Step's data.

		var oStep = iboxData.steps[ stepsIndex ];

		// if there is a next stepp...

		if ( oStep )
		{
			// and it has a list of Elems to be listened to...

			if ( oStep.listenToElements )
			{
				// attach event-listeners to each of them.

				$.each( oStep.listenToElements, 

					function( i, elem )
					{
						$( "#" + elem ).off();
					}
				);
			}
		}
	}


	////////////////////////////////////
	//  the API of "public" methods.  //
	////////////////////////////////////

	return { // (note: return's bracket cannot be wrapped to next line per my usual C-style stylings.)

		///////////////////////////////////
		//  init:  called on page load.  //
		//- - - - - - - - - - - - - - - - -
		//  @param{ Object } oData	| The page-level instructional data object [ oInstructData() ] containing all the vars. defined by the content-developer on the HTML page to which this module is attached.
		// 
		// renders, populates, and displays the instruction box on the page; then self-calls "prepStep" to prepare initial instructional behaviors.

		init: function( oData )
		{
			// store Data "globally" for use by other API methods.

			iboxData = oData;

			///////  create and append the HTML elements.

			$( "<div>", { "id": "ibox" } ).append( 
	
				$( "<img />",
					{
						"id":	"ibox-bgImg",
						"src":	"instruct-box/ibox_ip.gif"
					}
				)
				,
				$( "<a>", { "href": "javascript:void(0);" } ).append( 

					$( "<div>",
						{
							"id":	"ibox-btnLeft",
							"title":'( click to "pop" me out of your way. )'
						}
					)
				)
				,
				$( "<a>", { "href": "javascript:void(0);" } ).append( 

					$( "<div>",
						{
							"id":	"ibox-btnRight",
							"title":'( click to "pop" me out of your way. )'
						}
					)
				)
				,
				$( "<div>", { "id": "ibox-content" } ).append( 
	
					$( "<div>", { "id": "ibox-instruct" } ).append( 
	
						$( '<table cellpadding="0" cellspacing="0" >' ).append( 
	
							$( "<tr>" ).append( 
	
								$( "<td>",
									{
										"id": "itbl-header",
										"colspan": "2",
										"height": "4"
									}
								)
							)
							,
							$( "<tr>" ).append( 
	
								$( "<td>",
									{
										"id": "itbl-label",
										"width": "2"
									}
								)
								,
								$( "<td>",
									{
										"id": "itbl-text",
										"class": "itxt current",
										"html": iboxData.instructions
									}
								)
							)
						)
					)
					,
					$( "<div>", { "id": "ibox-feedback" } )
				)
				,
				$( "<div>", { "id": "ibox-controls" } ).append( 
	
					$( "<img />",
						{
							"src":	"instruct-box/controls.gif",
							"title":"( controls are disabled: this Independent Practice has no audio. )"
						}
					)
				)
	
			).appendTo( "body" );

///////  and drop it in, as an animation.

$( "#ibox" ).animate( { top: "75px" }, 500 );

///////  and make it draggable (via jQuery UI).

$( "#ibox" ).draggable( { containment: "#dragzone", scroll: false } );



			///////  reposition horizontally, if the page-level Dev has defined that override of default.
	
			if ( iboxData.left )
			{
				$( "#ibox" ).css( "left", iboxData.left + "px" );
			}


			///////  attach event-listeners to the L/R "pop" buttons.

			$.each( [ "Left", "Right" ], 

				function( i, lateral )
				{
					$( "#ibox-btn" + lateral ).click( 

						function( e )
						{
							e.preventDefault();

							switch ( lateral )
							{
								case "Left":	var leftPos = "75px"; break;
								case "Right":	var leftPos = "679px"; break;
							}

							$( "#ibox" ).animate( { top: "75px", left: leftPos }, 280 );
						}
					);
				}
			);


			///////  call "prepStep()", to prep the initial step the Learner must take.

			prepStep();
		}
		,

		///////////////////////////////////
		//  judge:  called            .  //
		//- - - - - - - - - - - - - - - - -
		//  @param{ String } clickedElemID	| .
		// 
		// prepares the next page-level instructional behaviors (event-listeners and responses) in (self-tracking) sequence.

		judge: function( clickedElemID )
		{
			var bFailed = false;

			// first, judge the click.

			if ( clickedElemID === iboxData.steps[ stepsIndex ].correctBehaviors.clickTarget )
			{
				// are there any input-values to judge?

				var oInpValue = iboxData.steps[ stepsIndex ].correctBehaviors.inputValue;

				if ( oInpValue )
				{
					if ( $( "#" + oInpValue.id ).val() !== oInpValue.value )
					{
						bFailed = true;
					}
				}
			}
			else
			{
				bFailed = true;
			}


			if ( ! bFailed )
			{
				// if a highlight exists and has been displayed due to prior incorrect attempt, hide it now.

				$( "#hilight0" + ( stepsIndex + 1 ) ).css( "display", "none" );

				// display correct feedback.

				$( "#ibox-feedback" ).html( iboxData.steps[ stepsIndex ].positiveFeedback );

				// do the correctNextSteps

				eval( iboxData.steps[ stepsIndex ].correctNextSteps );

				// turn off any active Event Listeners that were in place for this step.

				cancelListeners();

				// increment the Steps counter and reset the Attempts counter.

				++ stepsIndex;
				attemptsIndex = 0;

				// SEGUE TO NEXT STEP.

				prepStep();
			}
			else // was answered incorrectly, so...
			{
				if ( ! attemptsIndex ) // first wrong attempt.
				{
					// display incorrect feedback, level 1.

					$( "#ibox-feedback" ).html( iboxData.steps[ stepsIndex ].negativeFBLevel1 );

					// increment the Attempts counter.

					++ attemptsIndex;
				}
				else // second wrong attempt.
				{
					// display incorrect feedback, level 1.

					$( "#ibox-feedback" ).html( iboxData.steps[ stepsIndex ].negativeFBLevel2 );

					// do the incorrectCleanup

					eval( iboxData.steps[ stepsIndex ].incorrectCleanup );

					// display highlights, if applicable.

					$( "#hilight0" + ( stepsIndex + 1 ) ).css( "display", "block" );
				}
			}
		}
	}; // end, return. (end public API.)

}(); // (note: self-calling to self-instantiate on browser-parse.)





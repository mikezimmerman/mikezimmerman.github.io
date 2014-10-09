$( document ).ready(

	function ()
	{
/////////////////////
//    Fade-Ins.    //
/////////////////////

		// fade-in all of the text to avoid FOUT.

		$( ".fadein" ).delay( 175 ).each( 

			function ()
			{
				$( this ).css( { opacity: 0.0, visibility: "visible" } ).animate( { opacity: 1.0 }, "slow", "linear" );
			}
		);

		$( "#showHideInfo-show" ).delay( 775 ).fadeIn( "slow", "linear" );


////////////////////////////
//    Event-Listeners.    //
////////////////////////////

		var tglShowHide = 0;

		// attach click event-listener to "show/hide more info" button.

		$( "#showHideInfo-btn" ).on( "click",

			function ( e )
			{
				switch ( tglShowHide )
				{
					case 0:

						$( "#built-with" ).fadeIn( 224, "linear" );
						$( "#showHideInfo-show" ).fadeOut( 224, "linear" );
						$( "#showHideInfo-hide" ).fadeIn( 224, "linear" );
						++ tglShowHide;

					break;

					case 1:

						$( "#built-with" ).fadeOut( 175, "linear" );
						$( "#showHideInfo-show" ).fadeIn( 175, "linear" );
						$( "#showHideInfo-hide" ).fadeOut( 175, "linear" );
						-- tglShowHide;

					break;
				}
			}
		);

		// when i clicked it too fast while testing, I realized that this selects it since it is just text; so, suppressing that.

		$( "#showHideInfo-btn" ).on( "dblclick",

			function ( e )
			{
				e.preventDefault();

				if ( document.selection )
				{
					document.selection.empty();
				}
				else
				{
					window.getSelection().removeAllRanges();
				}
			}
		);

		// nav-bar section-anchor/tooltip-displaying buttons.

		$( "a[ data-show-tt ]" ).each( 

			function ()
			{
				$( this ).on( "click",  

					function ( e )
					{
						// first, only if the target sect. is not visible, scroll to it.

						var anchor = "#" + this.innerText.toLowerCase();

						if ( ! $( anchor ).visible() )
						{
							$( "html, body" ).animate( { scrollTop: $( anchor ).offset().top }, "slow" );
						}

						// secondly, regardless, display a tooltip about it.

						$( "#ttip-" + this.innerText.toLowerCase() ).fadeIn( "slow" ).delay( 2720 ).fadeOut( "slow" );
					}
				);
			}
		);


///////////////////
//    Themes.    //
///////////////////

		// "globals".

		var themes = [ "Deep Midnight Flamingo", "Yunomi of Green Tea at Puget Sound", "Silver Lake", "Salmon Oshizushi on Mount Katmai", "Full Moon Over Malapascua Bay" ];
		var toggle = 0;

		function toggleTransitions()
		{
			$( ".button.secondary" ).toggleClass( "transxbg" );
			$( "#showHideInfo-btn" ).toggleClass( "transxco" );
		}

		// implement the color-transition animations on click of the "theme-selector" element.

		$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes.\nCurrent theme: "' + themes[ themes.length - 1 ] + '"\nNext up: "' + themes[ toggle ] + '"' );

		$( "#theme-selector" ).on( "click",

			function ( e )
			{
				// tmply. remove transitions, as these kill the fades.

				toggleTransitions();


				// animate the theme-selector.

				if ( toggle < ( themes.length - 1 ) ) // first n themes before last theme.
				{
					$( "#ts-0" + ( toggle + 0 ) ).delay( 225 ).animate( { height: "0" }, 700 );
					$( "#ts-0" + ( toggle + 1 ) ).delay( 225 ).animate( { height: "18px" }, 700 );
					$( "#ts-0" + ( toggle + 2 ) ).delay( 225 ).animate( { height: "7px" }, 700 );
				}
				else // final theme before start over.
				{
					$( "#ts-0" + ( toggle + 0 ) ).delay( 225 ).animate( { height: "0" }, 700 );

					$( "#ts-0" + ( toggle + 1 ) ).delay( 225 ).animate( { height: "18px" }, 700,

						function ()
						{
							$( this ).height( 0 );
							$( "#ts-00" ).height( 18 );
						}
					);

					$( "#ts-0" + ( toggle + 2 ) ).delay( 225 ).animate( { height: "7px" }, 700,

						function ()
						{
							$( this ).height( 0 );
							$( "#ts-01" ).height( 7 );
						}
					);
				}

				// animate the "headshot" images.

				switch ( toggle )
				{
					case 0:

						$( "#hs-1" ).fadeIn( 1100, toggleTransitions );

					break;

					case 1:

						$( "#hs-2" ).fadeIn( 1100,

							function ()
							{
								$( "#hs-1" ).css( "display", "none" );
								toggleTransitions();
							}
						);

					break;

					case 2:

						$( "#hs-3" ).fadeIn( 1100,

							function ()
							{
								$( "#hs-2" ).css( "display", "none" );
								toggleTransitions();
							}
						);

					break;

					case 3:

						$( "#hs-4" ).fadeIn( 1100,

							function ()
							{
								$( "#hs-3" ).css( "display", "none" );
								toggleTransitions();
							}
						);

					break;

					case 4:

						$( "#hs-4" ).fadeOut( 1100, toggleTransitions );

					break;
				}

				// primary theme fade-transitions (using jQueryUI)---this is all color and bgcolor (everything other than headshot imgs and theme selector).

				++ toggle;

				toggle = ( toggle !== themes.length ? toggle : 0 );

				if ( ! toggle )
				{
					var c = 1;

					for ( ; c < themes.length - 1; c ++ )
					{
						$( ".theme00" ).removeClass( "theme0" + c );
					}

					$( ".theme00" ).toggleClass( "theme0" + c, 1100, "linear",

						function ()
						{
							$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes.\nCurrent theme: "' + themes[ themes.length - 1 ] + '"\nNext up: "' + themes[ toggle ] + '"' );
						}
					);
				}
				else
				{
					$( ( ".theme00" ) ).toggleClass( ("theme0" + toggle), 1100, "linear",

						function ()
						{
							$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes.\nCurrent theme: "' + themes[ toggle - 1 ] + '"\nNext up: "' + themes[ toggle ] + '"' );
						}
					);
				}
			}
		);
	}
);

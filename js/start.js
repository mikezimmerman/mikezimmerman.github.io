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

		var toggle = 0;

		// attach click event-listener to "show/hide more info" button.

		$( "#showHideInfo-btn" ).on( "click",

			function ( e )
			{
				switch ( toggle )
				{
					case 0:

						$( "#built-with" ).fadeIn( 224, "linear" );
						$( "#showHideInfo-show" ).fadeOut( 224, "linear" );
						$( "#showHideInfo-hide" ).fadeIn( 224, "linear" );
						++ toggle;

					break;

					case 1:

						$( "#built-with" ).fadeOut( 175, "linear" );
						$( "#showHideInfo-show" ).fadeIn( 175, "linear" );
						$( "#showHideInfo-hide" ).fadeOut( 175, "linear" );
						-- toggle;

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

		function repositionTT( obj )
		{
			var winWidth  = $( window ).width();
			var objLeft   = parseFloat( $( obj ).css( "left" ) );
			var objWidth  = parseFloat( $( obj ).css( "width" ) );
			var padRight  = winWidth - ( $( "#theme-selector" ).offset().left + $( "#theme-selector" ).width() );
			var reposLeft = ( winWidth - objWidth - padRight ) + "px";
			var reposTop  = ( $( "#theme-selector" ).offset().top + $( "#theme-selector" ).height() + 1 ) + "px";

			if ( ( objLeft + objWidth ) >= winWidth )
			{
				$( "#ttip-themesel" ).css( { left: reposLeft, top: "0px" } );
			}
		};

		$( "#theme-selector" ).hover( 

			function ( e )
			{
				// position the tooltip.

				$( "#ttip-themesel" ).css( { left: $( this ).offset().left + "px", top: $( this ).offset().top + "px" } );

				// now fix if inside smartdevice "Menu" bar.

				repositionTT( "#ttip-themesel" );

				// display the tooltip.

				$( "#ttip-themesel" ).fadeIn( 224 );
			}
			,

			function ( e )
			{
				// display the tooltip.

				$( "#ttip-themesel" ).fadeOut( 224 );
			}
		);

///////////////////
//    Themes.    //
///////////////////

		// "globals".

		var themes = [ "Deep Midnight Flamingo", "Yunomi of Green Tea at Puget Sound", "Silver Lake", "Salmon Oshizushi on Mount Katmai", "Full Moon Over Malapascua Bay" ];
		var itheme = 0;
		var baseSpeed = 1050;

		function toggleTransitions()
		{
			$( ".button.secondary" ).toggleClass( "transxbg" );
			$( "#showHideInfo-btn" ).toggleClass( "transxco" );
		}

		// implement the color-transition animations on click of the "theme-selector" element.

		$( "#sThisTheme" ).html( themes[ themes.length - 1 ] );
		$( "#sNextTheme" ).html( themes[ itheme ] );

		$( "#theme-selector" ).on( "click",

			function ( e )
			{
				// tmply. remove transitions, as these kill the fades.

				toggleTransitions();


				// animate the theme-selector.

				if ( itheme < ( themes.length - 1 ) ) // first n themes before last theme.
				{
					$( "#ts-0" + ( itheme + 0 ) ).delay( 225 ).animate( { height: "0" }, 700 );
					$( "#ts-0" + ( itheme + 1 ) ).delay( 225 ).animate( { height: "18px" }, 700 );
					$( "#ts-0" + ( itheme + 2 ) ).delay( 225 ).animate( { height: "7px" }, 700 );
				}
				else // final theme before start over.
				{
					$( "#ts-0" + ( itheme + 0 ) ).delay( 225 ).animate( { height: "0" }, 700 );

					$( "#ts-0" + ( itheme + 1 ) ).delay( 225 ).animate( { height: "18px" }, 700,

						function ()
						{
							$( this ).height( 0 );
							$( "#ts-00" ).height( 18 );
						}
					);

					$( "#ts-0" + ( itheme + 2 ) ).delay( 225 ).animate( { height: "7px" }, 700,

						function ()
						{
							$( this ).height( 0 );
							$( "#ts-01" ).height( 7 );
						}
					);
				}

				// animate the "headshot" images.

				switch ( itheme )
				{
					case 0:

						$( "#hs-1" ).fadeIn( baseSpeed, toggleTransitions );

					break;

					case 1:

						$( "#hs-2" ).fadeIn( baseSpeed,

							function ()
							{
								$( "#hs-1" ).css( "display", "none" );
								toggleTransitions();
							}
						);

					break;

					case 2:

						$( "#hs-3" ).fadeIn( baseSpeed,

							function ()
							{
								$( "#hs-2" ).css( "display", "none" );
								toggleTransitions();
							}
						);

					break;

					case 3:

						$( "#hs-4" ).fadeIn( baseSpeed,

							function ()
							{
								$( "#hs-3" ).css( "display", "none" );
								toggleTransitions();
							}
						);

					break;

					case 4:

						$( "#hs-4" ).fadeOut( baseSpeed, toggleTransitions );

					break;
				}

				// primary theme fade-transitions (using jQueryUI)---this is all color and bgcolor (everything other than headshot imgs and theme selector).

				++ itheme;

				itheme = ( itheme !== themes.length ? itheme : 0 );

				if ( ! itheme )
				{
					var c = 1;

					for ( ; c < themes.length - 1; c ++ )
					{
						$( ".theme00" ).removeClass( "theme0" + c );
					}

					$( ".theme00" ).toggleClass( "theme0" + c, baseSpeed, "linear" );

					$( "#sThisTheme" ).fadeOut( ( baseSpeed / 2 ),

						function ()
						{
							$( "#sThisTheme" ).html( themes[ themes.length - 1 ] );
							$( "#sThisTheme" ).fadeIn( baseSpeed / 2 );
						}
					);

					$( "#sNextTheme" ).fadeOut( ( baseSpeed / 2 ),

						function ()
						{
							$( "#sNextTheme" ).html( themes[ itheme ] );
							$( "#sNextTheme" ).fadeIn( baseSpeed / 2 );
						}
					);
				}
				else
				{
					$( ( ".theme00" ) ).toggleClass( ( "theme0" + itheme ), baseSpeed, "linear" );

					$( "#sThisTheme" ).fadeOut( ( baseSpeed / 2 ),

						function ()
						{
							$( "#sThisTheme" ).html( themes[ itheme - 1 ] );
							$( "#sThisTheme" ).fadeIn( baseSpeed / 2 );
						}
					);

					$( "#sNextTheme" ).fadeOut( ( baseSpeed / 2 ),

						function ()
						{
							$( "#sNextTheme" ).html( themes[ itheme ] );
							$( "#sNextTheme" ).fadeIn( baseSpeed / 2 );
						}
					);
				}
			}
		);
	}
);

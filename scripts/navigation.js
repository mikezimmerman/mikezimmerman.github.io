$( document ).ready(

	function ()
	{
		// fade-in all of the text to avoid FOUT.

		$( ".fadein" ).each( 

			function ()
			{
				$( this ).css( { opacity: 0.0, visibility: "visible" } ).animate( { opacity: 1.0 }, "slow", "linear" );
			}
		);

		// attach click event-listeners to all of the buttons.

		$( "button" ).each( 

			function ()
			{
				if ( $( this ).data( "href" ) ) // link button
				{
					$( this ).attr( "title", this.innerText );

					$( this ).on( "click",  

						function ( e )
						{
							window.location.href = $( this ).data( "href" );
						}
					);
				}
				else
				{
					if ( $( this ).data( "mailto" ) ) // mailto button
					{
						$( this ).on( "click",  

							function ( e )
							{
								window.location.href = "mailto:" + $( this ).data( "mailto" );
							}
						);
					}
					else // nav button
					{
						$( this ).on( "click",  

							function ( e )
							{
								// first, only if the target sect. is not visible, scroll to it.

								var anchor = "#" + this.innerText.toLowerCase();

								if ( ! $( anchor ).visible() )
								{
									location.hash = anchor;
								}

								// secondly, regardless, display a tooltip about it.

								$( "#ttip-" + this.innerText.toLowerCase() ).fadeIn( "slow" ).delay( 2750 ).fadeOut( "slow" );
							}
						);
					}
				}
			}
		);


		// implement the color-transition animations on click of the "theme-selector" element.

		var themes = [ "Deep Midnight Flamingo", "Yunomi of Green Tea at Puget Sound", "Silver Lake", "Fool's Gold", "Full Moon Over Malapascua Bay" ];
		var toggle = 0;
		var pretog;

		$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes.\nCurrent theme: "' + themes[ themes.length - 1 ] + '"\nNext up: "' + themes[ toggle ] + '"' );

		$( "#theme-selector" ).on( "click",

			function ( e )
			{
				// tmply. remove transitions, as these kill the fades.

				$( "button" ).css( "transition", "0" );


				// animate the theme-selector. (this was also the most efficient place to transition the headshots, when applicable.)

				if ( toggle < ( themes.length - 1 ) ) // first n themes before last theme.
				{
					$( "#ts-0" + ( toggle + 0 ) ).delay( 225 ).animate( { height: "0" }, 700 );
					$( "#ts-0" + ( toggle + 1 ) ).delay( 225 ).animate( { height: "15px" }, 700 );
					$( "#ts-0" + ( toggle + 2 ) ).delay( 225 ).animate( { height: "7px" }, 700 );
				}
				else // final theme before start over.
				{
					$( "#ts-0" + ( toggle + 0 ) ).delay( 225 ).animate( { height: "0" }, 700 );

					$( "#ts-0" + ( toggle + 1 ) ).delay( 225 ).animate( { height: "15px" }, 700,

						function ()
						{
							$( this ).height( 0 );
							$( "#ts-00" ).height( 15 );
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

				switch ( toggle )
				{
					case 1:

						$( "#hs-2" ).fadeIn( 1100 );

					break;

					case 2:

						$( "#hs-3" ).fadeIn( 1100,

							function ()
							{
								$( "#hs-2" ).css( "display", "none" );
							}
						);

					break;

					case 3:

						$( "#hs-4" ).fadeIn( 1100,

							function ()
							{
								$( "#hs-3" ).css( "display", "none" );
							}
						);

					break;

					case 4:

						$( "#hs-4" ).fadeOut( 1100 );

					break;
				}


				// fade the link images in and out, as these could not be correctly blended via toggleClass.

				pretog = toggle;
				++ toggle;
				toggle = ( toggle !== themes.length ? toggle : 0 );

				$( "#link-s-" + pretog + ", #link-v-" + pretog ).fadeOut( 550,

					function ()
					{
						$( "#link-s-" + toggle + ", #link-v-" + toggle ).fadeIn( 550,

							function ()
							{
								// restore transitions.

								$( "button" ).css( "transition", "0.225s" );
							}
						);
					}
				);


				// primary theme fade-transitions (using jQueryUI). (this is all color and bgcolors---everything other than the imgs above.)

				if ( ! toggle )
				{
					var c = 1;

					for ( ; c < themes.length - 1; c ++ )
					{
						$( ".cw00" ).removeClass( "cw0" + c );
					}

					$( ".cw00" ).toggleClass( "cw0" + c, 1100, "linear",

						function ()
						{
							$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes.\nCurrent theme: "' + themes[ themes.length - 1 ] + '"\nNext up: "' + themes[ toggle ] + '"' );
						}
					);
				}
				else
				{
					$( (".cw00") ).toggleClass( ("cw0" + toggle), 1100, "linear",

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

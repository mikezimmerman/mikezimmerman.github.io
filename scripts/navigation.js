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

		var themes = [ "Deep Midnight Flamingo", "Blue Skies Above! (Vats of Bile Below)", "Last Place in the Middle School Science Fair ;-{", "Full Moon Over Malapascua Bay" ];
		var toggle = 0;
		var pretog;

		$( "#theme-selector" ).on( "click",

			function ( e )
			{
				// tmply. remove transitions, as these kill the fades.

				$( "button" ).css( "transition", "0" );


				// animate the theme-selector. (this was also the most efficient place to transition the headshots, when applicable.)

				switch ( toggle )
				{
					case 0:

						$( "#ts-01" ).delay( 225 ).animate( { height: "0" }, 700 );
						$( "#ts-02" ).delay( 225 ).animate( { height: "15px" }, 700 );
						$( "#ts-03" ).delay( 225 ).animate( { height: "7px" }, 700 );

					break;

					case 1:

						$( "#hs-2" ).fadeIn( 1100 );

						$( "#ts-02" ).delay( 225 ).animate( { height: "0" }, 700 );
						$( "#ts-03" ).delay( 225 ).animate( { height: "15px" }, 700 );
						$( "#ts-00" ).delay( 225 ).animate( { height: "7px" }, 700 );

					break;

					case 2:

						$( "#hs-3" ).fadeIn( 1100,

							function ()
							{
								$( "#hs-2" ).css( "display", "none" );
							}
						);

						$( "#ts-03" ).delay( 225 ).animate( { height: "0" }, 700 );
						$( "#ts-00" ).delay( 225 ).animate( { height: "15px" }, 700 );
						$( "#ts-01-2" ).delay( 225 ).animate( { height: "7px" }, 700 );

					break;

					case 3:

						$( "#hs-3" ).fadeOut( 1100 );

						$( "#ts-00" ).delay( 225 ).animate( { height: "0" }, 700 );

						$( "#ts-01-2" ).delay( 225 ).animate( { height: "15px" }, 700, 

							function ()
							{
								$( "#ts-01-2" ).height( 0 );
								$( "#ts-01" ).height( 15 );
							}
						);

						$( "#ts-02-2" ).delay( 225 ).animate( { height: "7px" }, 700, 

							function ()
							{
								$( "#ts-02-2" ).height( 0 );
								$( "#ts-02" ).height( 7 );
							}
						);

					break;
				}


				// fade the link images in and out, as these could not be correctly blended via toggleClass.

				pretog = toggle;
				++ toggle;
				toggle = ( toggle !== 4 ? toggle : 0 );

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
					$( ".cw00" ).removeClass( "cw01" );
					$( ".cw00" ).removeClass( "cw02" );
					$( ".cw00" ).toggleClass( "cw03", 1100, "linear",

						function ()
						{
							$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes. Next up is: "' + themes[ toggle ] + '"' );
						}
					);
				}
				else
				{
					$( (".cw00") ).toggleClass( ("cw0" + toggle), 1100, "linear",

						function ()
						{
							$( "#theme-selector" ).attr( "title", 'Click here to rotate through themes. Next up is: "' + themes[ toggle ] + '"' );
						}
					);
				}
			}
		);
	}
);

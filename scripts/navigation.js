$( document ).ready(

	function ()
	{
		// fade-in all of the text to avoid FOUT.

		$( ".fontFade" ).each( 

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

		// implement the colorway-swapping on click of the "color-swap" element.

		var themes = [ "Deep Midnight Flamingo", "Full Moon Over Malapascua Bay" ];
		var toggle = 0;
		var pretog;

		$( "#color-swap" ).on( "click",  

			function ( e )
			{
				// remove transitions, as these kill the fades.

				$( "button" ).css( "transition", "0" );

				// fade the link images in and out, as these could not be correctly blended via toggleClass.

				pretog = toggle;
				toggle = ( toggle !== 1 ? 1 : 0 );

				$( "#link-1-0" + pretog ).fadeOut( 550,

					function ()
					{
						$( "#link-1-0" + toggle ).fadeIn( 550,

							function ()
							{
								$( "button" ).css( "transition", "0.225s" );
							}
						);
					}
				);

				$( "#link-2-0" + pretog ).fadeOut( 550,

					function ()
					{
						$( "#link-2-0" + toggle ).fadeIn( 550 );
					}
				);

				$( ".cw01" ).toggleClass( "cw02", 1100, "linear",

					function ()
					{
						$( "#color-swap" ).attr( "title", 'Click here to install the "' + themes[ toggle ] + '" theme.' );
					}
				);
			}
		);
	}
);

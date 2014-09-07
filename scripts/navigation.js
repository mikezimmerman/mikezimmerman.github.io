$( document ).ready(

	function ()
	{
		// fade-in all of the text to avoid FOUT.

		$( ".fontFade" ).css( { opacity: 0.0, visibility: "visible" } ).animate( { opacity: 1.0 }, "slow", "linear" );


		// attach click event-listeners to all of the buttons.

		$( "button" ).each( 

			function ()
			{
				if ( $( this ).data( "href" ) ) // link button
				{
					$( this ).on( "mouseenter", 

						function( e )
						{
							$( this ).children( "img" ).attr( "src", "./images/link-pw.gif" );
						}
					);

					$( this ).on( "mouseleave", 

						function( e )
						{
							$( this ).children( "img" ).attr( "src", "./images/link-pp.gif" );
						}
					);

					$( this ).on( "click",  

						function( e )
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

							function( e )
							{
								window.location.href = "mailto:" + $( this ).data( "mailto" );
							}
						);
					}
					else // nav button
					{
						$( this ).on( "click",  

							function( e )
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
	}
);

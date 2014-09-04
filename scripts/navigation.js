$( document ).ready(

	function ()
	{
		// attach click event-listeners to all of the buttons.

		$( "button" ).each( 

			function ()
			{
				if ( $( this ).data( "href" ) ) // link button
				{
					$( this ).on( "mouseenter", 

						function( e )
						{
							$( this ).children( "img" ).attr( "src", "./images/link-pw.png" );
						}
					);

					$( this ).on( "mouseleave", 

						function( e )
						{
							$( this ).children( "img" ).attr( "src", "./images/link-pp.png" );
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

								$( "#ttip-" + this.innerText.toLowerCase() ).fadeIn( "slow" ).delay( 2800 ).fadeOut( "slow" );
							}
						);
					}
				}
			}
		);
	}
);

var COR = ( function () {

    var cor = {};
    
    /**
     *  _String Utilities
     */
    cor._String = {};
    
        cor._String.minifyString = function ( stringItem ) {
            return stringItem.replace( '<br>','' ).replace( '<br />','' ).replace( /[! ? . ' " , > < - \s]+/g,'' ).toLowerCase();
        }; //-- cor._String.minifyString( stringItem )
    
    /**
	 *	_Params Utilities
	 */
	cor._Params = {};
		
		cor._Params.queryParam = function ( paramName ) {
			var query = {}, m, v, k; 
			for ( v = location.href.split( /[?&]/ ), k = v.length - 1; k > 0; k -= 1 ) {
				query[( m = v[k].split( /[=#]/ ) )[0]] = m.length > 1 ? decodeURI( m[1] ) : "";
			}
			return query[paramName] !== undefined ? query[paramName] : false;
		}; //-- cor._Params.queryParam( paramName )

		cor._Params.addParam = function ( paramName, paramValue ) {
			var paramDivider, currentParam = location.search;
			if ( currentParam === '' ) {
				paramDivider = '';
			} else {
				paramDivider = '&';
			}
			location.search = currentParam + paramDivider + paramName + '=' + paramValue;
		}; //-- cor._Params.addParam( paramName, paramValue )
	
	/**
	 *	_Hash Utilities
	 */
	cor._Hash = {};
	
		cor._Hash.getHash = function () {
			var currentHash = location.hash.match( /^#?(.*)$/ )[1];
			return currentHash === '' ? false : currentHash;
		}; //-- cor._Hash.getHash()
	
		cor._Hash.addHash = function ( hashName, hashValue, hashDivider, keepCurrent ) {
			if ( keepCurrent === true ) {
				keepCurrent = cor._Hash.getHash() + '&';
			} else {
				keepCurrent = '';
			}
			location.hash = keepCurrent + hashName + hashDivider + hashValue;
		}; //-- cor._Hash.addHash( hashName, hashValue, hashDivider, keepCurrent )
	
		cor._Hash.queryHash = function ( hashName ) {
			var query = {}, m, v, k; 
			for ( v = location.href.split( /[&#]/ ), k = v.length - 1; k > 0; k -= 1 ) {
				query[( m = v[k].split( /[=&]/ ) )[0]] = m.length > 1 ? decodeURI(m[1] ) : "";
			}
			return query[hashName] !== undefined ? query[hashName] : false;
		}; //-- cor._Hash.queryHash( hashName )
	
	/**
	 *	_Array Utilities
	 */
	cor._Array = {};
	
		cor._Array.removeDuplicates = function ( arrayItem ) {
			var i;
			arrayItem.sort();
			for ( i = 1; i < arrayItem.length; ) {
				if ( arrayItem[i - 1] === arrayItem[i] ) {
					arrayItem.splice( i, 1 );
				} else {
					i = i + 1;
				}
			}
			return arrayItem;
		}; //-- cor._Array.removeDuplicates( arrayItem )
	
	/**
	 *	_Object Utilities
	 */
	cor._Object = {};
		
		cor._Object.listOF = function ( objName ) {
			if ( typeof objName !== 'object' ) {
				throw 'ERROR caused by @objName. Expected object, was passed a ' + typeof objName;
			}
			var ofList = [], of;
			for ( of in objName ) {
				if ( typeof objName[of] === 'object' ) {
					ofList.push( [of, this.listOF( objName[of], 'function' )] );
				} else if ( typeof objName[of] === 'function' ) {
					ofList.push( of );
				}
			}
			return ofList.length !== 0 ? ofList : false;
		}; //-- cor._Object.listOF( objName )
		
	/**
	 *	_Logging Utilities
	 */
	cor._Logging = {};

		cor._Logging.setLogging = function () {
			var isLogging = cor._Params.queryParam( 'showlogs' );
			window.log = function ( string ) {
				if ( typeof console === 'object' ) {
					console.log( string );
				}
			};
			if ( typeof console === 'undefined' ) {
				console = { log: function () {} };
			} else if ( isLogging !== 'true' || typeof console.log === 'undefined' ) {
				console.log = function () {};
			}
			if ( ( cor._Params.queryParam( 'testing' ) === 'false' ) || ( cor._Params.queryParam( 'testing' ) === false ) || ( cor._Params.queryParam( 'testing' ) === undefined ) ) {
				return false;
			} else {
				if ( cor._Params.queryParam( 'showlogs' ) !== 'true' ) { cor._Params.addParam( 'showlogs', 'true' ); }
				return true;
			}
		}(); //-- cor._Logging.setLogging()
		
	/**
	 *	_Browser Utilities
	 */
	cor._Browser = {};
	
		cor._Browser.getBrowserDims = function ( axis, midpoints ) {
			var bVal = '', browser = { bWidth: 0, bHeight: 0 }, midArray = [];
			if ( document.body && document.body.offsetWidth ) {
				browser.bWidth = document.body.offsetWidth; browser.bHeight = document.body.offsetHeight;
			}
			if ( document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
				browser.bWidth = document.documentElement.offsetWidth; browser.bHeight = document.documentElement.offsetHeight;
			}
			if ( window.innerWidth && window.innerHeight ) {
				browser.bWidth = window.innerWidth; browser.bHeight = window.innerHeight;
			}
			if ( midpoints ) {
				midArray.push( browser.bWidth / 2 ); midArray.push( browser.bHeight / 2 );
				return midArray;
			} else {
				switch ( axis ) {
					case 'width': bVal = browser.bWidth; break;
					case 'height': bVal = browser.bHeight; break;
					default: bVal = 0; break;
				}
				return bVal;
			}
		}; //-- cor._Browser.getBrowserDims()
	
	/*-- ########################################################################################## --*/
	/**
	 *	_JQ Utilities
	 *	- Aside from cor._JQ.jQueryIsLoaded, jQuery is required for these Utility items
	 */
	cor._JQ = {};
	
		cor._JQ.jQueryIsLoaded = function () {
            return typeof jQuery === 'function' ? true : false;
		}; //-- cor._Gen.jQueryIsLoaded()
		
		cor._JQ.killBadAnchors = function () {
			if( !cor._JQ.jQueryIsLoaded() ) { throw 'ERROR: jQuery is required for cor._JQ.Methods'; }
			$( 'a[href="#"], a[href=""]' ).each( function () {
				$( this ).click( function ( event ) {
					event.preventDefault();
				});
			});
		}; //-- cor._JQ.killBadAnchors()
		
		cor._JQ.setUniqueID = function ( tagGroup, tagItem, tagName, groupDivider, itemDivider, skipGroup ) {
			if( !cor._JQ.jQueryIsLoaded() ) { throw 'ERROR: jQuery is required for cor._JQ.Methods'; }
			skipGroup = skipGroup || false;
			$( tagGroup ).each( function ( g ) {
				$( this ).find( tagItem ).each( function ( i ) {
					if ( skipGroup === true ) {
						$( this ).attr( 'id', tagName + itemDivider + i );
					} else {
						$( this ).attr( 'id', tagName + groupDivider + g + itemDivider + i );
					}
				});
			});
		}; //-- cor._JQ.setUniqueID()
		
		cor._JQ.itemOffset = function ( item, axis ) {
			if( !cor._JQ.jQueryIsLoaded() ) { throw 'ERROR: jQuery is required for cor._JQ.Methods'; }
			var offset = $( item ).offset(), sendOffset = '';
			switch ( axis ) {
				case 'left': sendOffset = parseInt( offset.left, 10 ); break;
				case 'top': sendOffset = parseInt( offset.top, 10 ); break;
				default: sendOffset = 0; break;
			}
			return parseInt( sendOffset, 10 );
		}; //-- cor._JQ.itemOffset()
		
		cor._JQ.getMinMax = function ( pushGroup, type ) {
			var type_array = [], minmax_array = [],
				max_type, min_type;
			$( pushGroup ).each( function () {
				switch ( type ) {
					case 'vertical'		: type_array.push( $( this ).innerHeight() ); break;
					case 'horizontal'	: type_array.push( $( this ).innerWidth() ); break;
					case 'number'		: type_array.push( $( this ).toArray()[0] );
				}
			});		
			max_type = type_array[0]; min_type = type_array[0];
			$( type_array ).each( function ( i ) {
				if ( max_type <= type_array[i] ) max_type = type_array[i];
				if ( min_type >= type_array[i] ) min_type = type_array[i];
			});
			minmax_array.push( min_type, max_type );
			return minmax_array;
		}; //-- cor._JQ.getMinMax()
		
		cor._JQ.killBadAnchors = function () {
			$( 'a[href="#"], a[href=""]' ).each( function () {
				$( this ).click( function ( event ) {
					event.preventDefault();
				});
			});
		}; //-- cor._JQ.killBadAnchors()
	
	return cor;
	
})();
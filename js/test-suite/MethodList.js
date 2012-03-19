/* ####### COR USAGE ######################################################
 *  - COR._Object.listOF()
 */

var MethodList = function () {
    log( '---->MethodList()' );
    this.getList();
};

MethodList.prototype.getList = function () {
    log( '---->MethodList.getList()' );
    
    var UtilsMain = COR._Object.listOF( COR ), // call COR on itself to get it's list of Objects
        UtilsSub = [],
        Main = '', Sub = '', Item = '',
        listObj = $( 'ul#methodList' ),
        listClass = 'Main';
    
    listObj.html( '' );
    
    for ( Main in UtilsMain ) {
        UtilsSub = UtilsMain[Main];
        for ( Sub in UtilsSub ) {
            if ( Sub % 2 !== 0 ) {
                for ( Item in UtilsSub[Sub] ) {
                    log( 'sub: ' + UtilsSub[Sub][Item] );
                    this.writeUtilItem( listObj, 'sub', Item, UtilsSub[Sub] );
                }                
            } else {
                log( 'main: ' + UtilsSub[Sub] );
                this.writeUtilItem( listObj, 'main', Sub, UtilsSub );
            }
        }
    }
    
};

MethodList.prototype.writeUtilItem = function ( listObj, listClass, Sub, UtilsSub ) {
    log( '---->MethodList.writeUtilItem()' );
    listObj.append( '<li class="' + listClass + '_' + Sub % 2 + '">' + UtilsSub[Sub] + '</li>' );
};

MethodList = new MethodList();
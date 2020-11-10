function Sprite( filename, left, top ) {                        // foncion de création d'objet (élément graphique qui peut se déplacer sur l'écran)
    this._node = document.createElement( "img" );
    this._node.src = filename;
    this._node.style.position = "absolute";
    document.body.appendChild( this._node );


    Object.defineProperty( this, "left", {                      // proriété de mouvement
            get: function() {                                   // methode d'accés en lecture GETTER 
                return this._left;
            },
            set: function( value ) {                            //  methode d'accés en écriture SETTER
                this._left = value;
                this._node.style.left = this._left + "px";      // attribue _node correspond au tag d'image
            }
    } ); 

    Object.defineProperty( this, "top", { 
        get: function() { 
            return this._top;
        },
        set: function( value ) {
            this._top = value;
            this._node.style.top = this._top + "px";
        }
    } ); 

    Object.defineProperty( this, "display", {                   // proriété display gére l'affichage
        get: function() {                                       // methode d'accés en lecture GETTER 
            return this._node.style.display;
        },
        set: function( value ) {                                //  methode d'accés en écriture SETTER
            this._node.style.display = value;
        }
    } ); 
    
    this.left = left;
    this.top = top;

}

Sprite.prototype.startAnimation = function( fct, interval ) {   // tableau de méthode à 2 entrée
    if ( this._clock ) window.clearInterval( this._clock );
    var _this = this;
    this._clock = window.setInterval( function() {
        fct( _this );
    }, interval );
};

Sprite.prototype.stopAnimation = function() {
    window.clearInterval( this._clock );
};

Sprite.prototype.checkCollision = function ( other ) {

    return ! ( (this.top + this._node.height < other.top) || 
                this.top > (other.top + other._node.height) ||
                (this.left + this._node.width < other.left) || 
                this.left > (other.left + other._node.width) );

}

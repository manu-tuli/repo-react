
function Keyboard() {   
    function GetKey(e){
        e.preventDefault();
        console.log('Le lien a été cliqué.');  // envoyer le contenu
    }

    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L',
    'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];

    return (
        <div className="letter-container" style= {{display: "flex"}}>
            {alphabet.map((letter) => <button className="letter" onClick={GetKey}>{letter}</button>)}
        </div>
    );
}
export default Keyboard; 
import './Keyboard.css';

function Keyboard() {   
    
    function GetKey(e){
        e.preventDefault();
        console.log(e);
        console.log('Le lien a été cliqué.');  // envoyer le contenu
    }

    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L',
    'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];

    return (
        <div className="letter-container" style= {{display: "flex"}}>
            {alphabet.map((letter, index) => <div className="letter" 
            key={index} value={letter} onClick={GetKey}>{letter}</div>)}
        </div>
    );
}
export default Keyboard; 
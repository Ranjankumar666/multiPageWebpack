import './Header.scss';

class Header{
  constructor(text){
    this.text = text;
  }
  render(){
    const h2= document.createElement('h2');
    h2.textContent = this.text;
    h2.classList.add('header');
    document.querySelector('body').appendChild(h2);
  }
}

export default Header;

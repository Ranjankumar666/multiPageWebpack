import Image from '../../HelloWorld.png';
import './HelloImage.scss';

class HelloImage{
  render(){
    const img = document.createElement('img');
    img.classList.add('img');
    img.src= Image;

    document.querySelector('body').appendChild(img);
  }
}

export default HelloImage;

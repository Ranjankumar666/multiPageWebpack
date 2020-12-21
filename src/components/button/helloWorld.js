import helloWorld from '../../hello-world.js';
import './helloWorld.scss';


class HelloWorld{
  btnClass = 'btn';
  render(){
    const btn = document.createElement('button');
    btn.textContent = 'Hello World';
    btn.onclick = helloWorld;
    btn.classList.add(this.btnClass);

    document.querySelector('body').append(btn);
  }
}

export default HelloWorld;

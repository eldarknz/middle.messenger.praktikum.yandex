//import Block from './Block';

 const render = (dest: string, block: any) => {
  const root = document.querySelector(dest);

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
  
  block.dispatchComponentDidMount();
}

export default render
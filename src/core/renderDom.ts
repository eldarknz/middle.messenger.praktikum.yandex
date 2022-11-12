import Block from "./block";

const renderDOM = (dest: string, block: Block) => {
  const root = document.querySelector(dest);

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
  block.dispatchComponentDidMount();
};

export default renderDOM

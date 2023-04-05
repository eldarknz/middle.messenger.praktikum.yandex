// Core
import Block from "@core/block";

const renderDOM = (query: string, block: Block) => {
  const root = document.querySelector(query);

  root!.innerHTML = "";
  const blockContent = block.getContent();
  root!.appendChild(blockContent);
  block.dispatchComponentDidMount();
};

export default renderDOM

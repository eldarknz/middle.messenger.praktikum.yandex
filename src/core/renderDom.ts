// Core
import { Block } from "@core/block";

export const renderDOM = (query: string, block: Block) => {
  const root = document.querySelector(query);

  root!.innerHTML = "";
  const blockContent = block.getContent();
  root!.appendChild(blockContent);
  block.dispatchComponentDidMount();
};

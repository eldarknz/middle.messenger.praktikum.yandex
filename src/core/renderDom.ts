import Block from "./block";

const renderDOM = (query: string, block: Block) => {
  globalThis.DEBUG?.RenderDOM && globalThis.LOG && console.log("🧱 Вставка блока в DOM - RenderDOM", query, block);
  
  const root = document.querySelector(query);

  root!.innerHTML = '';
  const blockContent = block.getContent();
  root!.appendChild(blockContent);
  block.dispatchComponentDidMount();
};

export default renderDOM

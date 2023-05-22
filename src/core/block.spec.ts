import { assert } from "chai";
import { Block } from "./block";

const template = `<div {{#if className}}class="{{className}}"{{/if}}>{{{ content }}}</div>`;

interface ITestComponent {
    className?: string;
    content?: Block | string;
}

export class TestComponent extends Block {
    constructor(props: ITestComponent) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

describe("Block ", () => {
    it("getContent should return block element", () => {
        const block = new TestComponent({});
        assert.equal(block.getContent(), block.element);
    });

    it("should changes after block props changed", () => {
        const block = new TestComponent({
            content: "text1",
        });

        assert.equal(block.getContent().innerHTML, "text1");

        block.setProps({
            content: "text2",
        });

        assert.equal(block.getContent().innerHTML, "text2");
    });

    it("should set custom class name", () => {
        const className = "testClassName";

        const block = new TestComponent({
            className: className
        });

        assert.equal(block.getContent().className, className);
    });
});

import Block from "../../core/block";
import template from "./test.tmpl";
import { TBlockAttributes } from "../../../declarations";

interface ITest {
    attr?: TBlockAttributes;
    content?: Block;
}

class Test extends Block {
    constructor(props: ITest) {
        super("div", props);
    }

    render() {
        return this.compile(template, {
            content: this.props.content,
        });
    }
}

const TestPage = new Test({});

export default TestPage;

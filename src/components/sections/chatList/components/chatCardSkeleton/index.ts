import Block from "../../../../../core/block";
import template from "./chatCardSkeleton.tmpl";
import Skeleton from "../../../../ui/skeleton";
import "./chatCardSkeleton.scss";

interface IChatCardSkeleton {}

class ChatCardSkeleton extends Block {
    constructor(props?: IChatCardSkeleton) {

        const avatar = new Skeleton({
            width: 34,
            isCircle: true
        });

        const title = new Skeleton({
            height: 14,
        });

        const message = [
            new Skeleton({
                height: 10
            }),
            new Skeleton({
                height: 10
            })
        ]

        const datetime =  new Skeleton({
            height: 12
        });

        super({ ...props, avatar, title, message, datetime});
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatCardSkeleton

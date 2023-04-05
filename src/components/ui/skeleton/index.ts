// Core
import Block from "@core/block";
// Template
import template from "./skeleton.tmpl";
// Styles
import "./skeleton.scss";

interface ISkeletonProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    isCircle?: boolean;
    isAnimation?: boolean;
}

export class Skeleton extends Block {
    constructor(props?: ISkeletonProps) {
        super(props);
        this.skeletonClassName = this.skeletonClassName.bind(this);
        this.skeletonStyle = this.skeletonStyle.bind(this);
    }

    skeletonClassName() {
        let className = "skeleton";
        if (this.props.isCircle) className += " skeleton-circle"
        if (this.props.isAnimation) className += " skeleton-animation"
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    skeletonStyle() {
        let style = "";
        let width = this.props.width ? this.props.width : "100%";
        let height = this.props.isCircle ? this.props.width ? this.props.width : "100%" : this.props.height ? this.props.height : 4;
        style += typeof width === "number" ? `width:${width}px; min-width:${width}px;` : `width:${width}; min-width:${width};`;    
        style += typeof height === "number" ? `height:${height}px; min-height:${height}px;` : `height:${height}; min-height:${height};`;

        return style;
    }

    render() {
        return this.compile(template, {
            className: this.skeletonClassName(),
            style: this.skeletonStyle()
        });
    }
}

export default Skeleton

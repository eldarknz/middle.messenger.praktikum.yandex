import Block from "../../../core/block";
import template from "./skeleton.tmpl";
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

/*interface ISkeletonProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    circle?: boolean;
    animation?: boolean;
}

const Skeleton = ({
    className,
    width = 0,
    height = 0,
    circle = false,
    animation = true,
}: ISkeletonProps) => {
    let style = {} as CSSProperties;
    if (width) {
        style.width = typeof width === "number" ? `${width}px` : width;
    }

    if (height) {
        style.height = typeof height === "number" ? `${height}px` : height;
    }

    return (
        <span
            style={style}
            className={cn(styles.skeleton, className, {
                [styles.circle]: circle,
                [styles.animation]: animation,
            })}
        >
            &nbsp;
        </span>
    );
};*/

export default Skeleton

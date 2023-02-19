import Block from "../../../core/block";
import template from "./spinner.tmpl";
import "./spinner.scss";

interface ISpinnerProps {
    type?: "simple" | "usual";
    color?: "primary" | "secondary" | "gray";
    size?: number;
    strokeWidth?: number;
    center?: boolean;
}

export class Spinner extends Block {
    constructor(props?: ISpinnerProps) {
        super(props);
        this.spinnerClassName = this.spinnerClassName.bind(this);
        this.spinnerSize = this.spinnerSize.bind(this);
        this.spinnerStyle = this.spinnerStyle.bind(this);
        this.spinnerRadius = this.spinnerRadius.bind(this);
        this.spinnerCX = this.spinnerCX.bind(this);
        this.spinnerCY = this.spinnerCY.bind(this);
        this.spinnerStrokeWidth = this.spinnerStrokeWidth.bind(this);
    }

    spinnerClassName() {
        let className = "spinner"; 
        if (this.props.center) className += " spinner-center"
        className += ` spinner-${this.props.type ?? "simple"}`
        className += ` spinner-${this.props.color ?? "gray"}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    spinnerSize() { return this.props.size ?? 20 }
    spinnerStyle() { return `width: ${this.spinnerSize()}px;, height: ${this.spinnerSize()}px`; }
    spinnerRadius() { return (this.spinnerSize() - this.spinnerStrokeWidth()) / 2; }
    spinnerCX() { return this.spinnerSize() / 2 }
    spinnerCY() { return this.spinnerSize() / 2 }
    spinnerStrokeWidth() { return this.spinnerSize() / 6 }

    render(): DocumentFragment {
        return this.compile(template, {
            className: this.spinnerClassName(),
            size: this.spinnerSize(),
            style: this.spinnerStyle(),
            radius: this.spinnerRadius(),
            cx: this.spinnerCX(),
            cy: this.spinnerCY(),
            strokeWidth: this.spinnerStrokeWidth()
        });
    }

};

/*type = "usual",
    color = "grey",
    size = 50,
    strokeWidth = 3,
    center = false,
}: ISpinnerProps) => {
    const radius = (size - strokeWidth) / 2;

    return (
        <svg
            className={cn(styles.spinner, {
                [styles.spinnerCenter]: center,
                [styles.spinnerUsual]: type === "usual",
                [styles.spinnerSimple]: type === "simple",

                [styles.colorRed]: color === "red",
                [styles.colorGrey]: color === "grey",
                [styles.colorBlack]: color === "black",
            })}
            style={{ width: size, height: size }}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                className={styles.bgCircle}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
            ></circle>
            <circle
                className={styles.circle}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
            ></circle>
        </svg>
    );
};*/

export default Spinner

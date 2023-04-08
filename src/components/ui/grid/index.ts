import { Block } from "@core/block";
import { Container } from "./container";
import { Col } from "./col";
import { Row } from "./row";

export const Grid: {
    Container: typeof Block,
    Col: typeof Block,
    Row: typeof Block,
} = {
    Container,
    Col,
    Row
};

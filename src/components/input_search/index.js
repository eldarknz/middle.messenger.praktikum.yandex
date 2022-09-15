import Handlebars from "handlebars";
import template from "./input.tmpl";
import "./input.scss";
import { inputHandler } from "./modules/index"
import "../icon"

inputHandler();

Handlebars.registerPartial("input_search", template);
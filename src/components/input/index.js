import Handlebars from "handlebars";
import template from "./input.tmpl";
import "./input.scss";
import { inputHandler } from "./modules/index"

inputHandler();

Handlebars.registerPartial("input", template);
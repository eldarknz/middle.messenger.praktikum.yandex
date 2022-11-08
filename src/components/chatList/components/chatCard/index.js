import Handlebars from "handlebars";
import template from "./ChatCard.tmpl";
import "../../../ui/Avatar";
import "../../../ui/Label";
import "./ChatCard.scss";

Handlebars.registerPartial("ChatCard", template);

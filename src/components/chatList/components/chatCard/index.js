import Handlebars from "handlebars";
import template from "./chatCard.tmpl";
import "../../../ui/avatar";
import "../../../ui/label";
import "./chatCard.scss";

Handlebars.registerPartial("chatCard", template);
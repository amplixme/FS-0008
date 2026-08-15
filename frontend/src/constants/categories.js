import EngineeringIcon from "~icons/material-symbols/engineering-outline";
import DesignServicesIcon from "~icons/material-symbols/design-services-outline";
import CloudIcon from "~icons/material-symbols/cloud-outline";
import ChatBubbleOutlineIcon from "~icons/material-symbols/chat-bubble-outline";
import CodeIcon from "~icons/material-symbols/code-outline";
import CategoryIcon from "~icons/material-symbols/category-outline";

export const CATEGORY_STYLES = {
  ingenieria: "bg-secondary-container text-on-secondary-container",
  diseno: "bg-tertiary-fixed text-on-tertiary-fixed",
  devops: "bg-secondary-container text-on-secondary-container",
  opinion: "bg-tertiary-fixed text-on-tertiary-fixed",
  programacion: "bg-secondary-container text-on-secondary-container",
  default: "bg-secondary-container text-on-secondary-container",
};

export const CATEGORY_ICONS = {
  ingenieria: EngineeringIcon,
  diseno: DesignServicesIcon,
  devops: CloudIcon,
  opinion: ChatBubbleOutlineIcon,
  programacion: CodeIcon,
  default: CategoryIcon,
};

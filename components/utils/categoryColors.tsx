// components/utils/categoryColors.js
export function getCategoryColor(category) {
  switch (category) {
    case "flight":
      return "primary"
    case "accommodation":
      return "success"
    case "activity":
      return "secondary"
    case "expense":
      return "error"
    default:
      return "default"
  }
}

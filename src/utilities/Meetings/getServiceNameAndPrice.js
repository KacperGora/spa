function getServiceNameAndPrice(service) {
  let serviceName;
  let servicePrice;
  switch (service) {
    case "45":
      serviceName = "Manicure Klasyczny";
      servicePrice = 45;
      break;
    case "90":
      serviceName = "Manicure Hybrydowy";
      servicePrice = 90;
      break;
    case "120":
      serviceName = "Uzupełnienie żelowe";
      servicePrice = 120;
      break;
    case "150":
      serviceName = "Przedłużanie paznokci żelem";
      servicePrice = 150;
      break;
    case "40":
      serviceName = "Pedicure";
      servicePrice = 120;
      break;
    default:
      serviceName = "Nie podano usługi";
  }
  return { serviceName, servicePrice };
}
export default getServiceNameAndPrice;

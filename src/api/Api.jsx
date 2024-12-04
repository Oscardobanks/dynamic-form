export const apiResponses = {
  userInfo: {
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "age", label: "Age", type: "number", required: false },
    ],
  },
  addressInfo: {
    fields: [
      { name: "street", label: "Street", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      {
        name: "state",
        label: "State",
        type: "select",
        options: ["California", "Texas", "New York"],
        required: true,
      },
      { name: "zipCode", label: "Zip Code", type: "text", required: false },
    ],
  },
  paymentInfo: {
    fields: [
      {
        name: "cardNumber",
        label: "Card Number",
        type: "text",
        required: true,
      },
      {
        name: "expiryDate",
        label: "Expiry Date",
        type: "date",
        required: true,
      },
      { name: "cvv", label: "CVV", type: "password", required: true },
      {
        name: "cardholderName",
        label: "Cardholder Name",
        type: "text",
        required: true,
      },
    ],
  },
};

const formatPhoneNumber = (phone: string) => {
  // Remove any non-digit characters and the leading +1 if present
  const cleaned = phone.replace(/\D/g, "").replace(/^1/, "");
  // Format the number as XXX.XXX.XXXX
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
};

export { formatPhoneNumber };

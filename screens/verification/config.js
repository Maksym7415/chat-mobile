export const verificationFields = [
  {
    fieldName: 'verificationCode',
    placeholder: '00000',
    keyboardType: 'verificationCode',
    validate: {
      required: 'required',
    },
    styles: {
      container: {
        maxWidth: 300,
        marginTop: 16,
      },
    },
  },
];

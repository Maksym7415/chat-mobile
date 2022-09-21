export const verificationFields = [
  {
    fieldName: 'verificationCode',
    placeholder: '00000',
    keyboardType: 'verificationCode',
    validate: {
      required: 'required',
      // pattern: {
      //   value: EMAIL_REGEX,
      //   message: 'not valid',
      // },
    },
    styles: {
      container: {
        maxWidth: 300,
        marginTop: 16,
      },
    },
  },
];

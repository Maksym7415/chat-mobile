/* eslint-disable @typescript-eslint/ban-types */
import React, {FunctionComponent} from 'react';
// import {validate} from './validate';
import authFieldRenderConfig from './authConfig';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';

// hooks
import {useAppSelector} from '../../../hooks/redux';

const ValidationForm = ({
  handleSubmit,
  pageName,
  icon,
  formTitle,
  submitBtnTitle,
  errorBack,
  callBack,
}) => {
  // HOOKS

  // SELECTORS
  const lang = useAppSelector(({commonReducer}) => commonReducer.lang);

  // VARIABLES
  const config = authFieldRenderConfig;

  return (
    // <Container component="main" maxWidth="xs">
    //   <div className={classes.paper}>
    //     <Avatar className={classes.avatar}>{icon}</Avatar>
    //     <Typography component="h1" variant="h5">
    //       {formTitle}
    //     </Typography>
    //     <form className={classes.form} noValidate>
    //       {config[pageName].map((el, key) => (
    //         <Field
    //           key={key}
    //           name={el.fieldName}
    //           component={AuthRenderField}
    //           placeholder={el.placeHolder}
    //           required={el.required}
    //           variant="outlined"
    //         />
    //       ))}
    //       {errorBack && (
    //         <div className={classes.error}>
    //           <p>{errorBack}</p>
    //         </div>
    //       )}
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //         onClick={handleSubmit(callBack)}>
    //         {submitBtnTitle}
    //       </Button>
    //     </form>
    //   </div>
    //   {pageName === 'signUpPage' ? (
    //     <Link href={Paths.signIn} color="primary">
    //       {languages[lang].authorization.haveAnAccount}{' '}
    //       {languages[lang].authorization.signin}.
    //     </Link>
    //   ) : pageName === 'signInPage' ? (
    //     <Link href={Paths.signUp} color="primary">
    //       {languages[lang].authorization.haveNoAccount}{' '}
    //       {languages[lang].authorization.signUp}.
    //     </Link>
    //   ) : null}
    // </Container>
    null
  );
};

export default ValidationForm;
